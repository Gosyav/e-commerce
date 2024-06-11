'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useConfigureStore } from '~/pagesComponents/ConfigurePage/store';

type Props = {
  img: string;
  title: string;
  price: number;
  href: string;
  withButton?: boolean;
  onClick?: () => void;
};

// eslint-disable-next-line react/display-name
export const ProductCard: React.FC<Props> = React.memo(
  ({ img, title, price, href, withButton = false, onClick }) => {
    const filterObject = useConfigureStore((state) => state.filterObject);

    return (
      <div className="flex flex-col items-center justify-between gap-6 rounded-lg border-2 border-color-six p-4">
        <Image src={img} alt={title} width={200} height={200} />

        <div className="flex flex-col gap-2">
          <Link
            href={href}
            className="block max-h-20 overflow-y-hidden text-sm"
          >
            {title}...
          </Link>

          <p className="text-lg font-bold">{`${price} грн`}</p>
        </div>

        {withButton && (
          <button
            type="button"
            className="block w-full bg-color-three py-4 text-white"
            onClick={onClick}
          >
            {filterObject.withUpdateButton
              ? 'Оновити конфігурацію'
              : 'Додати до конфігурації'}
          </button>
        )}
      </div>
    );
  },
);
