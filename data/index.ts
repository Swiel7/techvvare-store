import { TIcon, TOrder } from "@/types";
import {
  CreditCard,
  Headphones,
  Heart,
  Package,
  RefreshCcw,
  Tag,
  User2,
} from "lucide-react";
import { StaticImageData } from "next/image";
import { headphones, laptop, smartwatch } from "@/public/hero";
import { banner1, banner2 } from "@/public/banners";
import bestDealImage from "@/public/best-deal.png";
import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

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

export const heroData: {
  subtitle: string;
  title: string;
  price: string;
  image: StaticImageData;
}[] = [
  {
    subtitle: "Deals and Promotions",
    title: "New smartwatches at unique prices",
    price: "$199.99",
    image: smartwatch,
  },
  {
    subtitle: "Sale 25% Discount",
    title: "Ideal for your first laptop",
    price: "$749.99",
    image: laptop,
  },
  {
    subtitle: "New In Stock",
    title: "Technology for your convenience",
    price: "$99.99",
    image: headphones,
  },
];

export const bannerData: {
  title: string;
  subtitle: string;
  image: StaticImageData;
}[] = [
  {
    title: "Upgrade to 5G With Samsung’s Ultra-Fast Devices",
    subtitle: "Enjoy seamless, & next-level connectivity with Samsung.",
    image: banner1,
  },
  {
    title: "Find Your Perfect Headphones for Every Moment",
    subtitle: "Discover a range of wireless, noise-canceling headphones.",
    image: banner2,
  },
];

export const featureData: {
  icon: TIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Package,
    title: "Fast Free Shipping",
    description: "You will love at great low prices",
  },
  {
    icon: RefreshCcw,
    title: "30 Days Returns",
    description: "Within 15 days for an exchange",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "24 hours a day, 7 days a week",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay with multiple credit cards",
  },
];

export const bestDealData: {
  title: string;
  description: string;
  image: StaticImageData;
} = {
  title: "Experience Speed And Innovation With OnePlus Smartphones",
  description:
    "Discover ultra-fast performance, stunning displays, and premium design with the latest OnePlus models.",
  image: bestDealImage,
};

export const sortOptions = [
  { value: "default", name: "Default sorting" },
  { value: "rating", name: "Average rating" },
  { value: "price_asc", name: "Price: low to high" },
  { value: "price_desc", name: "Price: high to low" },
  { value: "latest", name: "Latest" },
] as const;

export const sortValues = sortOptions.map(({ value }) => value);

export const orderStatusColors: Record<
  TOrder["status"],
  VariantProps<typeof badgeVariants>["variant"]
> = {
  pending: "yellow",
  delivered: "success",
  refunded: "blue",
};
