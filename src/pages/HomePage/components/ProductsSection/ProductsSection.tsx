import React from 'react';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ProductCard } from '~/components/ProductCard/ProductCard';

type Props = {
  img: string | StaticImageData;
  title: string;
  linkTo: string;
};

// eslint-disable-next-line react/display-name
export const ProductsSection: React.FC<Props> = React.memo(
  ({ img, title, linkTo }) => {
    return (
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative w-full">
          <Image
            src={img}
            alt="Banner"
            className="absolute -z-10 h-32 w-full md:h-full"
          />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-xl text-white">
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
          {[1, 2].map((item) => (
            <ProductCard
              key={item}
              img="https://content2.rozetka.com.ua/goods/images/big/414340675.jpg"
              title="Видеокарта MSI PCI-Ex GeForce RTX 3050 Ventus 2X OC 6GB GDDR6 (96bit) (1492/14000) (HDMI, DisplayPort) (RTX 3050 VENTUS 2X 6G OC)"
              price="8500"
              href="/"
            />
          ))}
        </div>

        <div className="mt-4 hidden grid-cols-5 gap-5 md:grid">
          {[1, 2, 3, 4, 5].map((item) => (
            <ProductCard
              key={item}
              img="https://content2.rozetka.com.ua/goods/images/big/414340675.jpg"
              title="Видеокарта MSI PCI-Ex GeForce RTX 3050 Ventus 2X OC 6GB GDDR6 (96bit) (1492/14000) (HDMI, DisplayPort) (RTX 3050 VENTUS 2X 6G OC)"
              price="8500"
              href="/"
            />
          ))}
        </div>
      </div>
    );
  },
);
