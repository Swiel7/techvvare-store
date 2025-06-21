import { db } from "@/db";
import { products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { TCartItem } from "@/types";

export const validateCartItems = async (
  cartItems: TCartItem[],
): Promise<{ validItems: TCartItem[]; errors: string[] }> => {
  if (cartItems.length === 0) {
    return { validItems: [], errors: ["Cart is empty."] };
  }

  const cartItemsIds = cartItems.map(({ productId }) => productId);
  const dbProducts = await db.query.products.findMany({
    where: inArray(products.id, cartItemsIds),
  });

  const productsMap = new Map(dbProducts.map((p) => [p.id, p]));
  const validItems: TCartItem[] = [];
  const errors: string[] = [];

  for (const item of cartItems) {
    const product = productsMap.get(item.productId);

    if (!product) {
      errors.push(`Product with ID ${item.productId} not found.`);
      continue;
    }

    const variant = product.variants.find((v) => v.id === item.variant.id);

    if (!variant) {
      errors.push(`Selected variant for product ${item.name} not found.`);
      continue;
    }

    if (variant.stock < item.quantity) {
      errors.push(
        `Insufficient stock for ${product.name} (${variant.colorName}).`,
      );
      continue;
    }

    const validatedItem: TCartItem = {
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      image: item.image,
      price: product.discountPrice ?? product.regularPrice,
      quantity: item.quantity,
      color: item.color,
      variant: item.variant,
    };

    validItems.push(validatedItem);
  }

  return { validItems, errors };
};
