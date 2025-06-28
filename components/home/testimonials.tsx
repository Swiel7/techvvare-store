import {
  TestimonialsCarousel,
  TestimonialsCarouselContent,
  TestimonialsCarouselItem,
} from "@/components/home/testimonials-carousel";
import ReviewCard from "@/components/review/review-card";
import { getTestimonials } from "@/lib/services/review.service";

const Testimonials = async () => {
  const testimonials = await getTestimonials();

  return (
    <section className="bg-muted pt-16 !pb-10 lg:pt-20 lg:!pb-14">
      <div className="wrapper">
        <TestimonialsCarousel>
          <TestimonialsCarouselContent>
            {testimonials.map((review) => (
              <TestimonialsCarouselItem
                key={review.id}
                className="grid sm:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard review={review} className="group" />
              </TestimonialsCarouselItem>
            ))}
          </TestimonialsCarouselContent>
        </TestimonialsCarousel>
      </div>
    </section>
  );
};

export default Testimonials;
