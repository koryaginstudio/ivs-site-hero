import { directions } from "@/components/ivs-content";
import { DIRECTION_ICONS } from "@/components/direction-icons";
import s from "./v2.module.css";

// Карточки направлений — как блоки решений у Cortel: белые, тонкая рамка, иконка акцентного цвета.
export function Cards() {
  return (
    <section className={s.cards} aria-label="Направления деятельности">
      <ul className={s.cardGrid}>
        {directions.map((d, i) => (
          <li key={d.label} className={s.reveal} style={{ "--i": 4 + i } as React.CSSProperties}>
            <a href={d.href} className={s.card}>
              <span className={s.cardTop}>
                {/* красная линейная иконка на белом — без подложек и полупрозрачных заливок */}
                <span className={s.cardIcon} aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {DIRECTION_ICONS[d.icon]}
                  </svg>
                </span>
                <span className={s.cardArrow} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className={s.cardTitle}>{d.label}</span>
              <span className={s.cardText}>{d.items.slice(0, 3).join(" · ")}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
