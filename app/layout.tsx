import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '4Front Construction and Logistics Services',
  description: 'Reliable roofing, built to protect what matters most.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans font-light tracking-tighter antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
