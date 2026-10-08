import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Дизайн-система ИВС-СЕТИ: только Inter в разных начертаниях.
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--f-inter", display: "swap" });

export const metadata: Metadata = {
  title: "ИВС-СЕТИ — варианты главного экрана",
  description: "Варианты первого экрана нового сайта ivs-corp.ru",
  icons: { icon: "/ivs-favicon.svg" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* ?clean — без плавающего переключателя вариантов (для скриншотов превью) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if(/[?&]clean\\b/.test(location.search))document.documentElement.setAttribute('data-clean','')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
