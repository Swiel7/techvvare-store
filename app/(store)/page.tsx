import { Banners, Brands, Categories, Hero } from "@/components/home";
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
      {/* <FeaturedProducts />
      <BestDeal />
      <OnSaleProducts />
      <Testimonials /> */}
    </>
  );
};

export default HomePage;
