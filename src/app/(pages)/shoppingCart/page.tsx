'use client';

import React, { useState } from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AuthUserForm,
  NonAauthUserForm,
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
        <h1 className="text-2xl font-semibold">Кошик</h1>

        {isNonAuthFormSuccess && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold md:text-4xl">
              Дякуємо за замовлення! Наш менеджер невдовзі зателефонує вам!
            </p>

            <Link
              className="mt-4 block rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-center text-white"
              href="/"
            >
              На головну
            </Link>
          </div>
        )}

        {!productsInShoppingCart.length && !isNonAuthFormSuccess && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold md:text-4xl">
              Нажаль ваш кошик наразі порожній
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-4 block rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-center text-white"
            >
              Продовжити покупки
            </button>
          </div>
        )}

        {!isNonAuthFormSuccess && productsInShoppingCart.length && (
          <div className="grid h-min grid-rows-[min-content_min-content] gap-24 md:grid-cols-2 md:grid-rows-none xl:grid-cols-[2fr_1fr]">
            <div className="mt-2 bg-color-one px-4 xl:order-2">
              <div className="mt-4">
                <h2 className="text-xl font-semibold">
                  Коротка Інформація про вас
                </h2>

                <div className="mt-2">
                  {data?.user.id ? (
                    <AuthUserForm />
                  ) : (
                    <NonAauthUserForm setIsSuccess={setIsNonAuthFormSuccess} />
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t-2">
                <div className="mt-2 flex items-center justify-between text-base font-semibold">
                  <p>Сума всіх товарів</p>

                  <p>{`${sum} грн`}</p>
                </div>

                <div className="mt-2 flex items-center justify-between text-base font-semibold">
                  <p>Вартість доставки</p>

                  <p>{`${Math.round(sum * 0.05)} грн`}</p>
                </div>

                <div className="mt-2 flex items-center justify-between text-lg font-bold">
                  <p>Усього</p>

                  <p>{`${Math.round(sum * 0.05) + sum} грн`}</p>
                </div>
              </div>
            </div>

            <div className="mt-2 xl:order-1">
              <div className="hidden grid-cols-6 border-b-2 py-4 text-sm font-semibold xl:grid">
                <p className="col-start-1 col-end-3">Продукт</p>

                <p>Ціна</p>

                <p>Кількість</p>

                <p>Висновок</p>
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
