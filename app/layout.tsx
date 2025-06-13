import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const font = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased [&>section]:last-of-type:!p-0', font.variable)}>{children}</body>
    </html>
  );
};

export default RootLayout;
