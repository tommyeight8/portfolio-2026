// src/components/landing/GlassmorphicLanding.tsx
"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import WhatIDo from "@/components/sections/WhatIDo";
import SkillGraph from "@/components/sections/SkillGraph";
import { HeroParallaxHero } from "@/components/ui/HeroParallax";

type ParallaxItem = {
  title: string;
  link: string;
  thumbnail: string;
};

export default function PortfolioLanding({
  projects,
}: {
  projects: ParallaxItem[];
}) {
  return (
    <>
      {/* MOBILE GRADIENT BACKGROUND WITH STARS */}
      {/* MOBILE GRADIENT BACKGROUND WITH STARS */}
      <div
        className="fixed md:hidden z-0"
        style={{
          top: "env(safe-area-inset-top, 0px)",
          left: 0,
          right: 0,
          bottom: 0,
          marginTop: "calc(-1 * env(safe-area-inset-top, 0px))",
          marginBottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
          marginLeft: "calc(-1 * env(safe-area-inset-left, 0px))",
          marginRight: "calc(-1 * env(safe-area-inset-right, 0px))",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          background:
            "linear-gradient(145deg, #050208 0%, #0a0a12 25%, #0F0A1A 50%, #031a3d 80%, #052658 100%)",
        }}
      >
        {/* Star layers */}
        <div className="stars-sm absolute inset-0" />
        <div className="stars-md absolute inset-0" />
        <div className="stars-lg absolute inset-0" />

        {/* Subtle glow accent */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(5, 38, 88, 0.5) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* FX WRAPPER - hidden on mobile */}
      <div className="fx-wrapper hidden md:block min-h-screen">
        <div className="aurora-background" />
        <div className="cosmos-nebula" />
        <div className="cosmos-dust" />
        <div className="cosmos-dust-twinkle" />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 text-white">
        <Navbar />
        <HeroParallaxHero projects={projects} />
        <WhatIDo />
        <SkillGraph />
        <Footer />
      </main>
    </>
  );
}
