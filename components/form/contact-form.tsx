"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormControls,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const inputFields: {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
}[] = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
  { name: "message", label: "Message", type: "textarea" },
];

const ContactForm = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
    resolver: zodResolver(contactSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof contactSchema>) => {
    console.log(values);
    toast.success("Success", { description: "Your message has been sent!" });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormControls className="lg:grid lg:grid-cols-2 lg:gap-5">
          {inputFields.map(({ name, label, type }, index) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof z.infer<typeof contactSchema>}
              render={({ field }) => (
                <FormItem className={index > 1 ? "col-span-2" : ""}>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    {type === "textarea" ? (
                      <Textarea disabled={isSubmitting} {...field} />
                    ) : (
                      <Input type={type} disabled={isSubmitting} {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </FormControls>
        <Button type="submit" size="lg" loading={isSubmitting}>
          Send Message
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
