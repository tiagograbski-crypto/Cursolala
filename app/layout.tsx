import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Preloader } from "@/components/ui/Preloader";
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
  title: "Alaíde Proença · GL PRO",
  description: "Espaço de colorimetria Alaíde Proença na plataforma GL PRO.",
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/images/alaide-ghost.jpg" />
      </head>
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <Preloader />
        <div data-vitrine-shell="">{children}</div>
      </body>
    </html>
  );
}
