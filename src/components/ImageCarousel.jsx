import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FcPrevious, FcNext } from "react-icons/fc";

function ImageCarousel({ srcArray = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {srcArray.map((src, idx) => (
            <div className="min-w-full flex-shrink-0" key={idx}>
              <img
                src={src}
                alt={`Slide ${idx}`}
                className="h-64 w-full rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 shadow-md hover:bg-white dark:bg-gray-800 dark:text-white"
      >
        <FcPrevious />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 shadow-md hover:bg-white dark:bg-gray-800 dark:text-white"
      >
        <FcNext />
      </button>
    </div>
  );
}

export default ImageCarousel;
