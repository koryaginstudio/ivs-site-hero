"use client";

import { useLayoutEffect, useRef } from "react";
import { heroV2, stats } from "@/components/ivs-content";
import { GlassTexture } from "./GlassTexture";
import { Header } from "./Header";
import s from "./v3.module.css";

// Фоновая текстура: путь к картинке в /public (например "/hero/v3-texture.webp").
// Пока null — рисуется временное SVG-«стекло» и кружок «!».
const TEXTURE: string | null = null;

// Карточки-тезисы ведут в разделы, к которым относятся цифры.
const statLinks = ["https://ivs-corp.ru/projects/", "https://ivs-corp.ru/company/", "https://ivs-corp.ru/company/"];

// Вариант 3 (референс unlim.group): фон gradient-ink уходит в фирменный красный, поверх — стеклянная текстура.
// По центру — композиция Hero из ДС: надзаголовок, заголовок, lead, primary-кнопка + ссылка;
// ниже — три плашки «жидкого стекла» с цифрами.
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Появление по паттерну ДС: скрытие включается только со скриптом (класс ivs-motion на <html>),
  // затем один раз ставится data-visible. Переходы, а не keyframes — не мешают hover-трансформам.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("ivs-motion");
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => el.setAttribute("data-visible", "true"));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className={s.hero} ref={ref}>
      <div className={s.bg} aria-hidden="true">
        <span className={s.glow} />
        <span className={s.glowSide} />
        {TEXTURE ? <img src={TEXTURE} alt="" className={s.textureImg} /> : <GlassTexture />}
      </div>

      <Header />

      <div className={s.main}>
        <div className={s.copy}>
          <p className={`${s.eyebrow} ${s.reveal}`} style={{ "--i": 0 } as React.CSSProperties}>
            Группа ИВС · с 1990 года
          </p>

          <h1 className={`${s.title} ${s.reveal}`} style={{ "--i": 1 } as React.CSSProperties}>
            {heroV2.title} <span className={s.titleAccent}>{heroV2.accent}</span>
          </h1>

          <p className={`${s.lead} ${s.reveal}`} style={{ "--i": 2 } as React.CSSProperties}>
            {heroV2.text}
          </p>

          <div className={`${s.actions} ${s.reveal}`} style={{ "--i": 3 } as React.CSSProperties}>
            <a href="#callback" className={`${s.btn} ${s.btnPrimary}`}>
              Заказать обратный звонок
            </a>
            <a href="https://ivs-corp.ru/services/" className={s.link}>
              Все услуги <span className={s.chev}>›</span>
            </a>
          </div>
        </div>

        <ul className={s.stats} aria-label="ИВС в цифрах">
          {stats.map((st, i) => (
            <li key={st.label} className={s.reveal} style={{ "--i": 4 + i } as React.CSSProperties}>
              <a href={statLinks[i]} className={s.glass}>
                <span className={s.glassValue}>{st.value}</span>
                <span className={s.glassLabel}>{st.label}</span>
                <span className={s.glassChev} aria-hidden="true">
                  ›
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {!TEXTURE && (
        <div className={s.note}>
          <button type="button" className={s.noteBtn} aria-label="О фоновой текстуре" aria-describedby="v3-texture-note">
            !
          </button>
          <span role="tooltip" id="v3-texture-note" className={s.noteTip}>
            Фоновая текстура тестовая — добавлена, чтобы показать идею главного экрана. В финальной версии я её заменю.
          </span>
        </div>
      )}
    </section>
  );
}
