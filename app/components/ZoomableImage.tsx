"use client";

import { useState, useRef, useEffect, TouchEvent } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
}

export default function ZoomableImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  quality = 85,
  priority = false,
}: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastTouchCenter, setLastTouchCenter] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const minScale = 1;
  const maxScale = 4;

  // Reset zoom
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  // Calculate distance between two touches
  const getTouchDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate center point between two touches
  const getTouchCenter = (touch1: Touch, touch2: Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Handle touch start
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // Two-finger pinch
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const center = getTouchCenter(e.touches[0], e.touches[1]);
      setLastTouchDistance(distance);
      setLastTouchCenter(center);
    } else if (e.touches.length === 1 && isZoomed) {
      // Single touch drag when zoomed
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  // Handle touch move
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // Two-finger pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const center = getTouchCenter(e.touches[0], e.touches[1]);
      
      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance;
        const newScale = Math.min(Math.max(scale * scaleChange, minScale), maxScale);
        
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = center.x - rect.left;
          const centerY = center.y - rect.top;
          
          const newPosition = {
            x: centerX - (centerX - position.x) * (newScale / scale),
            y: centerY - (centerY - position.y) * (newScale / scale),
          };
          
          setScale(newScale);
          setPosition(newPosition);
          setIsZoomed(newScale > 1);
        }
      }
      
      setLastTouchDistance(distance);
      setLastTouchCenter(center);
    } else if (e.touches.length === 1 && isDragging && isZoomed) {
      // Single touch drag
      e.preventDefault();
      const newPosition = {
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      };
      
      // Constrain position to keep image within bounds
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();
        
        const maxX = (imageRect.width * scale - containerRect.width) / 2;
        const maxY = (imageRect.height * scale - containerRect.height) / 2;
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newPosition.x)),
          y: Math.max(-maxY, Math.min(maxY, newPosition.y)),
        });
      }
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setLastTouchDistance(0);
    setIsDragging(false);
  };

  // Handle double tap to zoom
  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
      setIsZoomed(true);
    } else {
      resetZoom();
    }
  };

  // Handle mouse wheel zoom (for desktop)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(scale * delta, minScale), maxScale);
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = e.clientX - rect.left;
        const centerY = e.clientY - rect.top;
        
        const newPosition = {
          x: centerX - (centerX - position.x) * (newScale / scale),
          y: centerY - (centerY - position.y) * (newScale / scale),
        };
        
        setScale(newScale);
        setPosition(newPosition);
        setIsZoomed(newScale > 1);
      }
    }
  };

  // Reset on escape key
  useEffect(() => {
    if (!isZoomed) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isZoomed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
    >
      <div
        ref={imageRef}
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={className}
            sizes={sizes}
            quality={quality}
            priority={priority}
            draggable={false}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className={`w-full h-full ${className}`}
            sizes={sizes}
            quality={quality}
            priority={priority}
            draggable={false}
          />
        )}
      </div>

      {/* Zoom Controls */}
      {isZoomed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-2 z-10">
          <button
            onClick={() => {
              const newScale = Math.min(scale + 0.5, maxScale);
              setScale(newScale);
            }}
            className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors touch-manipulation"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              const newScale = Math.max(scale - 0.5, minScale);
              if (newScale === 1) {
                resetZoom();
              } else {
                setScale(newScale);
                setIsZoomed(newScale > 1);
              }
            }}
            className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors touch-manipulation"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={resetZoom}
            className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors touch-manipulation"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Zoom hint for mobile */}
      {!isZoomed && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10 pointer-events-none">
          <span className="hidden sm:inline">Pinch to zoom • Double click to zoom</span>
          <span className="sm:hidden">Pinch to zoom • Double tap to zoom</span>
        </div>
      )}
    </div>
  );
}

