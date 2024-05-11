import React from 'react';

import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

import { type productToCart } from '~/shared/store';

import { ProfileNavBar } from '~/components/ProfileNavBar';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const OrdersPage: React.FC = React.memo(async () => {
  const session = await getServerAuthSession();
  const orders = await api.order.getOrdersById({
    userId: session?.user.id ?? '',
  });

  return (
    <div className="h-full">
      <Container className="grid h-full grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-none">
        <ProfileNavBar />

        {!orders.length && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold">Наразі немає замовлень</p>
          </div>
        )}

        {!!orders.length && (
          <div>
            <div className="mt-2 grid grid-cols-4 gap-2 px-4 text-lg font-medium">
              <p>Id</p>
              <p>Статус</p>
              <p>Дата створення</p>
              <p>Сума</p>
            </div>

            <div className="mt-4 flex flex-col">
              {orders.map((order) => {
                const products = JSON.parse(order.products) as productToCart[];

                const sum = products.reduce(
                  (accum, productToCart) =>
                    accum + productToCart.count * productToCart.product.price,
                  0,
                );

                return (
                  <Link
                    key={order.id}
                    className="grid grid-cols-4 gap-2 border-t border-color-three px-4 py-6 transition hover:bg-color-one"
                    href={`/profile/orders/${order.id}`}
                  >
                    <p title={order.id} className="truncate">
                      {order.id}
                    </p>
                    <p className="truncate">{order.status}</p>
                    <p>{order.createdAt.toLocaleDateString()}</p>
                    <p>{`${sum} грн`}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
});

export default OrdersPage;
