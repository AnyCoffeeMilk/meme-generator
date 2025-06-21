import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { getDictionary } from "@/utils/getDictionary";
import { DictionaryProvider } from "./context/DictionaryProvider";
import "./globals.css";

const sourceHanSans = localFont({
  src: "../../public/fonts/SourceHanSans.ttf",
  variable: "--font-source-han-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MemeGen",
  description: "Generate Meme Caption by Image and keywords.",
};

interface Props {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isChinese = lang.startsWith("zh");

  return (
    <html lang={lang}>
      <body className={`${geistMono.variable} ${isChinese && sourceHanSans.variable} antialiased`}>
        <DictionaryProvider dict={dict}>{children}</DictionaryProvider>
      </body>
    </html>
  );
}
