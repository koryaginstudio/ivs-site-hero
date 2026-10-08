import { Switcher } from "@/components/Switcher";
import { Hero } from "./Hero";

export const metadata = { title: "Вариант 3 — ИВС-СЕТИ" };

export default function Page() {
  return (
    <>
      <Hero />
      <Switcher current="/v3" />
    </>
  );
}
