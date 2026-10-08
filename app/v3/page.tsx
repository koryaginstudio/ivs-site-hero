import { Placeholder } from "@/components/Placeholder";
import { Switcher } from "@/components/Switcher";

export const metadata = { title: "Вариант 3 — ИВС-СЕТИ" };

export default function Page() {
  return (
    <>
      <Placeholder n={3} />
      <Switcher current="/v3" />
    </>
  );
}
