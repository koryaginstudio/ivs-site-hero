import { heroV2, stats } from "@/components/ivs-content";
import { Header } from "./Header";
import s from "./v2.module.css";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Один продающий экран: заголовок, описание, две кнопки, три карточки с цифрами и место под 3D-иллюстрацию.
// accent — версия 2.2: плашка залита радиальным градиентом акцентного цвета (референс — cortel.cloud/importozameshhenie-vmware).
export function Hero({ accent = false }: { accent?: boolean }) {
  return (
    <>
      <Header />

      <section className={s.hero}>
        <div className={accent ? `${s.panel} ${s.panelAccent}` : s.panel}>
          <div className={s.copy}>
            <h1 className={`${s.title} ${s.reveal}`} style={{ "--i": 0 } as React.CSSProperties}>
              {heroV2.title} <span className={s.titleAccent}>{heroV2.accent}</span>
            </h1>
            <p className={`${s.lead} ${s.reveal}`} style={{ "--i": 1 } as React.CSSProperties}>
              {heroV2.text}
            </p>

            <div className={`${s.actions2} ${s.reveal}`} style={{ "--i": 2 } as React.CSSProperties}>
              <a href="https://ivs-corp.ru/services/" className={`${s.btn} ${s.btnPrimary}`}>
                <span className={s.btnChip}>
                  <ArrowIcon />
                </span>
                Все услуги
              </a>
              <a href="https://ivs-corp.ru/projects/" className={`${s.btn} ${s.btnSecondary}`}>
                <span className={s.btnChip}>
                  <ArrowIcon />
                </span>
                Реализованные проекты
              </a>
            </div>
          </div>

          <ul className={s.stats} aria-label="ИВС в цифрах">
            {stats.map((st, i) => (
              <li key={st.label} className={`${s.stat} ${s.reveal}`} style={{ "--i": 3 + i } as React.CSSProperties}>
                <span className={s.statValue}>{st.value}</span>
                <span className={s.statLabel}>{st.label}</span>
              </li>
            ))}
          </ul>

          {/* 3D-иллюстрация акцентного цвета; за ней — мягкое красное свечение */}
          <div className={`${s.visual} ${s.reveal}`} style={{ "--i": 1 } as React.CSSProperties}>
            <div className={s.glassScene}>
              <span className={s.blobA} aria-hidden="true" />
              <span className={s.blobB} aria-hidden="true" />
              <img src="/hero/v2-hub.webp" alt="" width={1254} height={1254} className={s.heroImg} />
              {/* пометка: иллюстрация тестовая */}
              <div className={s.note}>
                <button type="button" className={s.noteBtn} aria-label="Об иллюстрации" aria-describedby="v2-illustration-note">
                  !
                </button>
                <span role="tooltip" id="v2-illustration-note" className={s.noteTip}>
                  Иллюстрация тестовая — добавлена, чтобы показать идею главного экрана. В финальной версии я её заменю.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
