import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NotFoundProps = {
  title?: string;
  mainMessage?: string;
  secondaryMessage?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
};

const NotFound = ({
  title = "Not Found",
  mainMessage = "The page or resource you are looking for could not be found.",
  secondaryMessage = "If you believe this is an error, please contact support for assistance.",
  primaryButtonText = "Back To Home",
  primaryButtonHref = "/",
  secondaryButtonText,
  secondaryButtonHref,
  className,
}: NotFoundProps) => {
  return (
    <div
      className={cn(
        "flex max-w-md flex-col items-center text-center",
        className,
      )}
    >
      <h2 className="mb-4 text-3xl font-bold lg:mb-6 lg:text-5xl">{title}</h2>
      <div className="mb-8 space-y-3 lg:space-y-4">
        <p className="text-lg font-medium lg:text-xl">{mainMessage}</p>
        <p className="text-sm">{secondaryMessage}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg" className="flex-1">
          <Link href={primaryButtonHref}>{primaryButtonText}</Link>
        </Button>
        {secondaryButtonText && secondaryButtonHref && (
          <Button variant="outline" asChild size="lg" className="flex-1">
            <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
