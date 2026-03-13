

## Plan: Make MASTERSUNO.RU text link to https://mastersuno.ru

Two places where "MASTERSUNO.RU" appears as plain text need to become clickable links:

1. **HeroSection.tsx (line 11):** Wrap `от MASTERSUNO.RU` in an `<a href="https://mastersuno.ru">` tag
2. **FooterSection.tsx (line 8):** Wrap `MASTERSUNO.RU` in the copyright text in an `<a href="https://mastersuno.ru">` tag

Both links will open in a new tab (`target="_blank" rel="noopener noreferrer"`).

