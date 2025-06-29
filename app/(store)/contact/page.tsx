import { ContactForm } from "@/components/form";
import { SocialLinks } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { contactData } from "@/data";

export const metadata = { title: "Contact Us" };

const ContactPage = () => {
  return (
    <section className="lg:pt-20">
      <div className="wrapper">
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-[auto_1fr]">
          <Card className="border-none !py-0 md:order-1">
            <CardHeader className="!px-0">
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form and we will respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="!px-0">
              <ContactForm />
            </CardContent>
          </Card>
          <div className="space-y-6 lg:min-w-sm lg:space-y-10">
            <div className="space-y-5">
              <CardTitle>Contact Information</CardTitle>
              <ul className="space-y-3">
                {Object.values(contactData).map(({ label, value }) => (
                  <li key={label}>
                    <span className="font-medium">{label}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <CardTitle>Opening Hours</CardTitle>
              <ul className="space-y-3">
                <li>Monday-Friday: 9:00 AM - 5:00 PM</li>
                <li>Saturday: 10:00 AM - 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">Follow Us</h3>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
