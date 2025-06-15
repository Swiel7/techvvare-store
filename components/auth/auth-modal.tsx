"use client";

import { LoginForm, RegisterForm } from "@/components/form";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthModal = ({ type }: { type: "login" | "register" }) => {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();

  const handleChange = () => {
    router.back();
    setOpen(false);
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={handleChange}
      title={type === "login" ? "Welcome" : "Create New Account"}
      description={
        type === "login" ? "Please Login Here" : "Please Enter Details"
      }
    >
      {type === "login" && <LoginForm intercept onSuccess={handleChange} />}
      {type === "register" && (
        <RegisterForm intercept onSuccess={handleChange} />
      )}
    </ResponsiveDialog>
  );
};

export default AuthModal;
