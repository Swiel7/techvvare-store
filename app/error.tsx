"use client";

import { Button } from "@/components/ui/button";
import { ERROR_REDIRECTS } from "@/lib/errorRedirects";
import Link from "next/link";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.error("Error details:", error);

  const errorData =
    error.message in ERROR_REDIRECTS
      ? { ...ERROR_REDIRECTS[error.message] }
      : {
          ...ERROR_REDIRECTS["default"],
          ...(error.message && { mainMessage: error.message }),
        };

  const renderButton = (
    text: string | undefined,
    href: string | undefined,
    variant: "outline" | "default",
  ) => {
    if (!text || !href) return null;

    if (text === "Try Again") {
      return (
        <Button variant={variant} onClick={reset} size="lg" className="flex-1">
          {text}
        </Button>
      );
    }

    return (
      <Button variant={variant} asChild size="lg" className="flex-1">
        <Link href={href}>{text}</Link>
      </Button>
    );
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="wrapper">
        <div className="flex max-w-md flex-col items-center text-center">
          <h2 className="mb-4 text-3xl font-bold lg:mb-6 lg:text-5xl">
            {errorData.title}
          </h2>
          <div className="mb-8 space-y-3 lg:space-y-4">
            <p className="text-lg font-medium lg:text-xl">
              {errorData.mainMessage}
            </p>
            <p className="text-sm">{errorData.secondaryMessage}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {renderButton(
              errorData.secondaryButtonText,
              errorData.secondaryButtonHref,
              "outline",
            )}
            {renderButton(
              errorData.primaryButtonText,
              errorData.primaryButtonHref,
              "default",
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
