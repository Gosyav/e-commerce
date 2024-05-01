import { Inter } from 'next/font/google';
import { Header } from '~/modules/Header';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

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
        <TRPCReactProvider>
          <Header />
          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
