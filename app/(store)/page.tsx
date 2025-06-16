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
    <>
      <Hero />
      <Brands />
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>
      <Banners />
      <Suspense fallback={<Loading />}>
        <FeaturedProducts />
      </Suspense>
      <BestDeal />
      <Suspense fallback={<Loading />}>
        <OnSaleProducts />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Testimonials />
      </Suspense>
    </>
  );
};

export default HomePage;
