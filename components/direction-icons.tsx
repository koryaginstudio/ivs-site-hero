import type { DirectionIcon } from "./ivs-content";

// Пути иконок направлений (viewBox 0 0 24 24). Цвет и толщину задаёт обёртка <svg>.
// Линейные иконки одной толщины (ДС: иконки линейные, цветом red_main).
export const DIRECTION_ICONS: Record<DirectionIcon, React.ReactNode> = {
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2v4.3M12 11.5 6.4 16.2M12 11.5l5.6 4.7M7.2 18h9.6" />
    </>
  ),
  code: (
    <>
      <rect x="2.8" y="4" width="18.4" height="16" rx="2.4" />
      <path d="M2.8 8.2h18.4M9.5 11.8 7 14.3l2.5 2.5M14.5 11.8l2.5 2.5-2.5 2.5" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="3.5" width="17" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="17" height="7" rx="1.8" />
      <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
    </>
  ),
  box: (
    <>
      <path d="M12 2.8 20.2 7v10L12 21.2 3.8 17V7L12 2.8Z" />
      <path d="M3.8 7 12 11.2 20.2 7M12 11.2v10M7.9 4.9l8.2 4.2" />
    </>
  ),
  support: (
    <>
      <path d="M4 13.5v-1.8a8 8 0 0 1 16 0v1.8" />
      <rect x="2.8" y="13" width="4.2" height="6" rx="1.6" />
      <rect x="17" y="13" width="4.2" height="6" rx="1.6" />
      <path d="M19.1 19v.4a2.6 2.6 0 0 1-2.6 2.6H13" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21M15 10h3.5A1.5 1.5 0 0 1 20 11.5V21M2.5 21h19" />
      <path d="M7.5 8h4M7.5 12h4M7.5 16h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12.2 2.2 2.2 4.2-4.4" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2.8 5.5 13.2h6L10.8 21.2l7.7-10.6h-6L13 2.8Z" />
    </>
  ),
};
