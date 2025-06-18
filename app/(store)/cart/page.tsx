import { Cart } from "@/components/cart";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";

export const metadata = { title: "Cart" };

const breadcrumbItems: TBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Cart" },
];

const CartPage = () => {
  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <Cart />
        </div>
      </section>
    </>
  );
};

export default CartPage;
