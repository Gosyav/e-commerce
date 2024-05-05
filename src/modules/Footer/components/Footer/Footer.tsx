import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Container } from '~/ui/Container';

import cards from '../../../../../public/assets/cards.svg';
import logo from '../../../../../public/assets/logo.svg';

// eslint-disable-next-line react/display-name
export const Footer: React.FC = React.memo(() => {
  const navLinks = [
    {
      name: 'Процесори',
      path: '/cpus',
    },
    {
      name: 'ПК',
      path: '/pcs',
    },
    {
      name: 'Монітори',
      path: '/monitors',
    },
    {
      name: 'Ноутбуки',
      path: '/laptops',
    },
  ];

  return (
    <footer className="mt-10 bg-color-seven py-4">
      <Container>
        <div className="flex w-full items-center gap-2 border-b-2 border-color-five pb-4">
          <Image src={logo as string} alt="logo" className="h-16 w-16" />

          <nav className="flex flex-wrap w-full items-center justify-center gap-20">
            {navLinks
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((link) => (
                <Link key={link.path} href={link.path} className="text-white">
                  {link.name}
                </Link>
              ))}
          </nav>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Image src={cards as string} alt="cards" />

          <p className="text-base text-color-five">Copyright © 2024</p>
        </div>
      </Container>
    </footer>
  );
});
