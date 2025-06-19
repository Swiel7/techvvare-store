import { FREE_SHIPPING_LIMIT, SHIPPING_COST } from "@/lib/constants";
import { TCart, TCartItem, TProduct } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState: TCart = {
  items: [],
  itemsCount: 0,
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

type CartStore = {
  cart: TCart;
  addItem: (
    product: TProduct,
    selectedVariant: TProduct["variants"][0],
    quantity: number,
  ) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateItemQuantity: (
    productId: string,
    variantId: string,
    newQuantity: number,
  ) => void;
  clearCart: () => void;
};

export const calculateCartTotals = (
  items: TCartItem[],
): Pick<
  TCart,
  "itemsPrice" | "shippingPrice" | "totalPrice" | "itemsCount"
> => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingPrice = itemsPrice >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  const totalPrice = itemsPrice + shippingPrice;
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return { itemsPrice, shippingPrice, totalPrice, itemsCount };
};

export const useCart = create(
  persist<CartStore>(
    (set, get) => {
      const updateCartState = (newItems: TCartItem[]) => {
        set(({ cart }) => ({
          cart: {
            ...cart,
            items: newItems,
            ...calculateCartTotals(newItems),
          },
        }));
      };

      return {
        cart: initialState,
        addItem: (product, selectedVariant, quantity) => {
          if (quantity <= 0 || !selectedVariant || !selectedVariant.id) return;

          const { id, name, images, discountPrice, regularPrice, slug } =
            product;

          if (selectedVariant.stock < quantity) {
            toast.error(
              `Cannot add ${quantity} items. Only ${selectedVariant.stock} in stock.`,
            );
            return;
          }

          const cartItem: TCartItem = {
            productId: id,
            name,
            slug,
            image: images[0],
            variant: selectedVariant,
            price: discountPrice ?? regularPrice,
            quantity,
            color: selectedVariant.colorName,
          };

          const currentItems = get().cart.items;

          const existingItem = currentItems.find(
            (item) =>
              item.productId === cartItem.productId &&
              item.variant.id === cartItem.variant.id,
          );

          if (
            existingItem &&
            existingItem.quantity + quantity > selectedVariant.stock
          ) {
            toast.error(
              `Cannot add more. Only ${selectedVariant.stock} in stock.`,
            );
            return;
          }

          const newItems = existingItem
            ? currentItems.map((item) =>
                item.productId === existingItem.productId &&
                item.variant.id === existingItem.variant.id
                  ? {
                      ...existingItem,
                      quantity: existingItem.quantity + cartItem.quantity,
                    }
                  : item,
              )
            : currentItems.concat(cartItem);

          updateCartState(newItems);

          toast.success("Item added to cart!");
        },
        removeItem: (id, variantId) => {
          const newItems = get().cart.items.filter(
            (item) => !(item.productId === id && item.variant.id === variantId),
          );

          updateCartState(newItems);

          toast.success("Item removed from cart!");
        },
        updateItemQuantity: (productId, variantId, newQuantity) => {
          if (newQuantity < 1) return;

          const currentItems = get().cart.items;
          const existingItem = currentItems.find(
            (item) =>
              item.productId === productId && item.variant.id === variantId,
          );

          if (existingItem && newQuantity > existingItem.variant.stock) {
            toast.error(
              `Cannot update quantity. Only ${existingItem.variant.stock} in stock.`,
            );
            return;
          }

          const updatedItems = currentItems.map((item) =>
            item.productId === productId && item.variant.id === variantId
              ? { ...item, quantity: newQuantity }
              : item,
          );

          updateCartState(updatedItems);
        },
        clearCart: () => {
          set({ cart: initialState });

          toast.success("Cart cleared!");
        },
      };
    },
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
