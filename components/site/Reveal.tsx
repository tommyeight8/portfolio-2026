"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// One item easing up into place. `custom` carries an optional delay in seconds.
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

// A list that reveals its <StaggerItem> children one after another.
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const TAGS = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
} as const;

type Tag = keyof typeof TAGS;

type BaseProps = {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
};

// Start a little before the element is fully on screen, and only animate once.
const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;

/** Honours the visitor's "reduce motion" setting for everything inside it. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades a block up into view when it scrolls onto the screen. */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: BaseProps & { delay?: number }) {
  const Component = TAGS[as] as typeof motion.div;
  return (
    <Component
      className={className}
      variants={item}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

/** Wraps a list; its <StaggerItem> children fade in one after another. */
export function Stagger({ as = "div", className, children }: BaseProps) {
  const Component = TAGS[as] as typeof motion.div;
  return (
    <Component
      className={className}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", className, children }: BaseProps) {
  const Component = TAGS[as] as typeof motion.div;
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
