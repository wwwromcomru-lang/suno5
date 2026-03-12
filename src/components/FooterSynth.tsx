import { useState, useCallback, useRef, useEffect } from "react";

const SYNTH_TYPES = [
  { label: "Piano", type: "sine" as OscillatorType, attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.8 },
  { label: "Organ", type: "square" as OscillatorType, attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.3 },
  { label: "Synth Lead", type: "sawtooth" as OscillatorType, attack: 0.02, decay: 0.2, sustain: 0.5, release: 0.5 },
  { label: "Flute", type: "triangle" as OscillatorType, attack: 0.08, decay: 0.15, sustain: 0.6, release: 0.6 },
];

const NOTES = [
  { note: "C4", freq: 261.63, black: false },
  { note: "C#4", freq: 277.18, black: true },
  { note: "D4", freq: 293.66, black: false },
  { note: "D#4", freq: 311.13, black: true },
  { note: "E4", freq: 329.63, black: false },
  { note: "F4", freq: 349.23, black: false },
  { note: "F#4", freq: 369.99, black: true },
  { note: "G4", freq: 392.0, black: false },
  { note: "G#4", freq: 415.3, black: true },
  { note: "A4", freq: 440.0, black: false },
  { note: "A#4", freq: 466.16, black: true },
  { note: "B4", freq: 493.88, black: false },
  { note: "C5", freq: 523.25, black: false },
  { note: "C#5", freq: 554.37, black: true },
  { note: "D5", freq: 587.33, black: false },
  { note: "D#5", freq: 622.25, black: true },
  { note: "E5", freq: 659.25, black: false },
  { note: "F5", freq: 698.46, black: false },
  { note: "F#5", freq: 739.99, black: true },
  { note: "G5", freq: 783.99, black: false },
  { note: "G#5", freq: 830.61, black: true },
  { note: "A5", freq: 880.0, black: false },
  { note: "A#5", freq: 932.33, black: true },
  { note: "B5", freq: 987.77, black: false },
];

const KEY_MAP: Record<string, string> = {
  a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4", f: "F4", t: "F#4",
  g: "G4", y: "G#4", h: "A4", u: "A#4", j: "B4",
  k: "C5", o: "C#5", l: "D5", p: "D#5", ";": "E5",
};

const NOTE_FREQ_MAP = new Map(NOTES.map((n) => [n.note, n.freq]));
const NOTE_TO_KEY = Object.fromEntries(Object.entries(KEY_MAP).map(([k, v]) => [v, k.toUpperCase()]));

const whiteNotes = NOTES.filter((n) => !n.black);
const blackNotes = NOTES.filter((n) => n.black);

// Map black key index to position relative to white keys
const getBlackKeyPosition = (note: string): number => {
  const blackPositions: Record<string, number> = {
    "C#4": 0, "D#4": 1, "F#4": 3, "G#4": 4, "A#4": 5,
    "C#5": 7, "D#5": 8, "F#5": 10, "G#5": 11, "A#5": 12,
  };
  return blackPositions[note] ?? 0;
};

const FooterSynth = () => {
  const [synthIdx, setSynthIdx] = useState(0);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscRef = useRef<Map<string, { osc: OscillatorNode; gain: GainNode }>>(new Map());

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const synth = SYNTH_TYPES[synthIdx];

  const playNote = useCallback(
    (note: string, freq: number) => {
      if (activeOscRef.current.has(note)) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = synth.type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Add slight detune for richness on sawtooth/square
        if (synth.type === "sawtooth" || synth.type === "square") {
          const osc2 = ctx.createOscillator();
          osc2.type = synth.type;
          osc2.frequency.setValueAtTime(freq * 1.003, ctx.currentTime);
          osc2.connect(gain);
          osc2.start();
          setTimeout(() => osc2.stop(), 3000);
        }

        // ADSR envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + synth.attack);
        gain.gain.linearRampToValueAtTime(0.15 * synth.sustain, ctx.currentTime + synth.attack + synth.decay);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        activeOscRef.current.set(note, { osc, gain });
        setActiveKeys((prev) => new Set(prev).add(note));
      } catch {
        // silently fail
      }
    },
    [synth, getCtx]
  );

  const stopNote = useCallback(
    (note: string) => {
      const entry = activeOscRef.current.get(note);
      if (!entry) return;
      try {
        const ctx = getCtx();
        entry.gain.gain.cancelScheduledValues(ctx.currentTime);
        entry.gain.gain.setValueAtTime(entry.gain.gain.value, ctx.currentTime);
        entry.gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + synth.release);
        entry.osc.stop(ctx.currentTime + synth.release + 0.05);
      } catch {
        // silently fail
      }
      activeOscRef.current.delete(note);
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    },
    [synth, getCtx]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = KEY_MAP[e.key.toLowerCase()];
      if (!note) return;
      const freq = NOTE_FREQ_MAP.get(note);
      if (freq) playNote(note, freq);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const note = KEY_MAP[e.key.toLowerCase()];
      if (note) stopNote(note);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playNote, stopNote]);

  const whiteKeyWidth = 100 / whiteNotes.length;

  return (
    <div className="w-full">
      {/* Synth selector */}
      <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
        {SYNTH_TYPES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSynthIdx(i)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              i === synthIdx
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-background/20 text-background/70 hover:bg-background/30"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Keyboard */}
      <div className="relative w-full h-32 sm:h-40 select-none" style={{ touchAction: "none" }}>
        {/* White keys */}
        {whiteNotes.map((n, i) => (
          <div
            key={n.note}
            onMouseDown={() => playNote(n.note, n.freq)}
            onMouseUp={() => stopNote(n.note)}
            onMouseLeave={() => stopNote(n.note)}
            onTouchStart={(e) => { e.preventDefault(); playNote(n.note, n.freq); }}
            onTouchEnd={() => stopNote(n.note)}
            className={`absolute top-0 bottom-0 border-r border-foreground/20 rounded-b-lg cursor-pointer transition-colors duration-75 ${
              activeKeys.has(n.note)
                ? "bg-primary/30"
                : "bg-background/90 hover:bg-background/70"
            }`}
            style={{
              left: `${i * whiteKeyWidth}%`,
              width: `${whiteKeyWidth}%`,
            }}
          >
            {NOTE_TO_KEY[n.note] && (
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-foreground/20 font-bold">
                {NOTE_TO_KEY[n.note]}
              </span>
            )}
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-foreground/30 font-medium">
              {n.note.replace(/\d/, "")}
            </span>
          </div>
        ))}

        {/* Black keys */}
        {blackNotes.map((n) => {
          const pos = getBlackKeyPosition(n.note);
          return (
            <div
              key={n.note}
              onMouseDown={(e) => { e.stopPropagation(); playNote(n.note, n.freq); }}
              onMouseUp={() => stopNote(n.note)}
              onMouseLeave={() => stopNote(n.note)}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); playNote(n.note, n.freq); }}
              onTouchEnd={() => stopNote(n.note)}
              className={`absolute top-0 h-[60%] rounded-b-md cursor-pointer z-10 transition-colors duration-75 ${
                activeKeys.has(n.note)
                  ? "bg-primary shadow-lg"
                  : "bg-foreground/80 hover:bg-foreground/60"
              }`}
              style={{
                left: `${(pos + 0.65) * whiteKeyWidth}%`,
                width: `${whiteKeyWidth * 0.65}%`,
              }}
            >
              {NOTE_TO_KEY[n.note] && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] text-background/40 font-bold">
                  {NOTE_TO_KEY[n.note]}
                </span>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default FooterSynth;
