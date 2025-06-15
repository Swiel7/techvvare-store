import { TIcon } from "@/types";
import { Heart, Package, Tag, User2 } from "lucide-react";

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Special offers", href: "/products?status=Featured" },
  { label: "Sale", href: "/products?status=On+Sale" },
  { label: "Contact us", href: "/contact" },
];

export const profileLinks: { label: string; href: string; icon: TIcon }[] = [
  { label: "Account Details", href: "/account", icon: User2 },
  { label: "Orders", href: "/orders", icon: Package },
  { label: "Addresses", href: "/addresses", icon: Tag },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
];

export const footerLinks: {
  title: string;
  links: { text: string; href: string }[];
}[] = [
  {
    title: "Information",
    links: [
      { text: "My Account", href: "/account" },
      { text: "Contact Us", href: "/contact" },
      { text: "Career", href: "/" },
      { text: "FAQ", href: "/" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { text: "About Us", href: "/" },
      { text: "Shipping", href: "/" },
      { text: "Privacy Policy", href: "/" },
      { text: "Return & Refund", href: "/" },
    ],
  },
];
