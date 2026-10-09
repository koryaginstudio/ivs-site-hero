import s from "./v3.module.css";

// Временная фоновая текстура — абстрактное «стекло»: широкие полупрозрачные ленты с бликом по кромке.
// Каждая лента — отдельный <svg>: браузер растрирует её один раз и дальше только сдвигает слой (transform),
// без перерисовки фильтров на каждом кадре — иначе Safari «захлёбывается».
// Когда будет готова картинка, путь к ней передаётся в Hero (TEXTURE), и этот слой не рисуется.


function Band({ id, className, fill, d, edge, edgeOpacity = 1 }: { id: string; className?: string; fill: React.ReactNode; d: string; edge: string; edgeOpacity?: number }) {
  return (
    <svg className={className ? `${s.band} ${className}` : s.band} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {fill}
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={d} fill={`url(#${id}-fill)`} filter={`url(#${id}-soft)`} />
      <path d={edge} fill="none" stroke={`url(#${id}-edge)`} strokeWidth="1.2" opacity={edgeOpacity} />
    </svg>
  );
}

const whiteFill = (id: string) => (
  <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#ffffff" stopOpacity="0.13" />
    <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.03" />
    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
  </linearGradient>
);

export function GlassTexture() {
  return (
    <>
      <Band
        id="v3a"
        fill={whiteFill("v3a")}
        d="M-120 520 C 260 300, 620 760, 1000 470 S 1560 260, 1600 300 L 1600 470 C 1300 430, 1100 700, 760 760 S 120 640, -120 760 Z"
        edge="M-120 520 C 260 300, 620 760, 1000 470 S 1560 260, 1600 300"
      />
      <Band
        id="v3b"
        className={s.bandB}
        fill={
          <linearGradient id="v3b-fill" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ff5a5e" stopOpacity="0.22" />
            <stop offset="1" stopColor="#ff5a5e" stopOpacity="0" />
          </linearGradient>
        }
        d="M300 -60 C 520 180, 820 120, 1040 300 S 1380 620, 1560 560 L 1560 760 C 1320 820, 1120 520, 900 470 S 420 260, 220 -60 Z"
        edge="M300 -60 C 520 180, 820 120, 1040 300 S 1380 620, 1560 560"
        edgeOpacity={0.7}
      />
      <Band
        id="v3c"
        className={s.bandC}
        fill={whiteFill("v3c")}
        d="M-80 880 C 300 700, 560 940, 900 820 S 1400 640, 1560 700 L 1560 980 L -80 980 Z"
        edge="M-80 880 C 300 700, 560 940, 900 820 S 1400 640, 1560 700"
        edgeOpacity={0.6}
      />
    </>
  );
}
