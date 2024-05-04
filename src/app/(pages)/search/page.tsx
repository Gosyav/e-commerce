'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from 'rc-pagination/lib/Pagination';
import { api } from '~/trpc/react';

import { createSearchParams } from '~/shared/helpers/createSearchParams';

import { Burger } from '~/pages/CataloguePage/modules/FilterBurger';
import { getFilteredProducts } from '~/pages/CataloguePage/modules/FilterBurger/helpers/getFilteredProducts';

import { ProductCard } from '~/components/ProductCard';

import { Container } from '~/ui/Container';

import nextIcon from '../../../../public/assets/next.svg';
import prevIcon from '../../../../public/assets/prev.svg';

// eslint-disable-next-line react/display-name
const SearchPage: React.FC = React.memo(() => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const PAGE_SIZE = 10;

  const router = useRouter();
  const searchParams = useSearchParams()!;

  const query = searchParams.get('query') ?? '';
  const currentPage = +(searchParams.get('page') ?? 1);

  const manufacturer = searchParams.getAll('manufacturer') || [];
  const assignment = searchParams.getAll('assignment') || [];
  const frequency = searchParams.getAll('frequency') || [];
  const capacity = searchParams.getAll('capacity') || [];
  const formFactor = searchParams.getAll('formFactor') || [];
  const socket = searchParams.getAll('socket') || [];
  const chipset = searchParams.getAll('chipset') || [];
  const m2Count = searchParams.getAll('m2Count') || [];
  const coreCount = searchParams.getAll('coreCount') || [];
  const withVideo = searchParams.getAll('withVideo') || [];
  const memoryType = searchParams.getAll('memoryType') || [];
  const hddType = searchParams.getAll('hddType') || [];
  const hddFormFactor = searchParams.getAll('hddFormFactor') || [];
  const speed = searchParams.getAll('speed') || [];
  const power = searchParams.getAll('power') || [];
  const coolerSize = searchParams.getAll('coolerSize') || [];
  const coolerType = searchParams.getAll('coolerType') || [];
  const type = searchParams.getAll('type') || [];

  const { isFetching, data: products } = api.product.getByQuery.useQuery({
    query,
  });

  if (isFetching) {
    return <p>Зачекайте...</p>;
  }

  if (!products?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="block text-center text-xl font-bold md:text-3xl">
          Товарів з таким пошуковим запитом немає
        </p>

        <Link
          href="/"
          className="mt-4 max-w-52 rounded-[50px] bg-color-three px-8 py-4 text-center text-white"
        >
          На головну
        </Link>
      </div>
    );
  }

  const filteredItems = getFilteredProducts(products, {
    manufacturer,
    assignment,
    frequency,
    capacity,
    formFactor,
    socket,
    chipset,
    m2Count,
    coreCount,
    withVideo,
    memoryType,
    hddType,
    hddFormFactor,
    speed,
    power,
    coolerSize,
    coolerType,
    type,
  });

  if (!filteredItems.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="block text-center text-xl font-bold md:text-3xl">
          Товарів з вибраними фільтрами немає
        </p>

        <button
          onClick={() =>
            router.push(
              createSearchParams(
                {
                  manufacturer: null,
                  assignment: null,
                  frequency: null,
                  capacity: null,
                  formFactor: null,
                  socket: null,
                  chipset: null,
                  m2Count: null,
                  coreCount: null,
                  withVideo: null,
                  memoryType: null,
                  hddType: null,
                  hddFormFactor: null,
                  speed: null,
                  power: null,
                  coolerSize: null,
                  coolerType: null,
                },
                searchParams,
              ),
            )
          }
          className="mt-4 max-w-52 rounded-[50px] bg-color-three px-8 py-4 text-center text-white"
        >
          Скинути фільтри
        </button>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Container className="mt-4">
        <button
          onClick={() => setIsFilterOpened(true)}
          className="block w-full border-2 border-color-three py-2 font-semibold"
        >
          Фільтр
        </button>
      </Container>

      <Container className="mt-4 flex h-[90%] flex-col justify-between">
        {!filteredItems.length && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="block text-center text-xl font-bold md:text-3xl">
              Товарів з вибраними фільтрами немає
            </p>

            <button
              onClick={() =>
                router.push(
                  createSearchParams(
                    {
                      manufacturer: null,
                      assignment: null,
                      frequency: null,
                      capacity: null,
                      formFactor: null,
                      socket: null,
                      chipset: null,
                      m2Count: null,
                      coreCount: null,
                      withVideo: null,
                      memoryType: null,
                      hddType: null,
                      hddFormFactor: null,
                      speed: null,
                      power: null,
                      coolerSize: null,
                      coolerType: null,
                      type: null,
                    },
                    searchParams,
                  ),
                )
              }
              className="mt-4 max-w-52 rounded-[50px] bg-color-three px-8 py-4 text-center text-white"
            >
              Скинути фільтри
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {filteredItems
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
          total={filteredItems.length}
          className="mt-2 flex items-center justify-center gap-4"
          prevIcon={<Image src={prevIcon as string} alt="prevIcon" />}
          nextIcon={<Image src={nextIcon as string} alt="nextIcon" />}
          current={currentPage}
          onChange={(current) =>
            router.push(createSearchParams({ page: current }, searchParams))
          }
          pageSize={PAGE_SIZE}
          hideOnSinglePage
        />
      </Container>

      {isFilterOpened && (
        <Burger setIsFilterOpened={setIsFilterOpened} products={products} />
      )}
    </div>
  );
});

export default SearchPage;
