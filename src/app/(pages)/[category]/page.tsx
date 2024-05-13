'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Pagination from 'rc-pagination/lib/Pagination';
import { api } from '~/trpc/react';

import { createSearchParams } from '~/shared/helpers/createSearchParams';

import { Burger } from '~/pagesComponents/CataloguePage/modules/FilterBurger';
import { getFilteredProducts } from '~/pagesComponents/CataloguePage/modules/FilterBurger/helpers/getFilteredProducts';
import {
  type ConfigureState,
  useConfigureStore,
} from '~/pagesComponents/ConfigurePage/store';

import { ProductCard } from '~/components/ProductCard';

import { Container } from '~/ui/Container';

import nextIcon from '../../../../public/assets/next.svg';
import prevIcon from '../../../../public/assets/prev.svg';

// eslint-disable-next-line react/display-name
const Catalogue: React.FC = React.memo(() => {
  const searchParams = useSearchParams()!;
  const { category } = useParams<{ category: string }>()!;
  const { isFetching, data: products } = api.product.getByType.useQuery({
    type: category,
  });
  const currentConfigurationMutation = api.configuration.update.useMutation();

  const configurationId = searchParams.get('configurationId') ?? '';
  const { data: currentConfiguration, isFetching: isConfigurationFecthing } =
    api.configuration.getConfigurationById.useQuery({
      id: configurationId,
    });
  const clearConfigurationToUpdate = useConfigureStore(
    (state) => state.clearConfigurationToUpdate,
  );
  const setWithUpdateButton = useConfigureStore(
    (state) => state.setWithUpdateButton,
  );

  const PAGE_SIZE = 10;

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const filterObject = useConfigureStore((state) => state.filterObject);
  const setConfigurationItem = useConfigureStore(
    (state) => state.setConfigurationItem,
  );
  const setWithButton = useConfigureStore((state) => state.setWithButton);

  const router = useRouter();
  const pathname = usePathname();
  const currentPage = +(searchParams.get('page') ?? 1);

  const manufacturer = !searchParams.getAll('manufacturer').length
    ? []
    : searchParams.getAll('manufacturer');

  const assignment = !searchParams.getAll('assignment').length
    ? []
    : searchParams.getAll('assignment');

  const frequency = !searchParams.getAll('frequency').length
    ? []
    : searchParams.getAll('frequency');

  const capacity = !searchParams.getAll('capacity').length
    ? []
    : searchParams.getAll('capacity');

  const formFactor = !searchParams.getAll('formFactor').length
    ? filterObject.formFactor
    : searchParams.getAll('formFactor');

  const socket = !searchParams.getAll('socket').length
    ? filterObject.socket
    : searchParams.getAll('socket');

  const chipset = !searchParams.getAll('chipset').length
    ? []
    : searchParams.getAll('chipset');

  const m2Count = !searchParams.getAll('m2Count').length
    ? []
    : searchParams.getAll('m2Count');

  const coreCount = !searchParams.getAll('coreCount').length
    ? []
    : searchParams.getAll('coreCount');

  const withVideo = !searchParams.getAll('withVideo').length
    ? []
    : searchParams.getAll('withVideo');

  const memoryType = !searchParams.getAll('memoryType').length
    ? filterObject.memoryType
    : searchParams.getAll('memoryType');

  const hddType = !searchParams.getAll('hddType').length
    ? []
    : searchParams.getAll('hddType');

  const hddFormFactor = !searchParams.getAll('hddFormFactor').length
    ? []
    : searchParams.getAll('hddFormFactor');

  const speed = !searchParams.getAll('speed').length
    ? []
    : searchParams.getAll('speed');

  const power = !searchParams.getAll('power').length
    ? []
    : searchParams.getAll('power');

  const coolerSize = !searchParams.getAll('coolerSize').length
    ? []
    : searchParams.getAll('coolerSize');

  const coolerType = !searchParams.getAll('coolerType').length
    ? []
    : searchParams.getAll('coolerType');

  if (isFetching || isConfigurationFecthing) {
    return <p>Зачекайте...</p>;
  }

  if (!products?.length) {
    return <p>Наразі немає товарів в цій категорії</p>;
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
  });

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
                withButton={
                  (pathname === `/${category}` && filterObject.withButton) ||
                  (pathname === `/${category}` && filterObject.withUpdateButton)
                }
                onClick={() => {
                  if (filterObject.withUpdateButton) {
                    currentConfigurationMutation
                      .mutateAsync({
                        configurationId,
                        parts: JSON.stringify({
                          ...JSON.parse(currentConfiguration?.parts ?? ''),
                          [category]: product,
                        }),
                      })
                      .then(() => {
                        clearConfigurationToUpdate();
                        setWithUpdateButton(false);

                        router.push(
                          `/profile/configurations/${configurationId}`,
                        );
                      })
                      .catch((e) => console.log(e));

                    return;
                  }

                  setConfigurationItem(
                    category as keyof ConfigureState['configuration'],
                    product,
                  );
                  setWithButton(false);
                  router.push('/configure');
                }}
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
        <Burger
          setIsFilterOpened={setIsFilterOpened}
          products={filteredItems}
        />
      )}
    </div>
  );
});

export default Catalogue;
