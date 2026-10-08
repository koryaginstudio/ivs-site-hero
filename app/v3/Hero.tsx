"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
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
          {TEXTURE ? <img src={TEXTURE} alt="" className={s.textureImg} /> : <GlassTexture />}
        </div>
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
              <svg className={s.btnArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
