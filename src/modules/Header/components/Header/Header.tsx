'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '~/ui/Container';

import arrowIcon from '../../../../../public/assets/arrow.svg';
import burger from '../../../../../public/assets/burger.svg';
import closeIcon from '../../../../../public/assets/close.svg';
import logo from '../../../../../public/assets/logo.svg';
import shoppingCart from '../../../../../public/assets/shoppingCart.svg';
import userIcon from '../../../../../public/assets/user.svg';

// eslint-disable-next-line react/display-name
export const Header: React.FC = React.memo(() => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const navLinks = [
    {
      name: 'test',
      path: '/where',
    },
    {
      name: 'test',
      path: '/where',
    },
  ];

  return (
    <header>
      <Container className="bg-color-seven flex items-center justify-between py-2">
        <p className="text-color-six flex items-center gap-1 text-xs font-semibold">
          Пн-Пт:
          <span className="text-white">9.00 - 18.30</span>
        </p>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <p className="text-color-six hidden 2xl:block">
            м. Київ, вул. Хрещатик 12А
          </p>

          <Link href="#" className="text-white underline underline-offset-4">
            Зв`язатися з нами
          </Link>
        </div>
      </Container>

      <Container className="bg-color-three grid grid-cols-[24px_1fr_72px] items-center justify-between gap-4 py-4">
        <button
          onClick={() => setIsBurgerOpened(true)}
          type="button"
          className="h-6 w-6"
        >
          <Image src={burger as string} alt="burger" />
        </button>

        <input
          type="search"
          className="block w-full rounded-3xl px-4 py-2 placeholder:text-xs focus:outline-none"
          placeholder="Шукайте тут"
        />

        <div className="flex items-center gap-2">
          <Link href="/shopping-cart">
            <Image
              src={shoppingCart as string}
              alt="burger"
              className="h-8 w-8"
            />
          </Link>

          <Link href="/dashboard">
            <Image src={userIcon as string} alt="burger" className="h-8 w-8" />
          </Link>
        </div>
      </Container>

      {isBurgerOpened && (
        <Container className="fixed bottom-0 left-0 right-0 top-0 bg-white py-4">
          <div className="flex items-center justify-between border-b-2 pb-6">
            <Image src={logo as string} alt="logo" />

            <button
              onClick={() => setIsBurgerOpened(false)}
              type="button"
              className="h-6 w-6"
            >
              <Image src={closeIcon as string} alt="close" />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <div
                className="flex items-center justify-between text-base md:text-xl"
                key={link.path}
              >
                <Link href={link.path} className="pr-3.5">
                  {link.name}
                </Link>

                <Image
                  src={arrowIcon as string}
                  alt="arrow"
                  className="h-6 w-6"
                />
              </div>
            ))}
          </div>
        </Container>
      )}
    </header>
  );
});
