"use client";

import { motion, useReducedMotion } from "framer-motion";

const revealClassName = (className?: string) =>
  ["reveal-content", className].filter(Boolean).join(" ");

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={revealClassName(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={revealClassName(className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
