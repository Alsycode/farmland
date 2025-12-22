// src/components/AnimatedSection.jsx
import { motion } from "framer-motion";

export default function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.section>
  );
}
