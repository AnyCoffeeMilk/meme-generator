import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { getDictionary } from "@/utils/getDictionary";
import { DictionaryProvider } from "./context/DictionaryProvider";
import "./globals.css";

const notoSansSC = localFont({
  src: "../../public/fonts/NotoSansSC.ttf",
  variable: "--font-noto-sans-sc",
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
  params: { lang: string };
}

export default async function RootLayout({ children, params }: Props) {
  const dict = await getDictionary(params.lang);
  const isChinese = params.lang.startsWith("zh");

  return (
    <html lang={params.lang}>
      <body className={`${geistMono.variable} ${isChinese && notoSansSC.variable} antialiased`}>
        <DictionaryProvider dict={dict}>{children}</DictionaryProvider>
      </body>
    </html>
  );
}
