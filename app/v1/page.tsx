import { Switcher } from "@/components/Switcher";
import { Directions } from "./Directions";
import { Hero } from "./Hero";

export const metadata = { title: "Вариант 1 — ИВС-СЕТИ" };

export default function Page() {
  return (
    <>
      <Hero />
      <Directions />
      <Switcher current="/v1" />
    </>
  );
}
