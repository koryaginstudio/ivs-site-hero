"use client";

import { heroV2, phone, stats } from "@/components/ivs-content";
import { GlassTexture } from "./GlassTexture";
import { Header } from "./Header";
import s from "./v3.module.css";

// Фоновая текстура: путь к картинке в /public (например "/hero/v3-texture.webp").
// Пока null — рисуется временное SVG-«стекло».
const TEXTURE: string | null = null;

// Подсветка карточки идёт за курсором: координаты пишем в CSS-переменные, без перерисовки React.
function onCardMove(e: React.PointerEvent<HTMLLIElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

// Вариант 3 (референс unlim.group): тёмный фон с переходом в акцентный красный, стеклянная текстура,
// заголовок по центру, две кнопки и три стеклянные карточки-тезиса.
export function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.bg} aria-hidden="true">
        <span className={s.glowMain} />
        <span className={s.glowSide} />
        {TEXTURE ? <img src={TEXTURE} alt="" className={s.textureImg} /> : <GlassTexture />}
        <span className={s.grain} />
      </div>

      <Header />

      <div className={s.main}>
        <div className={s.copy}>
          <p className={`${s.eyebrow} ${s.reveal}`} style={{ "--i": 0 } as React.CSSProperties}>
            <span className={s.eyebrowDot} aria-hidden="true" />
            Группа ИВС · на рынке ИТ с 1990 года
          </p>

          <h1 className={`${s.title} ${s.reveal}`} style={{ "--i": 1 } as React.CSSProperties}>
            {heroV2.title} <span className={s.titleAccent}>{heroV2.accent}</span>
          </h1>

          <p className={`${s.lead} ${s.reveal}`} style={{ "--i": 2 } as React.CSSProperties}>
            {heroV2.text}
          </p>

          <div className={`${s.ctaRow} ${s.reveal}`} style={{ "--i": 3 } as React.CSSProperties}>
            <a href="#callback" className={s.btnAccent}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 4h3.5l1.8 4.4-2.2 1.4a11 11 0 0 0 6.1 6.1l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              Заказать обратный звонок
            </a>
            <a href="https://ivs-corp.ru/services/" className={s.btnGlass}>
              Все услуги
              <svg className={s.btnArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <a href={phone.href} className={`${s.phoneLine} ${s.reveal}`} style={{ "--i": 4 } as React.CSSProperties}>
            или позвоните: <span>{phone.label}</span>
          </a>
        </div>

        <ul className={s.cards} aria-label="ИВС в цифрах">
          {stats.map((st, i) => (
            <li
              key={st.label}
              className={`${s.card} ${s.reveal}`}
              style={{ "--i": 5 + i } as React.CSSProperties}
              onPointerMove={onCardMove}
            >
              <span className={s.cardIndex} aria-hidden="true">
                0{i + 1}
              </span>
              <span className={s.cardValue}>{st.value}</span>
              <span className={s.cardLabel}>{st.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* пометка: текстура фона тестовая */}
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
