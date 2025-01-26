"use client";

import { motion } from "framer-motion";

const letters = ["T", "o", "d", "o"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced stagger time for subtler animation
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 }, // Reduced y distance for subtler animation
  visible: {
    opacity: 1,
    y: 0,
  },
};

function Title() {
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-lg font-bold uppercase tracking-[5px] text-foreground/80 lg:text-xl" // Adjusted size and added asset_app's text color
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default Title; 