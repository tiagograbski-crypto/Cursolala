import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Preloader } from "@/components/ui/Preloader";
import { asset } from "@/lib/asset";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tiagograbski-crypto.github.io/Cursolala"),
  title: {
    default: "MASTERGLASS · Alaíde Proença",
    template: "%s · MASTERGLASS",
  },
  description:
    "Imersão presencial de colorimetria Masterglass com Alaíde Proença: previsibilidade absoluta no fundo de clareamento e no acervo digital vitalício.",
  applicationName: "MASTERGLASS",
  openGraph: {
    title: "MASTERGLASS · Alaíde Proença",
    description:
      "A ciência exata para fundos de clareamento perfeitos. Imersão presencial ancorada pelo acervo digital Masterglass.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href={asset("/images/alaide-ghost.jpg")} />
      </head>
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <Preloader />
        <div data-vitrine-shell="">{children}</div>
      </body>
    </html>
  );
}
