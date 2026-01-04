"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ZoomableImage from "./ZoomableImage";

interface MediaSliderProps {
  media: string[];
  alt: string;
  interval?: number;
  autoPlay?: boolean;
}

export default function MediaSlider({
  media,
  alt,
  interval = 5000,
  autoPlay = true,
}: MediaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!autoPlay || isHovered || media.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isHovered, media.length, interval]);

  useEffect(() => {
    // Auto-play video when it becomes active
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && isVideo(media[currentIndex])) {
      // Ensure video is muted before playing
      currentVideo.muted = true;
      currentVideo.play().catch(() => {
        // Auto-play failed, user interaction required
      });
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }

    // Pause other videos and ensure they're muted
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });
  }, [currentIndex, media]);

  const isVideo = (url: string | undefined) => {
    if (!url || typeof url !== 'string') return false;
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && isVideo(media[currentIndex])) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play();
        setIsPlaying(true);
      }
    }
  };

  if (media.length === 0) return null;

  if (media.length === 1) {
    const singleMedia = media[0];
    if (!singleMedia) return null;
    if (isVideo(singleMedia)) {
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <video
            ref={(el) => { videoRefs.current[0] = el; }}
            src={singleMedia}
            className="w-full h-full object-contain"
            controls
            playsInline
            loop
            muted
            controlsList="nodownload"
          />
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-full">
          <ZoomableImage
            src={singleMedia}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
        </div>
      );
    }
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
          {media[currentIndex] && isVideo(media[currentIndex]) ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={(el) => { videoRefs.current[currentIndex] = el; }}
                src={media[currentIndex]}
                className="w-full h-full object-contain"
                controls
                playsInline
                loop
                muted
                controlsList="nodownload"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          ) : media[currentIndex] ? (
            <ZoomableImage
              src={media[currentIndex]}
              alt={`${alt} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full text-white transition-all z-10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous media"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full text-white transition-all z-10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next media"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Dots Indicator */}
      {media.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
          {media.map((_, index) => (
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

      {/* Media Counter */}
      {media.length > 1 && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/50 text-white px-2 py-1 rounded text-xs z-10">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
}

