"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/components/Icons";

interface GalleryImage {
  src: string;
  alt: string;
}

interface PhotoGalleryGridProps {
  images: GalleryImage[];
  dark?: boolean;
}

export function PhotoGalleryGrid({
  images,
  dark = false,
}: PhotoGalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveIndex((idx) =>
          idx === null ? null : (idx - 1 + images.length) % images.length
        );
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((idx) =>
          idx === null ? null : (idx + 1) % images.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[15px] focus-visible:outline-2 focus-visible:outline-[#43ff57] ${
              dark ? "bg-white/5" : "bg-black/5"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Закрыть просмотр"
            className="absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveIndex(
                (activeIndex - 1 + images.length) % images.length
              )
            }
            aria-label="Предыдущее фото"
            className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-[#43ff57] hover:text-black"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>

          <figure className="max-h-[86vh] max-w-5xl text-center">
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-h-[78vh] w-auto rounded-[14px] object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-sm text-white/80">
              {images[activeIndex].alt} ({activeIndex + 1} / {images.length})
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
            aria-label="Следующее фото"
            className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-[#43ff57] hover:text-black"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
