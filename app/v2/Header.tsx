"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, phone, type DirectionIcon, type NavItem } from "@/components/ivs-content";
import { DIRECTION_ICONS } from "@/components/direction-icons";
import s from "./v2.module.css";

const CLOSE_DELAY = 140;

// Иконки групп мега-меню «Услуги» — в порядке групп с ivs-corp.ru (как в карточках направлений).
const GROUP_ICONS: DirectionIcon[] = ["building", "code", "server", "shield", "network", "bolt", "support", "box"];

function Chevron() {
  return (
    <svg className={s.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneChip() {
  return (
    <span className={s.chip} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.6 3.5h2.3l1.4 4.1-2 1.4a12.2 12.2 0 0 0 6.7 6.7l1.4-2 4.1 1.4v2.3a2 2 0 0 1-2.1 2A16.6 16.6 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [group, setGroup] = useState(0); // выбранное направление в мега-меню «Услуги»
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLElement>(null);

  // Плавающая подложка меню: перетекает к пункту под курсором, гаснет при уходе мыши.
  const navRef = useRef<HTMLElement>(null);
  const hovering = useRef(false);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false, instant: true });

  const pillTo = (el: Element | null) => {
    const bar = navRef.current?.parentElement; // подложка позиционируется от шапки (.bar)
    if (!bar || !el) return;
    const a = bar.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    // первое появление — сразу на месте, без «проезда» от края
    setPill((p) => ({ x: b.left - a.left, w: b.width, on: true, instant: !p.on }));
  };
  const pillOff = () => setPill((p) => ({ ...p, on: false }));

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

  useEffect(() => {
    if (open) pillTo(navRef.current?.querySelector(`[data-navlink="${open}"]`) ?? null);
    else if (!hovering.current) pillOff();
  }, [open]);

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
          <a href={item.href} className={s.navLink} data-navlink={item.label}>
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
          data-navlink={item.label}
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
            {/* две панели: слева направления, справа подуслуги выбранного — меню горизонтальное, без прокрутки вбок */}
            <div className={s.megaBody}>
              <ul className={s.megaGroups} role="list">
                {item.groups.map((g, gi) => (
                  <li key={g.label}>
                    <a
                      href={g.href}
                      onClick={close}
                      className={s.megaGroupLink}
                      data-active={gi === group || undefined}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setGroup(gi)}
                      onFocus={() => setGroup(gi)}
                    >
                      <span className={s.megaIcon} aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          {DIRECTION_ICONS[GROUP_ICONS[gi] ?? "box"]}
                        </svg>
                      </span>
                      <span className={s.megaGroupLabel}>{g.label}</span>
                      <svg className={s.megaChevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>

              <div className={s.megaDetail} key={group}>
                <a href={item.groups[group].href} onClick={close} className={s.megaDetailTitle}>
                  {item.groups[group].label} <span aria-hidden="true">›</span>
                </a>
                <ul className={s.megaItems}>
                  {item.groups[group].items.map((l, li) => (
                    <li key={l.label} style={{ "--j": li } as React.CSSProperties}>
                      <a href={l.href} onClick={close}>
                        <span>{l.label}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
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
          {/* на белом фоне — основной плоский знак из ДС (ivs-mark.svg) */}
          <img src="/ivs-mark.svg" width={44} height={44} alt="" />
        </a>

        <nav
          className={s.nav}
          aria-label="Основное меню"
          ref={navRef}
          onPointerOver={(e) => {
            if (e.pointerType !== "mouse") return;
            const link = (e.target as HTMLElement).closest("[data-navlink]");
            if (link) {
              hovering.current = true;
              pillTo(link);
            }
          }}
          onPointerLeave={(e) => {
            if (e.pointerType !== "mouse") return;
            hovering.current = false;
            if (open) pillTo(navRef.current?.querySelector(`[data-navlink="${open}"]`) ?? null);
            else pillOff();
          }}
          onFocus={(e) => {
            const link = (e.target as HTMLElement).closest("[data-navlink]");
            if (link && (e.target as HTMLElement).matches(":focus-visible")) pillTo(link);
          }}
          onBlur={() => {
            if (!hovering.current && !open) pillOff();
          }}
        >
          <span
            className={s.navPill}
            aria-hidden="true"
            data-on={pill.on || undefined}
            data-instant={pill.instant || undefined}
            style={{ "--x": `${pill.x}px`, "--w": `${pill.w}px` } as React.CSSProperties}
          />
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
            <PhoneChip />
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
              <PhoneChip />
              Заказать звонок
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
