"use client";

import { Button } from "@/components/ui/button";
import { ERROR_REDIRECTS } from "@/lib/errorRedirects";
import Link from "next/link";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const defaultErrorData = {
    title: "Error",
    mainMessage:
      "An unexpected technical error occurred. We are sorry for the inconvenience.",
    secondaryMessage:
      "If the problem persists, please contact support for assistance.",
    primaryButtonText: "Try Again",
    primaryButtonHref: "/",
    secondaryButtonText: "",
    secondaryButtonHref: "",
  };

  const errorData =
    error.message in ERROR_REDIRECTS
      ? { ...defaultErrorData, ...ERROR_REDIRECTS[error.message] }
      : {
          ...defaultErrorData,
          mainMessage: error.message || defaultErrorData.mainMessage,
        };

  console.error("Error details:", error);

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
            {errorData.primaryButtonHref === "/" &&
            errorData.primaryButtonText === "Try Again" ? (
              <Button
                variant="outline"
                onClick={reset}
                size="lg"
                className="flex-1"
              >
                {errorData.primaryButtonText}
              </Button>
            ) : (
              <Button variant="outline" asChild size="lg" className="flex-1">
                <Link href={errorData.primaryButtonHref}>
                  {errorData.primaryButtonText}
                </Link>
              </Button>
            )}
            {errorData.secondaryButtonText && errorData.secondaryButtonHref && (
              <Button asChild size="lg" className="flex-1">
                <Link href={errorData.secondaryButtonHref}>
                  {errorData.secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
