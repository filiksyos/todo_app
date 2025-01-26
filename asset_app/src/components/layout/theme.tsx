"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { motion } from "framer-motion";

import Button from "../chromia-ui-kit/button";
import iconMoon from "../../assets/icon-moon.svg";
import iconSun from "../../assets/icon-sun.svg";

function Theme() {
  const { setTheme, theme } = useTheme();
  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "-50%",
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: "-50%",
      }}
    >
      <Button
        onClick={handleTheme}
        variant="ghost"
        size="s"
        className="h-9 w-9"
      >
        <Image
          src={theme === "light" ? iconMoon : iconSun}
          alt={theme === "light" ? "Dark mode" : "Light mode"}
          width={20}
          height={20}
        />
      </Button>
    </motion.div>
  );
}

export default Theme; 