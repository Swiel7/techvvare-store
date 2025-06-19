import { Checkout } from "@/components/checkout";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";
import { TShippingAddress } from "@/types";

export const metadata = { title: "Checkout" };

const breadcrumbItems: TBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Checkout" },
];

const CheckoutPage = () => {
  // TODO:
  const shippingAddress = {} as TShippingAddress[];

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <Checkout shippingAddress={shippingAddress} />
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
