import type { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial:  { opacity: 0, y: 16 },
  enter:    { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export const flipFront: Variants = {
  default:  { rotateY: 0   },
  flipped:  { rotateY: 180 },
};

export const flipBack: Variants = {
  default:  { rotateY: 180 },
  flipped:  { rotateY: 0   },
};

export const xpBurst: Variants = {
  initial:  { scale: 0, opacity: 0 },
  animate:  { scale: [0, 1.3, 1], opacity: [0, 1, 1, 0], y: [0, -40, -60],
              transition: { duration: 1.2, times: [0, 0.3, 0.6, 1] } },
};
