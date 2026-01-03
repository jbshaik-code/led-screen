"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ZoomableImage from "./ZoomableImage";

interface ImageSliderProps {
  images: string[];
  alt: string;
  interval?: number; // in milliseconds
  autoPlay?: boolean;
}

export default function ImageSlider({
  images,
  alt,
  interval = 5000,
  autoPlay = true,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isHovered, images.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full">
        <ZoomableImage
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <ZoomableImage
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Touch-friendly */}
      <button
        onClick={goToPrevious}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full text-white transition-all z-10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full text-white transition-all z-10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Dots Indicator - Touch-friendly */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all touch-manipulation min-w-[20px] ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75 active:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/50 text-white px-2 py-1 rounded text-xs z-10">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

