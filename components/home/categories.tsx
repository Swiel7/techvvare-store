import { getCategoriesWithImages } from "@/lib/services/product.service";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategoriesWithImages();

  return (
    <section>
      <div className="wrapper">
        <h2 className="section-title">Shop By Category</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {categories.map(({ name, image, id, slug }) => (
            <li key={id}>
              <Link
                href={`/products?category=${slug}`}
                className="bg-muted block rounded-lg py-6"
              >
                <div className="relative mx-auto aspect-square w-[80%]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
                    alt="Category logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />
                </div>
                <span className="block pt-8 text-center font-medium lg:text-lg">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
