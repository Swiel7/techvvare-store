export type TErrorRedirectData = {
  type: string;
  title: string;
  mainMessage: string;
  secondaryMessage: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
};

export const ERROR_REDIRECTS: Record<string, TErrorRedirectData> = {
  default: {
    type: "default",
    title: "Error",
    mainMessage:
      "An unexpected technical error occurred. We are sorry for the inconvenience.",
    secondaryMessage:
      "If the problem persists, please contact support for assistance.",
    primaryButtonText: "Try Again",
    primaryButtonHref: "/",
    secondaryButtonText: "",
    secondaryButtonHref: "",
  },
  noSessionId: {
    type: "noSessionId",
    title: "Session Error",
    mainMessage: "Invalid access to order confirmation page",
    secondaryMessage: "No session identifier found. Return to the home page.",
    primaryButtonText: "Back To Home",
    primaryButtonHref: "/",
  },
  sessionOpen: {
    type: "sessionOpen",
    title: "Payment Error",
    mainMessage: "Payment session not completed",
    secondaryMessage: "Return to checkout page to complete the transaction.",
    primaryButtonText: "Back to Checkout",
    primaryButtonHref: "/checkout",
    secondaryButtonText: "Back To Home",
    secondaryButtonHref: "/",
  },
  sessionExpired: {
    type: "sessionExpired",
    title: "Session Error",
    mainMessage: "Payment session expired",
    secondaryMessage: "Start the purchase process again.",
    primaryButtonText: "Back To Home",
    primaryButtonHref: "/",
  },
};
