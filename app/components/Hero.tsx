"use client";

import { ArrowDown, Zap, BookOpen } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            {/* Company logos */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* SBC Logo - First */}
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 h-16 sm:h-20 md:h-24 lg:h-28">
                <Image
                  src="/SBC.png"
                  alt="SBC Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  priority
                />
              </div>
              {/* WEJHA Logo - Second */}
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 h-16 sm:h-20 md:h-24 lg:h-28">
                <Image
                  src="/Wejha_Logo_-_CMs_3-.png"
                  alt="WEJHA Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 relative z-10 drop-shadow-sm">
              {t("hero.title")}
              <br />
              <span className="text-blue-600 drop-shadow-sm">{t("hero.subtitle")}</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <a
              href="#modules"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 touch-manipulation"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{t("hero.startLearning")}</span>
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors flex items-center justify-center space-x-2 touch-manipulation"
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{t("hero.learnMore")}</span>
            </a>
          </div>
          <div className="animate-bounce flex justify-center">
            <ArrowDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}

