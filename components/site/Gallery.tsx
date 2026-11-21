"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryImage = {
  id: number;
  thumb: string;
  full: string;
  alt: string;
  width: number;
  height: number;
};

const CLOSE_MS = 200;

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    // Play the exit animation, then unmount and hand focus back to the thumbnail.
    setClosing(true);
    window.setTimeout(() => {
      setIndex(null);
      setClosing(false);
      opener.current?.focus();
    }, CLOSE_MS);
  }, []);

  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null ? current : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  const active = index !== null ? images[index] : null;
  const many = images.length > 1;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setIndex(i);
              }}
              aria-label={`Open image ${i + 1} of ${images.length}`}
              className="card group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
            >
              <Image
                src={image.thumb}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          data-closing={closing || undefined}
          onClick={close}
          className="lightbox fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
        >
          <div
            key={active.id}
            onClick={(event) => event.stopPropagation()}
            className="lightbox-image relative h-full w-full max-w-6xl"
          >
            <Image
              src={active.full}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            ref={closeButton}
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="lightbox-control right-4 top-4"
          >
            <X className="h-5 w-5" />
          </button>

          {many && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="lightbox-control left-4 top-1/2 -translate-y-1/2"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="lightbox-control right-4 top-1/2 -translate-y-1/2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                {index! + 1} / {images.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
