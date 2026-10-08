// Список вариантов для главной и плавающего переключателя.
// short — подпись кнопки в переключателе («1», «2.2»…).
// image — путь к скриншоту экрана в /public (например "/shots/v1.jpg"); пока пусто — показывается плейсхолдер.
// comment — подпись под карточкой; пока пусто — показывается плейсхолдер.
export type Variant = { href: string; name: string; short: string; image?: string; comment?: string };

export const variants: Variant[] = [
  { href: "/v1", name: "Вариант 1", short: "1", image: "/shots/v1.jpg" },
  { href: "/v2", name: "Вариант 2", short: "2", image: "/shots/v2.jpg" },
  { href: "/v2-2", name: "Вариант 2.2", short: "2.2", image: "/shots/v2-2.jpg" },
  { href: "/v3", name: "Вариант 3", short: "3" },
];
