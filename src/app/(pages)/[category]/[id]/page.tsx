'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { api } from '~/trpc/react';

import { useProductsStore } from '~/shared/store';

import { Characteristics } from '~/pages/ProductPage';

import { Container } from '~/ui/Container';

/* eslint-disable indent */

// eslint-disable-next-line react/display-name
const ProductPage: React.FC = React.memo(() => {
  const [count, setCount] = useState(1);
  const { id } = useParams<{ id: string }>()!;
  const { isFetching, data: product } = api.product.getById.useQuery({ id });

  const productsInShoppingCart = useProductsStore(
    (state) => state.productsInShoppingCart,
  );

  const addToShoppingCart = useProductsStore(
    (state) => state.addToShoppingCart,
  );

  const removeFromShoppingCart = useProductsStore(
    (state) => state.removeFromShoppingCart,
  );

  if (isFetching) {
    return <p>Зачекайте...</p>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="h-full">
      <Container className="mt-4 grid h-full grid-rows-[min-content_1fr_min-content] items-center gap-5 md:grid-cols-2 md:grid-rows-[min-content_min-content]">
        <div className="order-2 md:order-none md:col-start-1 md:col-end-2">
          <h1 className="text-3xl font-medium">{product.title}</h1>

          <p className="mt-4 block text-lg font-light">{product.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-3xl font-bold">{product.price * count} грн</p>

            <div className="flex items-center gap-2 rounded bg-color-three p-4 text-white">
              <button
                className="text-lg"
                type="button"
                onClick={() => {
                  if (count === 10) {
                    return;
                  }

                  setCount((prev) => prev + 1);
                }}
              >
                +
              </button>

              <p className="text-2xl">{count}</p>

              <button
                className="text-lg"
                type="button"
                onClick={() => {
                  if (count === 1) {
                    return;
                  }

                  setCount((prev) => prev - 1);
                }}
              >
                -
              </button>
            </div>
          </div>

          <div className="mt-4">
            {productsInShoppingCart?.some(
              (item) => item.product.id === product.id,
            ) ? (
              <button
                onClick={() => removeFromShoppingCart(product.id)}
                className="rounded-[50px] border-2 border-color-three px-8 py-4 text-color-seven"
              >
                Прибрати з кошика
              </button>
            ) : (
              <button
                onClick={() => addToShoppingCart({ product, count })}
                className="border-color-[transparent] rounded-[50px] border-2 bg-color-three px-8 py-4 text-white"
              >
                Додати в кошик
              </button>
            )}
          </div>
        </div>

        <div className="order-3 mt-6 md:order-none md:col-start-1 md:col-end-3">
          <Characteristics product={product} />
        </div>

        <div className="order-1 flex justify-end md:order-none md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-1">
          <Image
            src={product.imgUrl}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>
      </Container>
    </div>
  );
});

export default ProductPage;
