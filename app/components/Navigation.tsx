"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Monitor, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "#home", label: t("nav.home") },
    { href: "#modules", label: t("nav.modules") },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="#home" className="flex items-center space-x-1.5 sm:space-x-2 touch-manipulation" onClick={() => setIsOpen(false)}>
            <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {t("nav.title")}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors font-medium text-sm lg:text-base touch-manipulation"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium text-sm touch-manipulation"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "中文" : "English"}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 space-y-2 border-t border-gray-200 overflow-hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:text-blue-600 active:text-blue-700 active:bg-blue-50 transition-colors font-medium text-base touch-manipulation rounded-md"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

