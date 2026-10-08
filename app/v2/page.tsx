import { Switcher } from "@/components/Switcher";
import { Cards } from "./Cards";
import { Hero } from "./Hero";

export const metadata = { title: "Вариант 2 — ИВС-СЕТИ" };

export default function Page() {
  return (
    <>
      <Hero />
      <Cards />
      <Switcher current="/v2" />
    </>
  );
}
