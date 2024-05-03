'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import Pagination from 'rc-pagination/lib/Pagination';
import { api } from '~/trpc/react';

import { ProductCard } from '~/components/ProductCard';

import { Container } from '~/ui/Container';

import nextIcon from '../../../../public/assets/next.svg';
import prevIcon from '../../../../public/assets/prev.svg';

// eslint-disable-next-line react/display-name
const Catalogue: React.FC = React.memo(() => {
  const { category } = useParams<{ category: string }>()!;
  const { isFetching, data: products } = api.product.getByType.useQuery({
    type: category,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  if (isFetching) {
    return <p>Зачекайте...</p>;
  }

  if (!products?.length) {
    return <p>Наразі немає товарів в цій категорії</p>;
  }

  return (
    <div className="h-full">
      <Container className="mt-4">
        <button className="block w-full border-2 border-color-three py-2 font-semibold">
          Фільтр
        </button>
      </Container>

      <Container className="mt-4 flex flex-col justify-between h-[90%]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products
            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
            .map((product) => (
              <ProductCard
                key={product.id}
                img={product.imgUrl}
                title={product.title}
                price={product.price}
                href={`${product.dbType}/${product.id}`}
              />
            ))}
        </div>

        <Pagination
          total={products.length}
          className="flex items-center justify-center gap-4 mt-2"
          prevIcon={<Image src={prevIcon as string} alt="prevIcon" />}
          nextIcon={<Image src={nextIcon as string} alt="nextIcon" />}
          current={currentPage}
          onChange={(current) => setCurrentPage(current)}
          pageSize={PAGE_SIZE}
          hideOnSinglePage
        />
      </Container>
    </div>
  );
});

export default Catalogue;
