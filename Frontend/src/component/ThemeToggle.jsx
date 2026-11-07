import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Palette, Check } from "lucide-react";

const accents = [
  { id: "teal", label: "Teal", color: "#0f766e" },
  { id: "blue", label: "Blue", color: "#1d4ed8" },
  { id: "violet", label: "Violet", color: "#6d28d9" },
  { id: "rose", label: "Rose", color: "#be123c" },
  { id: "orange", label: "Orange", color: "#c2410c" },
  { id: "slate", label: "Slate", color: "#334155" },
];

const backgrounds = [
  { id: "default", label: "Default", light: "#f5f5f4", dark: "#0c0a09" },
  { id: "midnight", label: "Midnight", light: "#eef2ff", dark: "#0b1220" },
  { id: "forest", label: "Forest", light: "#ecfdf5", dark: "#0a1410" },
  { id: "wine", label: "Wine", light: "#fff1f2", dark: "#1a0b12" },
  { id: "sand", label: "Sand", light: "#faf5e9", dark: "#17130c" },
  { id: "slate", label: "Slate", light: "#f1f5f9", dark: "#0f172a" },
  { id: "black", label: "Black", light: "#fafafa", dark: "#000000" },
];

const root = () => document.documentElement;
const isDark = () => root().classList.contains("dark");
const getAccent = () => root().getAttribute("data-accent") || "teal";
const getBg = () => root().getAttribute("data-bg") || "default";

const readStore = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
const getCustomBg = () => readStore("customBg", "#0c0a09");

function animate() {
  root().classList.add("theme-anim");
  setTimeout(() => root().classList.remove("theme-anim"), 350);
}

function setTheme(dark) {
  animate();
  root().classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

function setAccent(id) {
  animate();
  root().setAttribute("data-accent", id);
  try {
    localStorage.setItem("accent", id);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

// Background html par lagao (custom ho to --page-bg bhi set karo)
function applyBg(id, custom) {
  root().setAttribute("data-bg", id);
  if (id === "custom") root().style.setProperty("--page-bg", custom);
  else root().style.removeProperty("--page-bg");
}

function setBg(id) {
  animate();
  applyBg(id, getCustomBg());
  try {
    localStorage.setItem("bg", id);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

// Color picker drag karte waqt animation nahi, warna lag karta hai
function setCustomBg(color) {
  try {
    localStorage.setItem("customBg", color);
    localStorage.setItem("bg", "custom");
  } catch {}
  applyBg("custom", color);
  window.dispatchEvent(new Event("themechange"));
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark);
  const [accent, setAccentState] = useState(getAccent);
  const [bg, setBgState] = useState(getBg);
  const [customBg, setCustomBgState] = useState(getCustomBg);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const sync = () => {
      setDark(isDark());
      setAccentState(getAccent());
      setBgState(getBg());
      setCustomBgState(getCustomBg());
    };

    // Page khulte hi save kiya hua background wapas lagao
    applyBg(readStore("bg", "default"), getCustomBg());
    sync();

    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  // Bahar click ya Escape par popup band
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const icon = "absolute inset-0 transition-all duration-300 motion-reduce:transition-none";
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition-colors hover:bg-stone-100 active:scale-90";

  return (
    <div
      ref={boxRef}
      className="fixed right-14 top-2.5 z-[35] flex items-center gap-2 md:right-5 md:top-3"
    >
      <style>{`
        @keyframes accent-pop {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .accent-pop { animation: accent-pop 180ms cubic-bezier(0.22, 1, 0.36, 1) both; transform-origin: top right; }
        @media (prefers-reduced-motion: reduce) { .accent-pop { animation: none; } }
      `}</style>

      {/* Color picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Choose colors"
          aria-expanded={open}
          title="Colors"
          className={btn}
        >
          <Palette size={18} />
        </button>

        {open && (
          <div
            role="menu"
            className="accent-pop absolute right-0 top-11 w-56 rounded-xl border border-stone-200 bg-white p-3 shadow-xl"
          >
            {/* Accent */}
            <p className="mb-2 text-xs font-medium text-stone-500">Accent color</p>
            <div className="grid grid-cols-3 gap-2">
              {accents.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={accent === a.id}
                  aria-label={a.label}
                  title={a.label}
                  onClick={() => setAccent(a.id)}
                  className="flex h-10 items-center justify-center rounded-lg text-white transition-transform duration-150 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: a.color,
                    outline: accent === a.id ? `2px solid ${a.color}` : "none",
                    outlineOffset: "2px",
                  }}
                >
                  {accent === a.id && <Check size={16} strokeWidth={3} />}
                </button>
              ))}
            </div>

            {/* Background */}
            <p className="mb-2 mt-4 text-xs font-medium text-stone-500">Background</p>
            <div className="grid grid-cols-4 gap-2">
              {backgrounds.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={bg === b.id}
                  aria-label={b.label}
                  title={b.label}
                  onClick={() => setBg(b.id)}
                  className="h-9 rounded-lg border border-stone-300 transition-transform duration-150 hover:scale-105 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${b.light} 50%, ${b.dark} 50%)`,
                    outline: bg === b.id ? "2px solid var(--accent)" : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}

              {/* Custom color */}
              <label
                title="Custom color"
                className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-stone-300 transition-transform duration-150 hover:scale-105 active:scale-95"
                style={{
                  background:
                    "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                  outline: bg === "custom" ? "2px solid var(--accent)" : "none",
                  outlineOffset: "2px",
                }}
              >
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  aria-label="Pick custom background color"
                  className="h-0 w-0 opacity-0"
                />
              </label>
            </div>

            <p className="mt-3 text-[11px] leading-snug text-stone-500">
              Har circle aadha light aur aadha dark rang dikhata hai.
            </p>
          </div>
        )}
      </div>

      {/* Light / dark */}
      <button
        type="button"
        onClick={() => setTheme(!dark)}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
        className={btn}
      >
        <span className="relative h-[18px] w-[18px]">
          <Sun
            size={18}
            className={`${icon} ${dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
          />
          <Moon
            size={18}
            className={`${icon} ${dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
          />
        </span>
      </button>
    </div>
  );
}