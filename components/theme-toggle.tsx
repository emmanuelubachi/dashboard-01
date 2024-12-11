"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2 rounded-lg bg-muted text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-muted/80 transition-colors"
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <Sun className="h-5 w-5 transition-transform duration-300 dark:rotate-90 dark:scale-0" />

      {/* Moon Icon */}
      <Moon className="absolute h-5 w-5 transition-transform duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
