'use client';

import React from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { api } from '~/trpc/react';

import { type productToCart } from '~/shared/store';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const OrderPage: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>()!;
  const { data: session, status } = useSession();
  const { isFetching, data: order } = api.order.getOrderById.useQuery({ id });

  if (isFetching || status === 'loading') {
    return (
      <Container className="flex h-full items-center justify-center">
        <p className="text-xl">Loading...</p>
      </Container>
    );
  }

  if (!order) {
    return notFound();
  }

  const orderInfo = [
    {
      title: 'Creation Date',
      value: order.createdAt.toLocaleDateString(),
    },
    {
      title: 'First Name, Last Name',
      value: session?.user.name,
    },
    {
      title: 'Delivery Address',
      value: order.adress,
    },
    {
      title: 'City',
      value: order.city,
    },
  ];

  const products = JSON.parse(order.products) as productToCart[];
  const productsSum = products.reduce(
    (accum, product) => accum + product.count * product.product.price,
    0,
  );
  const total = Math.round(productsSum + productsSum * 0.1);

  return (
    <div className="h-full">
      <Container className="mt-4 grid grid-rows-[1fr_1fr_min-content] gap-20">
        <div>
          <p className="text-wrap text-xl font-bold md:text-3xl">{`Order ${order.id}`}</p>

          <div className="mt-6 flex flex-col gap-4">
            {orderInfo.map((info) => (
              <div
                key={info.title}
                className="flex items-center justify-between"
              >
                <p className="text-color-five">{info.title}</p>
                <p className="font-medium">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-2 text-sm font-medium md:grid-cols-5 md:text-lg">
            <p>Product</p>
            <p className="hidden md:block">Id</p>
            <p>Quantity</p>
            <p>Unit Price</p>
            <p>Amount</p>
          </div>

          <div className="mt-4 border-t-2 border-color-three">
            {products.map(({ product, count }) => (
              <div
                className="grid grid-cols-4 items-center gap-2 border-b-2 border-color-six py-6 md:grid-cols-5"
                key={product.id}
              >
                <Link
                  href={`/${product.dbType}/${product.id}`}
                  className="truncate text-color-three"
                  target="_blank"
                >
                  {product.title}
                </Link>
                <p className="hidden md:block">{product.id}</p>
                <p>{count}</p>
                <p>{`${product.price} UAH`}</p>
                <p>{`${product.price * count} UAH`}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-2xl font-semibold">
          <p className="text-color-five">Total Due</p>
          <p>{`${total} UAH`}</p>
        </div>
      </Container>
    </div>
  );
});

export default OrderPage;
