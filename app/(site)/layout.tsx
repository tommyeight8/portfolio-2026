import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MotionProvider } from "@/components/site/Reveal";
import { getSettings } from "@/lib/data";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// Cached pages are refreshed by Payload hooks on every content change; this is the fallback.
export const revalidate = 3600;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = [settings.siteName, settings.ownerTitle]
    .filter(Boolean)
    .join(" | ");
  return {
    title: { default: title, template: `%s | ${settings.siteName}` },
    description: settings.siteDescription ?? undefined,
    icons: { icon: "/images/portfolio-logo.png" },
  };
}

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.classList.add('dark')}})()`;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={roboto.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Nav siteName={settings.siteName} />
        <main className="flex-1">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
