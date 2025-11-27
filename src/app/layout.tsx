import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kool — Your Engineering Brain",
  description:
    "Connect your stack. Ask questions. Get answers rooted in your code, tickets, and documentation.",
  openGraph: {
    title: "Kool — Your Engineering Brain",
    description: "Connect your stack. Ask questions. Get answers rooted in your code, tickets, and documentation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${jetbrains.variable} ${crimsonPro.variable}`}>
        {children}
      </body>
    </html>
  );
}
