"use client";

import { useEffect, useRef } from "react";
import { directions } from "@/components/ivs-content";
import { DIRECTION_ICONS as ICONS } from "@/components/direction-icons";
import s from "./directions.module.css";


export function Directions() {
  const root = useRef<HTMLElement>(null);

  // Появление при прокрутке: один раз. Без JS карточки видны сразу.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.motion = "";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Резерв места под самое длинное раскрытие: раскрытая карточка не выходит за низ страницы,
  // поэтому при сворачивании страница не «скачет». Пересчёт при смене ширины.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const list = el.querySelector("ul");
    if (!list) return;

    const measure = () => {
      const listBottom = list.getBoundingClientRect().bottom;
      let reserve = 0;
      list.querySelectorAll<HTMLElement>(":scope > li").forEach((cell) => {
        const head = cell.querySelector<HTMLElement>("[data-head]");
        const inner = cell.querySelector<HTMLElement>("[data-details]");
        if (!head || !inner) return;
        const expandedBottom = cell.getBoundingClientRect().top + head.offsetHeight + inner.scrollHeight;
        reserve = Math.max(reserve, expandedBottom - listBottom);
      });
      el.style.setProperty("--reserve", `${Math.ceil(Math.max(0, reserve))}px`);
    };

    measure();
    document.fonts?.ready.then(measure); // высота списков меняется после загрузки шрифта
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  return (
    <section className={s.section} ref={root} aria-label="Направления деятельности">
      <div className={s.inner}>
        <ul className={s.bento}>
          {directions.map((d, i) => (
            <li key={d.label} className={s.cell} data-reveal style={{ "--i": i } as React.CSSProperties}>
              {/* карточка раскрывается вниз поверх следующего ряда — сетка не прыгает */}
              <a href={d.href} className={s.card}>
                <span className={s.head} data-head>
                  <span className={s.icon} aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[d.icon]}
                    </svg>
                  </span>
                  <span className={s.cardTitle}>{d.label}</span>
                  <span className={s.arrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                <span className={s.details}>
                  <span className={s.detailsInner} data-details>
                  <span className={s.items}>
                    {d.items.map((it, j) => (
                      <span key={it} className={s.item} style={{ "--j": j } as React.CSSProperties}>
                        {it}
                      </span>
                    ))}
                  </span>
                  <span className={s.more}>
                    Подробнее <span aria-hidden="true">›</span>
                  </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
