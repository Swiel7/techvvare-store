import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    template: '%s / TechVVave Store',
    default: 'TechVVave Store',
  },
  description: 'TechVVave Store offers electronic devices at very competitive prices',
};

const font = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased [&>section]:last-of-type:!p-0', font.variable)}>
        {children}
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
};

export default RootLayout;
