import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Container } from '~/ui/Container';

import arrowIcon from '../../../../../public/assets/arrow.svg';
import closeIcon from '../../../../../public/assets/close.svg';
import logo from '../../../../../public/assets/logo.svg';

type Props = {
  setIsBurgerOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line react/display-name
export const Burger: React.FC<Props> = React.memo(({ setIsBurgerOpened }) => {
  const router = useRouter();

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
    <Container className="fixed bottom-0 left-0 right-0 top-0 bg-white py-4">
      <div className="flex items-center justify-between border-b-2 pb-6">
        <button
          onClick={() => {
            router.push('/');
            setIsBurgerOpened(false);
          }}
        >
          <Image src={logo as string} alt="logo" />
        </button>

        <button
          onClick={() => setIsBurgerOpened(false)}
          type="button"
          className="h-6 w-6"
        >
          <Image src={closeIcon as string} alt="close" />
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {navLinks
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((link) => (
            <nav
              className="flex items-center justify-between text-base md:text-xl"
              key={link.path}
            >
              <Link
                onClick={() => setIsBurgerOpened(false)}
                href={link.path}
                className="pr-3.5"
              >
                {link.name}
              </Link>

              <Image
                src={arrowIcon as string}
                alt="arrow"
                className="h-6 w-6"
              />
            </nav>
          ))}
      </div>
    </Container>
  );
});
