import StyledImage from "@/components/ui/styled-image";
import { getCategoriesWithImages } from "@/lib/services/product.service";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategoriesWithImages();

  return (
    <section>
      <div className="wrapper">
        <h2 className="section-title">Shop By Category</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {categories.map(({ name, id, slug, image }) => (
            <li key={id}>
              <Link
                href={`/products?category=${slug}`}
                className="bg-muted block rounded-lg py-6"
              >
                <StyledImage
                  src={image}
                  alt="Category logo"
                  wrapperClassName="items-start w-[80%] mx-auto *:size-full"
                  sizes="(max-width: 500px) 100vw, (max-width: 740px) 50vw, (max-width: 990px) 33vw, (max-width: 1230px) 25vw, 20vw"
                />
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
