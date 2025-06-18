import {
  Banners,
  BestDeal,
  Brands,
  Categories,
  FeaturedProducts,
  Hero,
  OnSaleProducts,
  Testimonials,
} from "@/components/home";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <Brands />
      <Categories />
      <Banners />
      <FeaturedProducts />
      <BestDeal />
      <OnSaleProducts />
      <Testimonials />
    </Suspense>
  );
};

export default HomePage;
