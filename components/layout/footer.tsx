import Logo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerLinks, contactData } from "@/data";
import Link from "next/link";
import * as payments from "@/public/payments";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="wrapper pt-8 pb-6 lg:pt-10 lg:pb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <ul className="space-y-3">
              {Object.values(contactData).map(({ label, value }) => (
                <li key={label}>
                  <span className="font-medium">{label}: </span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-2 font-medium">{title}</h4>
              <ul>
                {links.map(({ text, href }) => (
                  <li key={text}>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-foreground h-8 pl-0"
                      asChild
                    >
                      <Link href={href}>{text}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-4">
            <h4 className="font-medium">Newsletter</h4>
            <p>
              Sign up for our newsletter and get 10% off your first purchase!
            </p>
            <form className="flex w-full gap-2">
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-white"
              />
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="wrapper py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm">{`\u00A9 ${new Date().getFullYear()} Created by Sławomir Wielgus. All rights reserved.`}</p>
          <ul className="flex gap-2">
            {Array.from(Object.values(payments)).map((logo, i) => (
              <li key={i}>
                <Image src={logo} alt="Payment logo" height={24} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
