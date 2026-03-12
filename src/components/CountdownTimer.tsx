import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("suno5_timer_end");
    if (saved) {
      const diff = Math.max(0, Math.floor((parseInt(saved) - Date.now()) / 1000));
      return diff;
    }
    const end = Date.now() + 48 * 60 * 60 * 1000;
    localStorage.setItem("suno5_timer_end", end.toString());
    return 48 * 60 * 60;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-5 py-2.5 text-accent font-bold">
      <span className="text-sm">🔥 Скидка истекает через</span>
      <div className="flex gap-1 font-mono text-lg">
        <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:<span>{pad(seconds)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
