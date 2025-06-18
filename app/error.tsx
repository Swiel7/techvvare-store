"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.error("Error details:", error);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-6 text-3xl font-bold lg:text-5xl">Error</h2>
      <div className="mb-8 max-w-md space-y-4">
        <p className="text-lg font-medium lg:text-xl">
          An unexpected technical error occurred. We are sorry for the
          inconvenience.
        </p>
        <p className="text-sm">
          If the problem persists, please contact support for assistance.
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={reset} size="lg">
          Try Again
        </Button>
        <Button asChild size="lg">
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
