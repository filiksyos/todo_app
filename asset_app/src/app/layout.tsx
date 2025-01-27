import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import BackgroundProvider from "./background-provider";

import "./globals.css";

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
  title: "TODO APP",
  description: "A modern todo application with dark/light mode support",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "flex min-h-screen flex-col",
          BattlefinFont.variable,
          NBInternationalFont.variable,
        )}
      >
        <Providers>
          <div suppressHydrationWarning className="relative flex min-h-screen flex-col">
            <BackgroundProvider />
            <Header />
            <main className="container flex flex-1 flex-col">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
