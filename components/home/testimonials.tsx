import TestimonialsCarousel from "@/components/home/testimonials-carousel";
import { getTestimonials } from "@/lib/services/review.service";

const Testimonials = async () => {
  const testimonials = await getTestimonials();

  return (
    <section className="bg-muted pt-16 !pb-10 lg:pt-20 lg:!pb-14">
      <div className="wrapper">
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
