"use client";

import ReviewCard from "@/components/review/review-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { TReviewWithAuthor } from "@/types";

const TestimonialsCarousel = ({
  testimonials,
}: {
  testimonials: TReviewWithAuthor[];
}) => {
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
      <CarouselContent>
        {testimonials.map((review: TReviewWithAuthor) => (
          <CarouselItem
            key={review.id}
            className="grid sm:basis-1/2 lg:basis-1/3"
          >
            <ReviewCard review={review} className="group" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
};

export default TestimonialsCarousel;
