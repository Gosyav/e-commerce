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
      name: 'Processors',
      path: '/cpus',
    },
    {
      name: 'PCs',
      path: '/pcs',
    },
    {
      name: 'Monitors',
      path: '/monitors',
    },
    {
      name: 'Laptops',
      path: '/laptops',
    },
    {
      name: 'Motherboards',
      path: '/motherboards',
    },
    {
      name: 'RAM',
      path: '/rams',
    },
    {
      name: 'Graphics Cards',
      path: '/gpus',
    },
    {
      name: 'Power Supplies',
      path: '/powers',
    },
    {
      name: 'Cooling Systems',
      path: '/coolers',
    },
    {
      name: 'SSD Drives',
      path: '/ssds',
    },
    {
      name: 'Hard Drives',
      path: '/hdds',
    },
    {
      name: 'Cases',
      path: '/cases',
    },
  ];

  return (
    <footer className="mt-10 bg-color-seven py-4">
      <Container>
        <div className="flex w-full items-center gap-2 border-b-2 border-color-five pb-4">
          <Link href="/">
            <Image src={logo as string} alt="logo" className="h-16 w-16" />
          </Link>

          <nav className="flex w-full flex-wrap items-center justify-start gap-20">
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
