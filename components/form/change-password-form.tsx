"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControls,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/lib/actions/user.actions";
import { changePasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inputs: { label: string; name: string }[] = [
  { label: "Current Password", name: "currentPassword" },
  { label: "New Password", name: "newPassword" },
  { label: "Confirm New Password", name: "confirmNewPassword" },
];

const ChangePasswordForm = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    const { success, message } = await changePassword(values);

    if (success) {
      toast.success("Success", { description: message });
    } else {
      toast.error("Error", { description: message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormControls className="mb-8">
              {inputs.map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof changePasswordSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </FormControls>
            <Button type="submit" size="lg" loading={isSubmitting}>
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
