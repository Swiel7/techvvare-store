"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ReactNode, useRef } from "react";

export const TestimonialsCarousel = ({ children }: { children: ReactNode }) => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 lg:pb-10">
        <h2 className="section-title pb-0">Our Happy Clients</h2>
        <div className="flex gap-4">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </div>
      {children}
      <CarouselDots />
    </Carousel>
  );
};

export const TestimonialsCarouselContent = CarouselContent;
export const TestimonialsCarouselItem = CarouselItem;
