import Link from "next/link";
import { variants } from "./variants";

// Плавающая панель для показа заказчику: переход между вариантами и назад к выбору.
export function Switcher({ current }: { current: string }) {
  return (
    <nav className="switcher" aria-label="Варианты главного экрана">
      <Link href="/" className="switcher__back">
        Все варианты
      </Link>
      {variants.map((v) => (
        <Link
          key={v.href}
          href={v.href}
          className="switcher__n"
          title={v.name}
          aria-current={v.href === current ? "page" : undefined}
        >
          {v.short}
        </Link>
      ))}
    </nav>
  );
}
