"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/ui/user-avatar";
import { profileLinks } from "@/data";
import { logout } from "@/lib/actions/auth.actions";
import { protectedRoutes } from "@/lib/routes";
import { LogOut, User2 } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserButton = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.some((r) => r.test(pathname));

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "!size-10",
        })}
      >
        <User2 />
      </Link>
    );
  }

  const user = { ...session.user, email: session.user.email as string };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-2">
        <UserAvatar user={user} className="*:first:**:text-sm *:last:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuItem className="py-2">
          <UserAvatar user={user} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {profileLinks.map((link) => (
          <DropdownMenuItem
            key={link.label}
            className="flex items-center gap-3 text-sm"
            asChild
          >
            <Link href={link.href}>
              <link.icon />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-3 text-sm"
          onClick={() => {
            logout({ redirectTo: isProtectedRoute ? "/" : undefined });
          }}
        >
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
