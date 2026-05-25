import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OOTD — Edukasi Pernikahan untuk Remaja Indonesia',
  description:
    'Platform digital untuk membantu remaja Indonesia memahami kesiapan sebelum melangkah — karena masa depan tidak bisa diulang.',
  keywords: [
    'pernikahan dini',
    'edukasi remaja',
    'OOTD',
    'kesiapan menikah',
    'BKKBN',
    'pernikahan anak Indonesia',
  ],
  authors: [{ name: 'OOTD - Our Own Tomorrow Dreams' }],
  openGraph: {
    title: 'OOTD — Our Own Tomorrow Dreams',
    description:
      'Platform digital edukasi pernikahan dini untuk remaja Indonesia.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'OOTD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OOTD — Edukasi Pernikahan untuk Remaja Indonesia',
    description:
      'Platform digital untuk membantu remaja Indonesia memahami kesiapan sebelum melangkah.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen pt-16 md:pt-20">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: '14px',
              fontFamily: 'var(--font-jakarta), sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
