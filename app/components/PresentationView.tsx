"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, CheckCircle, ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import ImageSlider from "./ImageSlider";
import ZoomableImage from "./ZoomableImage";
import MediaSlider from "./MediaSlider";

interface Slide {
  type: "title" | "content" | "image" | "list" | "led-type";
  title?: string;
  content?: string;
  imageUrl?: string | string[];
  imageCaption?: string;
  items?: string[];
  ledType?: {
    name: string;
    description: string;
    imageUrl?: string | string[];
    features: string[];
    applications: string[];
  };
}

interface PresentationViewProps {
  slides: Slide[];
  moduleTitle: string;
  moduleDescription: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationView({
  slides,
  moduleTitle,
  moduleDescription,
  isOpen,
  onClose,
}: PresentationViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          onClick={onClose}
          className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full backdrop-blur-sm transition-colors touch-manipulation"
          aria-label="Close presentation"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>
      </div>

      <div className="h-full w-full flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-6xl h-full max-h-[95vh] sm:max-h-[90vh]">
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Keyboard]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => {
                return `<span class="${className}">${index + 1}</span>`;
              },
            }}
            keyboard={{ enabled: true }}
            touchEventsTarget="container"
            allowTouchMove={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="h-full w-full rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Title Slide */}
            <SwiperSlide>
              <div className="h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white p-4 sm:p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center w-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-4 sm:mb-8"
                  >
                    <div className="inline-flex p-4 sm:p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <ImageIcon className="h-10 w-10 sm:h-16 sm:w-16" />
                    </div>
                  </motion.div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4">{moduleTitle}</h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto px-4">
                    {moduleDescription}
                  </p>
                </motion.div>
              </div>
            </SwiperSlide>

            {/* Content Slides */}
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="h-full bg-white p-8 md:p-12 flex flex-col">
                  {slide.type === "title" && (
                    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center w-full"
                      >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 px-4">
                          {slide.title}
                        </h2>
                        {slide.content && (
                          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            {slide.content}
                          </p>
                        )}
                      </motion.div>
                    </div>
                  )}

                  {slide.type === "content" && (
                    <div className="flex-1 flex flex-col justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                      >
                        {slide.title && (
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                            {slide.title}
                          </h2>
                        )}
                        {slide.content && (
                          <div className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6 whitespace-pre-line">
                            {slide.content.split('\n\n').map((paragraph: string, pIndex: number) => (
                              <p key={pIndex} className={pIndex > 0 ? "mt-3 sm:mt-4" : ""}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                        {slide.items && (
                          <ul className="space-y-3 sm:space-y-4">
                            {slide.items.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start space-x-2 sm:space-x-3"
                              >
                                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                                <span className="text-sm sm:text-base md:text-lg text-gray-700">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </div>
                  )}

                  {slide.type === "image" && slide.imageUrl && (
                    <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 relative rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 sm:mb-6 min-h-[250px] sm:min-h-[300px] md:min-h-[400px]"
                      >
                        {(() => {
                          const mediaUrl = Array.isArray(slide.imageUrl) ? slide.imageUrl[0] : slide.imageUrl;
                          const isVideo = typeof mediaUrl === 'string' && (mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm'));
                          
                          if (Array.isArray(slide.imageUrl) && slide.imageUrl.length > 1) {
                            return (
                              <MediaSlider
                                media={slide.imageUrl}
                                alt={slide.title || "LED Display"}
                                interval={5000}
                                autoPlay={true}
                              />
                            );
                          } else if (isVideo) {
                            return (
                              <video
                                src={mediaUrl}
                                className="w-full h-full object-contain"
                                controls
                                playsInline
                                loop
                                controlsList="nodownload"
                              />
                            );
                          } else {
                            return (
                              <ZoomableImage
                                src={mediaUrl}
                                alt={slide.title || "LED Display"}
                                fill
                                className="object-contain sm:object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                                quality={85}
                              />
                            );
                          }
                        })()}
                      </motion.div>
                      {slide.title && (
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{slide.title}</h3>
                      )}
                      {slide.imageCaption && (
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2 sm:mb-3">{slide.imageCaption}</p>
                      )}
                      {slide.content && (
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {slide.content}
                        </p>
                      )}
                    </div>
                  )}

                  {slide.type === "list" && (
                    <div className="flex-1 flex flex-col justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
                      {slide.title && (
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
                          {slide.title}
                        </h2>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {slide.items?.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-blue-50 rounded-lg"
                          >
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {slide.type === "led-type" && slide.ledType && (
                    <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                      >
                        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 flex-1">
                            {slide.ledType.name}
                          </h2>
                          <div className="px-2 sm:px-4 py-1 sm:py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-xs sm:text-sm flex-shrink-0">
                            {slide.ledType.name.split(" ")[0]}
                          </div>
                        </div>

                        {slide.ledType.imageUrl && (
                          <div className="relative h-48 sm:h-64 md:h-96 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 sm:mb-6">
                            <ZoomableImage
                              src={Array.isArray(slide.ledType.imageUrl) ? slide.ledType.imageUrl[0] : slide.ledType.imageUrl}
                              alt={slide.ledType.name}
                              fill
                              className="object-contain p-4 sm:p-6"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                              quality={85}
                            />
                          </div>
                        )}

                        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                          {slide.ledType.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2 flex-shrink-0" />
                              Key Features
                            </h3>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {slide.ledType.features.map((feature, i) => (
                                <li key={i} className="text-xs sm:text-sm md:text-base text-gray-700 flex items-start">
                                  <span className="text-indigo-600 mr-2 mt-1.5 flex-shrink-0">▸</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2 flex-shrink-0" />
                              Applications
                            </h3>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {slide.ledType.applications.map((app, i) => (
                                <li key={i} className="text-xs sm:text-sm md:text-base text-gray-700 flex items-start">
                                  <span className="text-indigo-600 mr-2 mt-1.5 flex-shrink-0">▸</span>
                                  <span>{app}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation - Hidden on mobile, visible on larger screens */}
          <button className="swiper-button-prev-custom hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full backdrop-blur-sm transition-colors touch-manipulation">
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
          <button className="swiper-button-next-custom hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full backdrop-blur-sm transition-colors touch-manipulation">
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Slide Counter */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-full backdrop-blur-sm text-white text-xs sm:text-sm">
            {activeIndex + 1} / {slides.length + 1}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: white;
          width: 32px;
          border-radius: 6px;
        }
        .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
    </div>
  );
}

