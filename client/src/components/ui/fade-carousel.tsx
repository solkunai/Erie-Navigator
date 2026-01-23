import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  id: string;
  imageUrl?: string;
  caption: string;
  placeholderColor?: string;
}

interface FadeCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2";
  showArrows?: boolean;
  pauseOnHover?: boolean;
}

export function FadeCarousel({
  slides,
  autoPlayInterval = 4000,
  className,
  aspectRatio = "16/9",
  showArrows = true,
  pauseOnHover = true,
}: FadeCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => resetTimeout();
  }, [currentIndex, slides.length, autoPlayInterval, isPaused, resetTimeout]);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    },
    [goToPrev, goToNext]
  );

  // Handle touch/swipe for mobile
  const touchStartX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
  };

  if (slides.length === 0) return null;

  const aspectClasses = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
  };

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      {/* Slides Container */}
      <div className={cn("relative w-full overflow-hidden rounded-sm", aspectClasses[aspectRatio])}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            aria-hidden={index !== currentIndex}
          >
            {slide.imageUrl ? (
              <img
                src={slide.imageUrl}
                alt={slide.caption}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div
                className={cn(
                  "w-full h-full flex items-center justify-center",
                  slide.placeholderColor || "bg-gradient-to-br from-[#FF851A]/30 to-[#FFD700]/30"
                )}
              >
                <span className="text-4xl md:text-6xl font-black text-white/50">
                  {slide.caption.charAt(0)}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows - Always Visible */}
        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/90 hover:bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[3px_3px_0px_0px_rgba(35,24,15,1)] transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/90 hover:bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[3px_3px_0px_0px_rgba(35,24,15,1)] transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </button>
          </>
        )}

        {/* Slide Indicator Dots (optional, subtle) */}
        {slides.length > 1 && (
          <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full border border-black transition-all",
                  index === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>

      {/* Caption */}
      <p className="text-sm md:text-base font-bold text-center mt-3 text-[#FF851A]">
        {slides[currentIndex]?.caption}
      </p>
    </div>
  );
}

export default FadeCarousel;
