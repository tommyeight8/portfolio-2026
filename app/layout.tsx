// src/app/layout.tsx

import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

/* ✅ THIS IS REQUIRED */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Tommy V. | Web Developer & Graphic Designer",
  description: "Creative developer crafting digital experiences.",
  icons: {
    icon: "/images/portfolio-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme pre-hydration script is OK */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme =
                  localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
