import { ThemeProvider } from "next-themes";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { FocusProvider } from "@/components/ui/FocusMode";
import { Nunito, DM_Sans, JetBrains_Mono, Noto_Naskh_Arabic } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});
const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
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
