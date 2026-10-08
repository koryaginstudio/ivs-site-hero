// Временная заглушка, пока вариант не свёрстан. Удалить, когда появится настоящий hero.
export function Placeholder({ n }: { n: number }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "var(--space-16)",
        background: "var(--surface-200)",
      }}
    >
      <div>
        <p style={{ margin: 0, font: "700 48px/54px var(--font-sans)", letterSpacing: "-0.02em" }}>Вариант {n}</p>
        <p style={{ margin: "var(--space-8) 0 0", font: "400 17px/26px var(--font-sans)", color: "var(--text-muted)" }}>
          Здесь будет главный экран
        </p>
      </div>
    </main>
  );
}
