import AddressItemButton from "@/components/address/address-item-button";
import { Card, CardContent } from "@/components/ui/card";
import { TShippingAddress } from "@/types";

const AddressItem = ({
  addressData,
  userId,
}: {
  addressData: TShippingAddress;
  userId: string;
}) => {
  const { name, address } = addressData;
  const { line1, line2, city, state, postal_code, country } = address;

  return (
    <Card className="min-w-1/3 !py-3 not-last:flex-1">
      <CardContent className="flex items-center gap-4 !px-3">
        <address className="grow space-y-1 text-sm font-medium not-italic">
          <h3 className="text-base font-bold">{name}</h3>
          <p>
            {line1}, {line2}
          </p>
          <p>
            {city}, {state} {postal_code} {country}
          </p>
        </address>
        <AddressItemButton addressData={addressData} userId={userId} />
      </CardContent>
    </Card>
  );
};

export default AddressItem;
