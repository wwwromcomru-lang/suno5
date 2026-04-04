import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("[v0] main.tsx loading, root element:", document.getElementById("root"));

const root = document.getElementById("root");
if (root) {
  console.log("[v0] Creating React root and rendering App");
  createRoot(root).render(<App />);
} else {
  console.error("[v0] Root element not found!");
}
