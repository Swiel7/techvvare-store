"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";
import { navLinks } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Menu = ({
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof NavigationMenu>) => {
  return (
    <NavigationMenu orientation={orientation} {...props}>
      <NavigationMenuList>
        {navLinks.map(({ label, href }) => {
          const link = (
            <NavigationMenuLink
              className={cn(
                orientation === "horizontal"
                  ? buttonVariants({
                      variant: "link",
                      size: "sm",
                    })
                  : sidebarMenuButtonVariants({
                      size: "lg",
                      className: "block",
                    }),
                "!bg-background",
              )}
              asChild
            >
              <Link href={href}>{label}</Link>
            </NavigationMenuLink>
          );

          return (
            <NavigationMenuItem key={label}>
              {orientation === "horizontal" ? (
                link
              ) : (
                <SheetClose asChild>{link}</SheetClose>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Menu;
