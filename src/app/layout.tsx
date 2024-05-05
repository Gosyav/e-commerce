import { Inter } from 'next/font/google';
import '~/styles/globals.css';

import { Footer } from '~/modules/Footer';
import { Header } from '~/modules/Header';

import Providers from '~/components/Providers/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'E-commerce',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
