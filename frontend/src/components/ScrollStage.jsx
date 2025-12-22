import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ScrollStage({ children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // 👇 THIS is the upward slide illusion
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={ref} className="relative h-[300vh]">
      <motion.div
        className="fixed inset-0 overflow-hidden"
        style={{ y }}
      >
        <div className="h-screen overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
