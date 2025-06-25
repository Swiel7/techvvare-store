import { auth } from "@/auth";
import { AddAddressDialog, AddressItem } from "@/components/address";
import { CardTitle } from "@/components/ui/card";
import Empty from "@/components/ui/empty";
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
        <CardTitle className="mb-6">Shipping Addresses</CardTitle>
        <div className="space-y-6">
          {shippingAddresses.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {shippingAddresses.map((shippingAddress) => (
                <li key={shippingAddress.id}>
                  <AddressItem addressData={shippingAddress} userId={userId} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty className="text-left">No shipping addresses found.</Empty>
          )}
          <AddAddressDialog userId={userId} />
        </div>
      </div>
    </section>
  );
};

export default AddressesPage;
