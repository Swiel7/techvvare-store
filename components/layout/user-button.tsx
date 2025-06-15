"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const { email, firstName, lastName } = session.user;

  const userAvatar = (
    <Avatar>
      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
        {firstName[0]}
        {lastName[0]}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-2">{userAvatar}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuItem className="py-2">
          {userAvatar}
          <div className="ml-1 flex flex-col">
            <span className="text-sm font-medium">
              {firstName} {lastName}
            </span>
            <span className="text-muted-foreground text-xs">{email}</span>
          </div>
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
