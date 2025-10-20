"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "./theme";

const ConfettiBurst: React.FC<{ show: boolean }> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 40,
              rotate: 0,
            }}
            animate={{
              y: -60 - Math.random() * 200,
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            }}
            transition={{ duration: 1.2 + Math.random() * 0.8, ease }}
            className="absolute text-2xl"
          >
            {Math.random() > 0.5 ? "✨" : "🌿"}
          </motion.div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfettiBurst;
