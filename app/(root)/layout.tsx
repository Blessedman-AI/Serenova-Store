import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import ToasterProvider from '@/providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Serenova',
  description: 'Serenova | Online Shopping',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`max-w-[1440px] ${inter.className}`}>
          <ToasterProvider />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
