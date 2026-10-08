import { Switcher } from "@/components/Switcher";
import { Hero } from "./Hero";

export const metadata = { title: "Вариант 3 — ИВС-СЕТИ" };

export default function Page() {
  return (
    <>
      {/* ДС: скрытие для появления включается до первой отрисовки и только со скриптом */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('ivs-motion')" }} />
      <Hero />
      <Switcher current="/v3" />
    </>
  );
}
