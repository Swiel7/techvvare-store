import { auth } from "@/auth";
import { AddressDialog, AddressItem } from "@/components/address";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { getShippingAddresses } from "@/lib/services/user.service";
import { redirect } from "next/navigation";

export const metadata = { title: "Addresses" };

const AddressesPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  const shippingAddresses = await getShippingAddresses(userId);

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Shipping Address</CardTitle>
        <div className="space-y-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {shippingAddresses.map((shippingAddress) => (
              <li key={shippingAddress.id}>
                <AddressItem addressData={shippingAddress} userId={userId} />
              </li>
            ))}
          </ul>
          <AddressDialog
            userId={userId}
            mode="add"
            trigger={<Button size="lg">Add New Address</Button>}
          />
        </div>
      </div>
    </section>
  );
};

export default AddressesPage;
