import Link from "next/link";
import { Logo } from "@/components/Logo";
import { variants } from "@/components/variants";
import s from "./chooser.module.css";

export default function Chooser() {
  return (
    <main className={s.page}>
      <header className={s.head}>
        <Logo size={44} />
      </header>

      <h1 className={s.title}>Выберите вариант главного экрана</h1>
      <p className={s.lead}>
        Мы подготовили несколько вариантов первого экрана нового сайта ИВС-СЕТИ. Откройте каждый, между ними можно
        переключаться кнопками внизу справа, и напишите, какой понравился больше. Иллюстрации на экранах пока тестовые.
      </p>

      <ul className={s.grid}>
        {variants.map((v) => (
          <li key={v.href}>
            <Link href={v.href} className={s.card}>
              <span className={s.shot}>
                {v.image ? (
                  <img src={v.image} alt={`Скриншот: ${v.name}`} />
                ) : (
                  <span className={s.placeholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="m4 18 5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    Скриншот экрана
                  </span>
                )}
              </span>
              <span className={s.name}>{v.name}</span>
              <span className={v.comment ? s.comment : `${s.comment} ${s.empty}`}>
                {v.comment || "Комментарий к варианту"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
