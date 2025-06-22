import { auth } from "@/auth";
import { Checkout } from "@/components/checkout";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";
import { getShippingAddresses } from "@/lib/services/user.service";

export const metadata = { title: "Checkout" };

const breadcrumbItems: TBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Checkout" },
];

const CheckoutPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const shippingAddresses = userId ? await getShippingAddresses(userId) : [];

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <Checkout shippingAddresses={shippingAddresses} />
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
