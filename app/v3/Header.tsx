"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, phone, type NavItem } from "@/components/ivs-content";
import s from "./v3.module.css";

const CLOSE_DELAY = 140;

function Chevron() {
  return (
    <svg className={s.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLElement>(null);

  const cancelClose = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = sheet ? "hidden" : "";
  }, [sheet]);

  const hoverProps = (key: string) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelClose();
      setOpen(key);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      scheduleClose();
    },
  });

  const renderItem = (item: NavItem) => {
    if (item.kind === "link") {
      return (
        <li key={item.label}>
          <a href={item.href} className={s.navLink}>
            {item.label}
          </a>
        </li>
      );
    }

    const isOpen = open === item.label;
    const panelId = `nav-${item.label}`;

    return (
      <li key={item.label} className={item.kind === "menu" ? s.navHasMenu : undefined} {...hoverProps(item.label)}>
        <button
          type="button"
          className={s.navLink}
          aria-expanded={isOpen}
          aria-controls={panelId}
          data-open={isOpen || undefined}
          onClick={() => setOpen(isOpen ? null : item.label)}
        >
          {item.label}
          <Chevron />
        </button>

        {item.kind === "menu" ? (
          <div id={panelId} className={s.dropdown} data-open={isOpen || undefined}>
            <ul>
              {item.items.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={close} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>
                    {l.label}
                    {l.external && <span aria-hidden="true"> ↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div id={panelId} className={s.mega} data-open={isOpen || undefined}>
            <div className={s.megaHead}>
              <span>Услуги</span>
              <a href={item.href} onClick={close} className={s.megaAll}>
                Все услуги <span aria-hidden="true">›</span>
              </a>
            </div>
            <div className={s.megaGrid}>
              {item.groups.map((g) => (
                <div key={g.label} className={s.megaGroup}>
                  <a href={g.href} onClick={close} className={s.megaTitle}>
                    {g.label}
                  </a>
                  <ul>
                    {g.items.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} onClick={close}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </li>
    );
  };

  return (
    <header className={s.header} ref={root}>
      <div className={s.bar}>
        <a href="https://ivs-corp.ru/" className={s.logo} aria-label="ИВС-СЕТИ — на главную">
          {/* знак с градиентом из ДС; буквы в нём — прорези, белая подложка по контуру ромба делает их белыми на красном фоне */}
          <img src="/ivs-mark-backing.svg" width={48} height={48} alt="" className={s.logoBacking} />
          <img src="/ivs-mark-gradient.svg" width={48} height={48} alt="" className={s.logoMark} />
        </a>

        <nav className={s.nav} aria-label="Основное меню">
          <ul>{nav.map(renderItem)}</ul>
        </nav>

        <div className={s.actions}>
          <button type="button" className={`${s.iconBtn} ${s.search}`} aria-label="Поиск по сайту">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.2" />
              <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
          <a href={phone.href} className={s.phone}>
            <span className={s.phoneNum}>{phone.label}</span>
          </a>
          <a href="#callback" className={s.cta}>
            Заказать звонок
          </a>
          <button
            type="button"
            className={`${s.iconBtn} ${s.burger}`}
            aria-label={sheet ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={sheet}
            data-open={sheet || undefined}
            onClick={() => setSheet((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={s.sheet} data-open={sheet || undefined} aria-hidden={!sheet}>
        <nav aria-label="Мобильное меню">
          <ul className={s.sheetList}>
            {nav.map((item) =>
              item.kind === "link" ? (
                <li key={item.label}>
                  <a href={item.href} tabIndex={sheet ? 0 : -1}>
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <details>
                    <summary tabIndex={sheet ? 0 : -1}>
                      {item.label}
                      <Chevron />
                    </summary>
                    <ul>
                      {(item.kind === "menu" ? item.items : item.groups).map((l) => (
                        <li key={l.label}>
                          <a href={l.href} tabIndex={sheet ? 0 : -1}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ),
            )}
          </ul>
          <div className={s.sheetFoot}>
            <a href={phone.href} className={s.sheetPhone} tabIndex={sheet ? 0 : -1}>
              {phone.label}
            </a>
            <a href="#callback" className={s.cta} tabIndex={sheet ? 0 : -1}>
              Заказать звонок
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
