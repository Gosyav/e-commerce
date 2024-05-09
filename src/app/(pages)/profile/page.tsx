'use client';

import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const Profile: React.FC = React.memo(() => {
  const { data, status } = useSession();

  console.log(data);

  const links = [
    {
      name: 'Профіль',
      to: '/profile',
    },
    {
      name: 'Інформація про замовлення',
      to: '/profile/orders',
    },
    {
      name: 'Збережені збірки',
      to: '/profile/configurations',
    },
  ];

  if (status === 'loading') {
    return <p>Зачекайте...</p>;
  }

  return (
    <div className="h-full">
      <Container className="mt-4 grid h-full grid-rows-2 gap-16 md:grid-cols-2 md:grid-rows-none">
        <div className=" flex flex-col justify-between bg-color-one px-2 py-2">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                className="text-lg font-semibold"
                key={link.to}
                href={link.to}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="text-left text-lg font-semibold"
            onClick={() => signOut()}
          >
            Вийти
          </button>
        </div>

        <div className="flex flex-col gap-8 xl:flex-row">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium">Контактна інформація</p>

            <div className="flex flex-col text-color-five">
              <span className="text-lg">{data?.user.name}</span>

              <span className="text-lg">{data?.user.email}</span>

              <span className="text-lg">{data?.user.phone}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium">Адреса доставки</p>

            <div className="flex flex-col text-color-five">
              <span className="text-lg">{data?.user.city}</span>

              <span className="text-lg">{data?.user.adress}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
});

export default Profile;
