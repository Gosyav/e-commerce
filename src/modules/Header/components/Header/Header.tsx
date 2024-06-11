'use client';

import React, { useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Burger } from '~/modules/Header/components/Burger/Burger';

import { Container } from '~/ui/Container';

import burger from '../../../../../public/assets/burger.svg';
import configureIcon from '../../../../../public/assets/configure.svg';
import logoWhite from '../../../../../public/assets/logoWhite.svg';
import shoppingCart from '../../../../../public/assets/shoppingCart.svg';
import userIcon from '../../../../../public/assets/user.svg';

// eslint-disable-next-line react/display-name
export const Header: React.FC = React.memo(() => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = ({ query }) => {
    router.push(`/search?query=${query}`);
  };

  return (
    <header>
      <Container className="flex items-center justify-between bg-color-seven py-2">
        <p className="flex items-center gap-1 text-xs font-semibold text-color-six">
          Пн-Пт:
          <span className="text-white">9.00 - 18.30</span>
        </p>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <p className="hidden text-color-six 2xl:block">
            м. Київ, вул. Хрещатик 12А
          </p>

          <Link href="#" className="text-white underline underline-offset-4">
            Зв`язатися з нами
          </Link>
        </div>
      </Container>

      <Container className="grid grid-cols-[36px_24px_1fr_108px] items-center justify-between gap-4 bg-color-three py-4">
        <Link href="/">
          <Image src={logoWhite as string} alt="logo" className="h-9 w-full" />
        </Link>

        <button
          onClick={() => setIsBurgerOpened(true)}
          type="button"
          className="h-6 w-6"
        >
          <Image src={burger as string} alt="burger" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('query', { required: true })}
            type="search"
            className="block w-full rounded-3xl px-4 py-2 placeholder:text-xs focus:outline-none"
            placeholder="Шукайте тут"
          />
        </form>

        <div className="flex items-center gap-2">
          <Link href="/configure">
            <Image
              src={configureIcon as string}
              alt="configure icon"
              className="h-8 w-8"
            />
          </Link>

          <Link href="/shoppingCart">
            <Image
              src={shoppingCart as string}
              alt="shopping cart"
              className="h-8 w-8"
            />
          </Link>

          <Link href="/profile">
            <Image src={userIcon as string} alt="profile" className="h-8 w-8" />
          </Link>
        </div>
      </Container>

      {isBurgerOpened && <Burger setIsBurgerOpened={setIsBurgerOpened} />}
    </header>
  );
});
