import { Button } from "@/components/ui/button";
import { bestDealData } from "@/data";
import Image from "next/image";
import Link from "next/link";

const BestDeal = () => {
  const { title, description, image } = bestDealData;

  return (
    <section>
      <div className="wrapper">
        <div className="bg-foreground relative flex h-[600px] items-center gap-16 overflow-hidden rounded-lg px-6 not-lg:flex-col lg:px-16">
          <div className="top-0 z-10 py-6 not-lg:absolute not-lg:px-6 not-lg:text-center md:py-10">
            <h2 className="text-3xl font-bold text-white lg:text-6xl">
              {title}
            </h2>
            <p className="text-muted mt-4 lg:text-lg">{description}</p>
            <Button asChild size="lg" className="mt-10" variant="secondary">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="relative mt-auto aspect-[453/590] h-1/2 lg:h-[95%]">
            <Image
              src={image}
              alt="Best Deal"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 235px, 440px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestDeal;
