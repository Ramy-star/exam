import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Leadership Exam',
  description: 'A quiz application for studying Gastrointestinal Tract topics, built with Next.js and Generative AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/9027/9027706.png" type="image/png" />
      </head>
      <body>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
      </body>
    </html>
  );
}
