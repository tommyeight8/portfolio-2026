// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import "./globals.css";
import { AuthProvider } from "@/lib/providers/AuthProvider";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#050208" },
  ],
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        const theme = localStorage.getItem('theme') || 
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
        
        // Set theme-color meta for safe areas
        const themeColor = theme === 'dark' ? '#050208' : '#f8fafc';
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'theme-color';
          document.head.appendChild(meta);
        }
        meta.content = themeColor;
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
