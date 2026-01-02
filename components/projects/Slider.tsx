"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  caption: string;
}

interface GallerySliderProps {
  images: GalleryImage[];
  title?: string;
}

export default function GallerySlider({
  images,
  title = "Project Gallery",
}: GallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeThumb = container.children[activeIndex] as HTMLElement;
      if (activeThumb) {
        const containerWidth = container.offsetWidth;
        const thumbOffset = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const scrollPosition =
          thumbOffset - containerWidth / 2 + thumbWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-14 pb-28">
      {title && (
        <h2 className="text-3xl sm:text-4xl font-normal mb-10 max-w-[900px] mx-auto px-6">
          {title}
        </h2>
      )}

      {/* Main Slider */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 max-w-[1200px] mx-auto mb-8 px-4 sm:px-5">
        <button
          onClick={handlePrev}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center transition-all duration-300 shrink-0 hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="relative flex-1 max-w-[900px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5">
          <img
            key={activeIndex}
            src={images[activeIndex].url}
            alt={images[activeIndex].caption}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 pt-10 pb-4 px-4 sm:pt-14 sm:pb-6 sm:px-7 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end gap-4">
            <span className="text-sm sm:text-[15px] font-normal text-white/90 line-clamp-1">
              {images[activeIndex].caption}
            </span>
            <span className="text-xs sm:text-[13px] font-medium text-white/50 tabular-nums shrink-0">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center transition-all duration-300 shrink-0 hover:bg-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative max-w-[900px] mx-auto">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-[120px] bg-gradient-to-r from-[#0a0a0b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-[120px] bg-gradient-to-l from-[#0a0a0b] to-transparent z-10 pointer-events-none" />

        <div
          ref={thumbnailContainerRef}
          className="flex gap-2 sm:gap-3 overflow-x-auto py-4 px-10 sm:px-14 scroll-smooth scrollbar-hide"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                shrink-0 w-16 h-11 sm:w-[100px] sm:h-[68px] rounded-md sm:rounded-lg overflow-hidden 
                transition-all duration-400 ease-out
                ${
                  activeIndex === index
                    ? "opacity-100 scale-100 ring-2 ring-white/80"
                    : "opacity-40 scale-90 hover:opacity-60"
                }
              `}
              aria-label={`View ${image.caption}`}
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
