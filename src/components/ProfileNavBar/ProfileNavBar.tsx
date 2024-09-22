'use client';

import React from 'react';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

// eslint-disable-next-line react/display-name
export const ProfileNavBar: React.FC = React.memo(() => {
  const links = [
    {
      name: 'Profile',
      to: '/profile',
    },
    {
      name: 'Order Information',
      to: '/profile/orders',
    },
    {
      name: 'Saved Configurations',
      to: '/profile/configurations',
    },
  ];

  return (
    <div className="flex flex-col justify-between bg-color-one px-2 py-2">
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link className="text-lg font-semibold" key={link.to} href={link.to}>
            {link.name}
          </Link>
        ))}
      </div>

      <button
        className="text-left text-lg font-semibold"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
});
