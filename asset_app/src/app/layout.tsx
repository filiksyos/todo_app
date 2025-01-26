import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";

import "./globals.css";
import bg from "../assets/bg.jpeg";

const BattlefinFont = localFont({
  src: "../assets/fonts/Battlefin-Black.woff2",
  variable: "--font-battlefin",
  weight: "900",
});

const NBInternationalFont = localFont({
  variable: "--font-nb-international",
  src: [
    {
      path: "../assets/fonts/NBInternationalLightWebfont.woff2",
      weight: "300",
    },
    {
      path: "../assets/fonts/NBInternationalRegularWebfont.woff2",
      weight: "400",
    },
    {
      path: "../assets/fonts/NBInternationalBoldWebfont.woff2",
      weight: "700",
    },
  ],
});

export const metadata: Metadata = {
  title: "TODO App",
  description: "A simple TODO application built with Next.js",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link href="/favicon.svg" rel="icon" sizes="any" />
    </head>
    <body
      className={cn(
        BattlefinFont.variable,
        NBInternationalFont.variable,
        "relative min-h-screen bg-background font-sans",
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Providers>
          <Image
            alt="background"
            className="fixed left-0 top-0 -z-10 h-full w-full object-cover opacity-30"
            src={bg}
          />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
