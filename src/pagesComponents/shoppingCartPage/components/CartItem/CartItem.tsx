'use client';

import React from 'react';

import Image from 'next/image';

import { useProductsStore } from '~/shared/store';

import removeFromCart from '../../../../../public/assets/removeFromCart.svg';

type Props = {
  productId: string;
  imgUrl: string;
  title: string;
  price: number;
  count: number;
};

// eslint-disable-next-line react/display-name
export const CartItem: React.FC<Props> = React.memo(
  ({ productId, imgUrl, title, price, count }) => {
    const removeFromShoppingCart = useProductsStore(
      (state) => state.removeFromShoppingCart,
    );

    const increaseCount = useProductsStore((state) => state.increaseCount);
    const decreaseCount = useProductsStore((state) => state.decreaseCount);

    return (
      <div className="grid grid-cols-4 grid-rows-2 gap-2 border-b-2 py-4 xl:grid-cols-6 xl:grid-rows-none">
        <Image
          src={imgUrl}
          alt={title}
          width={90}
          height={90}
          className="col-start-1 col-end-2 xl:col-start-auto xl:col-end-auto"
        />

        <h3 className="col-start-2 col-end-5 text-sm xl:col-start-auto xl:col-end-auto">
          {title}
        </h3>

        <div className="flex flex-col items-start gap-2 text-sm font-semibold">
          <span className="xl:hidden">Ціна</span>

          <p>{`${price} грн`}</p>
        </div>

        <div className="flex flex-col items-start gap-2 text-sm font-semibold">
          <span className="xl:hidden">К-сть</span>

          <div className="flex items-center gap-2 rounded bg-color-one p-4 text-color-seven">
            <button
              className="text-lg"
              type="button"
              onClick={() => increaseCount(productId)}
            >
              +
            </button>

            <p className="text-2xl">{count}</p>

            <button
              className="text-lg"
              type="button"
              onClick={() => decreaseCount(productId)}
            >
              -
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 text-sm font-semibold">
          <span className="xl:hidden">Підсумок</span>

          <p>{`${price * count} грн`}</p>
        </div>

        <div className="flex flex-col items-end text-sm font-semibold">
          <button onClick={() => removeFromShoppingCart(productId)}>
            <Image
              src={removeFromCart as string}
              alt="Видалити товар"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    );
  },
);
