import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TUser } from "@/types";

const UserAvatar = ({
  user,
  className,
}: {
  user: Pick<TUser, "firstName" | "lastName" | "email">;
  className?: string;
}) => {
  const { firstName, lastName, email } = user;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">
          {firstName[0]}
          {lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">
          {firstName} {lastName}
        </span>
        <span className="text-muted-foreground text-xs font-medium">
          {email}
        </span>
      </div>
    </div>
  );
};

export default UserAvatar;
