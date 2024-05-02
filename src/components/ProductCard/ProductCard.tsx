import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  img: string;
  title: string;
  price: string;
  href: string;
};

// eslint-disable-next-line react/display-name
export const ProductCard: React.FC<Props> = React.memo(
  ({ img, title, price, href }) => {
    return (
      <Link
        className="border-color-six grid grid-rows-[min-content_1fr] justify-items-center gap-6 border-2 p-4 rounded-lg"
        href={href}
      >
        <Image src={img} alt={title} width={150} height={150} />

        <div className="flex flex-col gap-2">
          <h3 className="block text-sm">{title}</h3>

          <p className="text-lg font-bold">{`${price} грн`}</p>
        </div>
      </Link>
    );
  },
);
