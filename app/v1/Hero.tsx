"use client";

import { useEffect, useRef, useState } from "react";
import { slides } from "@/components/ivs-content";
import { Header } from "./Header";
import s from "./v1.module.css";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Пауза, когда вкладка не видна — чтобы не «пролистать» слайды в фоне.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Параллакс иконки: мягко «тянется» за мышью с инерцией (только мышь, без reduced-motion).
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const el = parallaxRef.current;
    if (!sec || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const MAX = 14; // px — максимальный сдвиг
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = sec.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * MAX;
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

  const next = () => setActive((a) => (a + 1) % slides.length);
  const running = !paused && !hidden;

  return (
    <section className={s.hero} ref={sectionRef}>
      <div className={s.bg} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Header />

      <div className={s.main}>
        <div
          className={s.copy}
          role="region"
          aria-roledescription="карусель"
          aria-label="Направления ИВС"
          // пауза только при навигации с клавиатуры — клик мышью слайдер не останавливает
          onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <h1 className={s.srOnly}>ИВС-СЕТИ — полный комплекс ИТ-услуг</h1>

          <div
            className={s.slides}
            aria-live={running ? "off" : "polite"}
            // пауза, пока читают заголовок
            onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          >
            {slides.map((sl, i) => (
              <div
                key={sl.title}
                className={s.slide}
                data-state={i === active ? "active" : i < active ? "before" : "after"}
                aria-hidden={i !== active}
              >
                <p className={s.slideTitle}>{sl.title}</p>
                <p className={s.slideText}>{sl.text}</p>
              </div>
            ))}
          </div>

          <div className={`${s.ctaRow} ${s.reveal}`} style={{ "--i": 2 } as React.CSSProperties}>
            <a href={slides[active].href} className={s.btnInverse}>
              Подробнее
              <span className={s.arrow} aria-hidden="true">
                →
              </span>
            </a>
            <a href="https://ivs-corp.ru/services/" className={s.linkWhite}>
              Все услуги <span className={s.chev} aria-hidden="true">›</span>
            </a>
          </div>

          <div className={`${s.dots} ${s.reveal}`} style={{ "--i": 3 } as React.CSSProperties}>
            {slides.map((sl, i) => (
              <button
                key={sl.title}
                type="button"
                className={s.dotBtn}
                aria-label={`Слайд ${i + 1} из ${slides.length}: ${sl.title}`}
                aria-current={i === active}
                onClick={() => {
                  setPaused(false);
                  setActive(i);
                }}
              >
                <span className={s.dot}>
                  {i === active && (
                    <span
                      key={active}
                      className={s.dotFill}
                      style={{ animationPlayState: running ? "running" : "paused" }}
                      onAnimationEnd={next}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={`${s.visual} ${s.reveal}`} style={{ "--i": 1 } as React.CSSProperties}>
          {/* иконка меняется вместе со слайдом; у слайда без картинки — плейсхолдер */}
          <div className={s.visualStack} ref={parallaxRef}>
            {/* пометка: иллюстрации тестовые */}
            <div className={s.note}>
              <button type="button" className={s.noteBtn} aria-label="Об иллюстрации" aria-describedby="illustration-note">
                !
              </button>
              <span role="tooltip" id="illustration-note" className={s.noteTip}>
                Иллюстрация тестовая — добавлена, чтобы показать идею главного экрана. В финальной версии я её заменю.
              </span>
            </div>
            {slides.map((sl, i) => (
              <div
                key={sl.title}
                className={s.visualItem}
                data-state={i === active ? "active" : i < active ? "before" : "after"}
                aria-hidden={i !== active}
              >
                {sl.image ? (
                  <img src={sl.image} alt="" width={1254} height={1254} className={s.visualImg} />
                ) : (
                  <div className={s.placeholder} role="img" aria-label="Место для 3D-иконки">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4l8-4.6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      <path d="M4 7.4 12 12l8-4.6M12 12v9.2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                    <span className={s.phTitle}>3D-иконка</span>
                    <span className={s.phNote}>Плейсхолдер · 1:1 · PNG/WebP с прозрачностью</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
