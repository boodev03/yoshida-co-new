import { Gothic_A1, Noto_Sans, Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { TranslationsProvider } from "@/providers/translation-provider";
import { getDictionary } from "./dictionaries";
import { QueryProvider } from "@/providers/query-provider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const helveticaNeueBold = localFont({
  src: "./fonts/HelveticaNeue-Bold.otf",
  variable: "--font-helvetica-neue-bold",
  display: "swap",
});

const helveticaNeueRoman = localFont({
  src: "./fonts/HelveticaNeue-Roman.otf",
  variable: "--font-helvetica-neue-roman",
  display: "swap",
});

const gothicFont = Gothic_A1({
  variable: "--font-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "ja" }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/webp" href="/favicon.webp" />
      </head>
      <body
        className={`${notoSansJP.variable} ${notoSans.variable} ${helveticaNeueBold.variable} ${helveticaNeueRoman.variable} ${shipporiMincho.variable} ${gothicFont.variable} antialiased`}
      >
        <QueryProvider>
          <TranslationsProvider dict={dict} locale={lang}>
            {children}
          </TranslationsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
