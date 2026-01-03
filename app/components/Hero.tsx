"use client";

import { ArrowDown, Monitor, Zap, BookOpen } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-blue-100 rounded-full">
              <Monitor className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600" />
            </div>
          </div>
          <div className="relative inline-block">
            {/* Logo behind text */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-15 sm:opacity-20 md:opacity-25">
              <div className="relative w-64 sm:w-80 md:w-96 lg:w-[500px] h-32 sm:h-40 md:h-48 lg:h-56">
                {/* Try to load as image - if EPS, use img tag instead */}
                <img
                  src="/logo wejha 2 .eps"
                  alt=""
                  className="w-full h-full object-contain"
                  style={{ filter: 'grayscale(100%) opacity(0.3)' }}
                  onError={(e) => {
                    // Hide if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 relative z-10 drop-shadow-sm">
              LED Display Screen
              <br />
              <span className="text-blue-600 drop-shadow-sm">Technical Training</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Master LED display screen technology through comprehensive bilingual training
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            designed for professionals working with video walls and digital displays
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <a
              href="#modules"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 touch-manipulation"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Start Learning</span>
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors flex items-center justify-center space-x-2 touch-manipulation"
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Learn More</span>
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

