import { cn } from "@/lib/utils";

const Empty = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("text-muted-foreground text-center", className)}
      {...props}
    />
  );
};

export default Empty;
