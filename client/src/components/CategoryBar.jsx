import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOPBAR_HEIGHT_PX } from "./Topbar";

export default function CategoryBar({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollRight(maxScrollLeft - el.scrollLeft > 1);
  };

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -240, behavior: "smooth" });
    window.requestAnimationFrame(updateScrollState);
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
    window.requestAnimationFrame(updateScrollState);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [categories]);

  const stickyOffset = useMemo(() => (TOPBAR_HEIGHT_PX || 88) + 8, []);

  return (
    <div
      className="sticky z-30 bg-[#F5F6FA]/95 backdrop-blur-md border-b border-gray-200/60 shadow-xs px-12 sm:px-14 lg:px-16 py-2.5"
      style={{ top: stickyOffset }}
    >
      <div className="relative mx-auto w-full">
        <button
          type="button"
          onClick={handleScrollLeft}
          aria-label="Scroll categories left"
          disabled={!canScrollLeft}
          className={`absolute items-center justify-center text-slate-600 transition-all -translate-y-1/2 bg-white/95 border border-slate-200 rounded-full shadow-md left-0 top-1/2 h-8 w-8 hover:bg-slate-50 hover:text-orange-600 flex z-20 ${
            !canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-10 sm:px-12 py-1"
        >
          {categories.map((cat, idx) => {
            const label = typeof cat === "string" ? cat : cat?.name || "";
            if (!label) return null;
            const isActive = activeCategory === label;

            return (
              <button
                key={`${label}-${idx}`}
                onClick={() => setActiveCategory(label)}
                className={`
                  group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer
                  ${
                    isActive
                      ? "bg-gradient-primary text-white shadow-sm shadow-orange-300/50"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/30"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll categories right"
          disabled={!canScrollRight}
          className={`absolute items-center justify-center text-slate-600 transition-all -translate-y-1/2 bg-white/95 border border-slate-200 rounded-full shadow-md right-0 top-1/2 h-8 w-8 hover:bg-slate-50 hover:text-orange-600 flex z-20 ${
            !canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
