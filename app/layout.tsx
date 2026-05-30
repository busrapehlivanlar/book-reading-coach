import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Okuya — Kişisel Okuma Koçun",
  description:
    "Zamanına, ruh haline ve okuma seviyene göre küçük adımlarla okuma alışkanlığı kazandıran kişisel okuma koçu.",
  openGraph: {
    title: "Okuya — Kişisel Okuma Koçun",
    description: "Okuma alışkanlığı kazanmanın en kolay yolu.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
