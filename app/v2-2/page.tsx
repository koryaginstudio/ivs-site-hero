import { Switcher } from "@/components/Switcher";
import { Cards } from "../v2/Cards";
import { Hero } from "../v2/Hero";

export const metadata = { title: "Вариант 2.2 — ИВС-СЕТИ" };

// Версия 2.2 — вариант 2 с главной плашкой акцентного цвета.
export default function Page() {
  return (
    <>
      <Hero accent />
      <Cards />
      <Switcher current="/v2-2" />
    </>
  );
}
