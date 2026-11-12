import { ThemeProvider } from "next-themes";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { FocusProvider } from "@/components/ui/FocusMode";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

// Bundle the same font families so deployment does not depend on a remote CSS response.
const nunito = localFont({
  src: [
    {path: "../assets/fonts/nunito.woff2", weight: "400", style: "normal"},
    {path: "../assets/fonts/nunito.woff2", weight: "600", style: "normal"},
    {path: "../assets/fonts/nunito.woff2", weight: "700", style: "normal"},
    {path: "../assets/fonts/nunito.woff2", weight: "800", style: "normal"},
    {path: "../assets/fonts/nunito.woff2", weight: "900", style: "normal"},
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});
const dmSans = localFont({
  src: [
    {path: "../assets/fonts/dmsans.woff2", weight: "400", style: "normal"},
    {path: "../assets/fonts/dmsans.woff2", weight: "500", style: "normal"},
    {path: "../assets/fonts/dmsans.woff2", weight: "600", style: "normal"},
    {path: "../assets/fonts/dmsans.woff2", weight: "700", style: "normal"},
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});
const jbMono = localFont({
  src: "../assets/fonts/jetbrainsmono.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});
const arabicFont = localFont({
  src: [
    {path: "../assets/fonts/notonaskharabic.woff2", weight: "400", style: "normal"},
    {path: "../assets/fonts/notonaskharabic.woff2", weight: "500", style: "normal"},
    {path: "../assets/fonts/notonaskharabic.woff2", weight: "600", style: "normal"},
    {path: "../assets/fonts/notonaskharabic.woff2", weight: "700", style: "normal"},
  ],
  variable: "--font-arabic",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "EnglishCamp — A1 to B2 English",
  description: "Interactive English learning platform A1 to B2 for Arabic speakers",
  icons: { icon: [{ url: "/media/brand/englishcamp-icon-32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon.ico", sizes: "32x32" }], apple: [{ url: "/media/brand/englishcamp-icon-180.png", sizes: "180x180", type: "image/png" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${nunito.variable} ${dmSans.variable} ${jbMono.variable} ${arabicFont.variable}`}>
      <body className="font-body antialiased min-h-screen bg-surface">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <FocusProvider>
            <LayoutShell>
              {children}
            </LayoutShell>
          </FocusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
