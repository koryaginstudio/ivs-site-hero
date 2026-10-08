// Знак ИВС — готовый файл из дизайн-системы (группа Logos, ivs-mark.svg).
// По правилам бренда знак не перерисовывается и ничего к нему не добавляется.
export function Logo({ size = 40 }: { size?: number }) {
  return <img src="/ivs-mark.svg" width={size} height={size} alt="ИВС-СЕТИ" style={{ display: "block" }} />;
}
