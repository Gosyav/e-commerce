import React from 'react';

import { type Product } from '@prisma/client';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import { ProductCard } from '~/components/ProductCard';

type Props = {
  img: string | StaticImageData;
  title: string;
  linkTo: string;
  products: Product[];
};

// eslint-disable-next-line react/display-name
export const ProductsSection: React.FC<Props> = React.memo(
  ({ img, title, linkTo, products }) => {
    return (
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative w-full">
          <Image
            src={img}
            alt="Banner"
            className="absolute -z-10 h-32 w-full md:h-full"
          />

          <div className="absolute left-1/2 top-16 z-10 -translate-x-1/2 -translate-y-1/2 text-xl text-white md:top-1/2">
            <h2 className="text-center font-semibold">{title}</h2>

            <Link
              href={linkTo}
              className="text-sm underline underline-offset-2"
            >
              Дивитися більше
            </Link>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 gap-5 md:hidden">
          {products.slice(0, 2).map((product) => (
            <ProductCard
              key={product.id}
              img={product.imgUrl}
              title={product.title}
              price={product.price}
              href={`${product.dbType}/${product.id}`}
            />
          ))}
        </div>

        <div className="mt-4 hidden grid-cols-5 gap-5 md:grid">
          {products.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              img={product.imgUrl}
              title={product.title}
              price={product.price}
              href={`${product.dbType}/${product.id}`}
            />
          ))}
        </div>
      </div>
    );
  },
);
