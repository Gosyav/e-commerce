import React from 'react';

import Image, { type StaticImageData } from 'next/image';
import { ProductCard } from '~/components/ProductCard/ProductCard';

type Props = {
  img: string | StaticImageData;
};

// eslint-disable-next-line react/display-name
export const ProductsSection: React.FC<Props> = React.memo(({ img }) => {
  return (
    <div className="flex gap-6">
      <Image src={img} alt="Banner" width={200} height={200} />

      <div className="mt-4 grid grid-cols-2 gap-5 md:hidden">
        {[1, 2].map((item) => (
          <ProductCard
            key={item}
            img="https://content2.rozetka.com.ua/goods/images/big/414340675.jpg"
            title="RTX 3050"
            price="8500"
            href="/"
          />
        ))}
      </div>

      <div className="mt-4 hidden grid-cols-6 gap-5 md:grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProductCard
            key={item}
            img="https://content2.rozetka.com.ua/goods/images/big/414340675.jpg"
            title="RTX 3050"
            price="8500"
            href="/"
          />
        ))}
      </div>
    </div>
  );
});
