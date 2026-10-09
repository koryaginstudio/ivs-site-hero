"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { heroV2, stats } from "@/components/ivs-content";
import { Header } from "./Header";
import s from "./v3.module.css";

// Фоновая текстура — стеклянные ленты Антона (PNG/WebP с прозрачностью), прижаты к правому нижнему углу.
const TEXTURE = "/hero/v3-texture.webp";

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h3.5l1.8 4.4-2.2 1.4a11 11 0 0 0 6.1 6.1l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

  // Параллакс фона за мышью: текстура и свет смещаются в разные стороны — появляется глубина.
  // Плавно, с инерцией; transform пишем прямо в элементы. Только мышь и без reduced-motion.
  const glowRef = useRef<HTMLDivElement>(null);
  const texRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = ref.current;
    const glow = glowRef.current;
    const tex = texRef.current;
    if (!sec || !glow || !tex) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      tex.style.transform = `translate3d(${(x * 36).toFixed(2)}px, ${(y * 24).toFixed(2)}px, 0)`;
      glow.style.transform = `translate3d(${(x * -28).toFixed(2)}px, ${(y * -20).toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = sec.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    sec.addEventListener("pointermove", onMove);
    sec.addEventListener("pointerleave", onLeave);
    return () => {
      sec.removeEventListener("pointermove", onMove);
      sec.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={s.hero} ref={ref}>
      <div className={s.bg} aria-hidden="true">
        <div className={s.layerGlow} ref={glowRef}>
          <span className={s.glow} />
          <span className={s.glowSide} />
        </div>
        <div className={s.layerTexture} ref={texRef}>
          <div className={s.texIntro}>
            <img src={TEXTURE} alt="" width={1672} height={940} className={s.textureImg} />
          </div>
        </div>
        {/* неподвижное затемнение слева — текстура гаснет к тексту (вместо маски на движущемся слое) */}
        <span className={s.shade} />
      </div>

      <Header />

      <div className={s.main}>
        <div className={s.copy}>
          <h1 className={`${s.title} ${s.reveal}`} style={{ "--i": 0 } as React.CSSProperties}>
            {heroV2.title} <span className={s.titleAccent}>{heroV2.accent}</span>
          </h1>

          <p className={`${s.lead} ${s.reveal}`} style={{ "--i": 1 } as React.CSSProperties}>
            {heroV2.text}
          </p>

          {/* кнопки — форма варианта 2 (квадрат-иконка слева); при наведении текст «перекатывается»,
              а иконка уходит и возвращается с другой стороны */}
          <div className={`${s.actions} ${s.reveal}`} style={{ "--i": 2 } as React.CSSProperties}>
            <a href="#callback" className={`${s.cta} ${s.ctaPrimary}`} aria-label="Заказать обратный звонок">
              <span className={`${s.ctaChip} ${s.ctaChipUp}`} aria-hidden="true">
                <PhoneIcon />
                <PhoneIcon />
              </span>
              <span className={s.roll} aria-hidden="true">
                <span className={s.rollText} data-text="Заказать обратный звонок">
                  Заказать обратный звонок
                </span>
              </span>
            </a>
            <a href="https://ivs-corp.ru/services/" className={`${s.cta} ${s.ctaSecondary}`} aria-label="Все услуги">
              <span className={s.ctaChip} aria-hidden="true">
                <ArrowIcon />
                <ArrowIcon />
              </span>
              <span className={s.roll} aria-hidden="true">
                <span className={s.rollText} data-text="Все услуги">
                  Все услуги
                </span>
              </span>
            </a>
          </div>
        </div>

        <ul className={s.stats} aria-label="ИВС в цифрах">
          {stats.map((st, i) => (
            <li key={st.label} className={s.reveal} style={{ "--i": 3 + i } as React.CSSProperties}>
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

      {/* пометка: текстура тестовая (как у всех иллюстраций hero) */}
      <div className={s.note}>
          <button type="button" className={s.noteBtn} aria-label="О фоновой текстуре" aria-describedby="v3-texture-note">
            !
          </button>
          <span role="tooltip" id="v3-texture-note" className={s.noteTip}>
            Фоновая текстура тестовая — добавлена, чтобы показать идею главного экрана. В финальной версии я её заменю.
          </span>
      </div>
    </section>
  );
}
