import s from "./v3.module.css";

// Временная фоновая текстура — абстрактное «стекло»: широкие полупрозрачные ленты с бликом по краю.
// Когда будет готова картинка, путь к ней передаётся в Hero (TEXTURE), и этот слой не рисуется.
export function GlassTexture() {
  return (
    <svg className={s.glassSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="v3-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="v3-fill-red" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ff5a5e" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ff5a5e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="v3-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="v3-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ленты «стекла»: заливка + тонкий блик по верхней кромке */}
      <g className={s.glassBandA}>
        <path d="M-120 520 C 260 300, 620 760, 1000 470 S 1560 260, 1600 300 L 1600 470 C 1300 430, 1100 700, 760 760 S 120 640, -120 760 Z" fill="url(#v3-fill)" filter="url(#v3-soft)" />
        <path d="M-120 520 C 260 300, 620 760, 1000 470 S 1560 260, 1600 300" fill="none" stroke="url(#v3-edge)" strokeWidth="1.2" />
      </g>
      <g className={s.glassBandB}>
        <path d="M300 -60 C 520 180, 820 120, 1040 300 S 1380 620, 1560 560 L 1560 760 C 1320 820, 1120 520, 900 470 S 420 260, 220 -60 Z" fill="url(#v3-fill-red)" filter="url(#v3-soft)" />
        <path d="M300 -60 C 520 180, 820 120, 1040 300 S 1380 620, 1560 560" fill="none" stroke="url(#v3-edge)" strokeWidth="1" opacity="0.7" />
      </g>
      <g className={s.glassBandC}>
        <path d="M-80 880 C 300 700, 560 940, 900 820 S 1400 640, 1560 700 L 1560 980 L -80 980 Z" fill="url(#v3-fill)" filter="url(#v3-soft)" />
        <path d="M-80 880 C 300 700, 560 940, 900 820 S 1400 640, 1560 700" fill="none" stroke="url(#v3-edge)" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}
