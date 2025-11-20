import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter"
});

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas"
});

const playfair = Playfair_Display({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-playfair"
});

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton"
});

export const metadata: Metadata = {
  title: "YouTube Thumbnail Studio",
  description:
    "Interactive generator for effective, high-conversion YouTube thumbnails with creative controls and instant export."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} ${playfair.variable} ${anton.variable}`}
    >
      <body className="font-sans bg-youtube-dark text-white">{children}</body>
    </html>
  );
}
