import { Logo, Menu, MobileNav, UserButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-background sticky top-0 z-20 shadow-xs">
      <div className="wrapper px-2 lg:px-4">
        <div className="flex items-center justify-between gap-3 py-2 lg:py-4">
          <MobileNav />
          <Logo />
          <Menu className="not-lg:hidden" />
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-10 lg:flex"
            >
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-10 sm:flex"
              asChild
            >
              <Link href="/wishlist">
                <Heart />
              </Link>
            </Button>
            {/* CartDrawer */}
            <Button variant="ghost" size="icon" className="relative size-10">
              <ShoppingCart />
            </Button>

            <UserButton session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
