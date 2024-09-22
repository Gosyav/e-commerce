'use client';

import React, { useState } from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AuthUserForm,
  NonAuthUserForm,
} from '~/pagesComponents/shoppingCartPage';
import { CartItem } from '~/pagesComponents/shoppingCartPage/components/CartItem/CartItem';

import { useProductsStore } from '~/shared/store';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const ShoppingCart: React.FC = React.memo(() => {
  const { data } = useSession();
  const router = useRouter();
  const [isNonAuthFormSuccess, setIsNonAuthFormSuccess] = useState(false);

  const productsInShoppingCart = useProductsStore(
    (state) => state.productsInShoppingCart,
  );

  const sum = productsInShoppingCart.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  return (
    <div className="h-full">
      <Container className="mt-4 h-full">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>

        {isNonAuthFormSuccess && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold md:text-4xl">
              Thank you for your order! Our manager will call you soon!
            </p>

            <Link
              className="mt-4 block rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-center text-white"
              href="/"
            >
              Go to Home
            </Link>
          </div>
        )}

        {!productsInShoppingCart.length && !isNonAuthFormSuccess && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold md:text-4xl">
              Unfortunately, your cart is currently empty
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-4 block rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-center text-white"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {!isNonAuthFormSuccess && productsInShoppingCart.length && (
          <div className="grid h-min grid-rows-[min-content_min-content] gap-24 md:grid-cols-2 md:grid-rows-none xl:grid-cols-[2fr_1fr]">
            <div className="mt-2 bg-color-one px-4 xl:order-2">
              <div className="mt-4">
                <h2 className="text-xl font-semibold">
                  Brief Information About You
                </h2>

                <div className="mt-2">
                  {data?.user.id ? (
                    <AuthUserForm />
                  ) : (
                    <NonAuthUserForm setIsSuccess={setIsNonAuthFormSuccess} />
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t-2">
                <div className="mt-2 flex items-center justify-between text-base font-semibold">
                  <p>Total Price of Items</p>

                  <p>{`${sum} UAH`}</p>
                </div>

                <div className="mt-2 flex items-center justify-between text-base font-semibold">
                  <p>Delivery Cost</p>

                  <p>{`${Math.round(sum * 0.05)} UAH`}</p>
                </div>

                <div className="mt-2 flex items-center justify-between text-lg font-bold">
                  <p>Total</p>

                  <p>{`${Math.round(sum * 0.05) + sum} UAH`}</p>
                </div>
              </div>
            </div>

            <div className="mt-2 xl:order-1">
              <div className="hidden grid-cols-6 border-b-2 py-4 text-sm font-semibold xl:grid">
                <p className="col-start-1 col-end-3">Product</p>

                <p>Price</p>

                <p>Quantity</p>

                <p>Subtotal</p>
              </div>

              <div className="mt-2">
                {productsInShoppingCart.map(({ product, count }) => (
                  <CartItem
                    key={product.id}
                    imgUrl={product.imgUrl}
                    productId={product.id}
                    price={product.price}
                    title={product.title}
                    count={count}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
});

export default ShoppingCart;
