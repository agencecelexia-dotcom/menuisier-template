import type { Metadata } from "next";
import { cormorant, inter } from "./fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atelier Le Gall — Menuiserie d'Excellence en Bretagne",
    template: "%s | Atelier Le Gall",
  },
  description:
    "Mickaël Le Gall, menuisier artisan en Côtes-d'Armor. Cuisines sur mesure, escaliers, dressings, agencements haut de gamme. Plus de 20 ans de savoir-faire.",
  keywords: [
    "menuisier",
    "menuiserie",
    "Côtes-d'Armor",
    "Bretagne",
    "sur mesure",
    "artisan",
    "cuisine",
    "escalier",
    "dressing",
    "agencement",
    "haut de gamme",
    "Le Gall",
    "22450",
  ],
  authors: [{ name: "Atelier Le Gall" }],
  creator: "Agence Celexia",
  metadataBase: new URL("https://atelielegall.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://atelielegall.fr",
    siteName: "Atelier Le Gall",
    title: "Atelier Le Gall — Menuiserie d'Excellence en Bretagne",
    description:
      "Menuiserie artisanale haut de gamme. Cuisines, escaliers, agencements sur mesure en Côtes-d'Armor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier Le Gall — Menuiserie d'Excellence",
    description:
      "Menuiserie artisanale haut de gamme en Bretagne. Plus de 20 ans de savoir-faire.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
