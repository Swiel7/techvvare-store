import { Button } from "@/components/ui/button";
import { TIcon } from "@/types";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks: { name: string; href: string; icon: TIcon }[] = [
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

const SocialLinks = () => {
  return (
    <ul className="flex gap-3">
      {socialLinks.map((link) => (
        <li key={link.name}>
          <Button asChild variant="outline">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <link.icon size={20} />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
