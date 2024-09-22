import React from 'react';

import { type Product } from '@prisma/client';
import Image from 'next/image';
import { FilterCheckBoxes } from '~/pagesComponents/CataloguePage/modules/FilterBurger/components/FilterCheckBoxes/FilterCheckBoxes';

import { Container } from '~/ui/Container';

import closeIcon from '../../../../../../../public/assets/close.svg';

type Props = {
  setIsFilterOpened: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
};

// eslint-disable-next-line react/display-name
export const Burger: React.FC<Props> = React.memo(
  ({ setIsFilterOpened, products }) => {
    const getItemsToFilter = (item: keyof Product) => {
      return [
        ...new Set(
          products
            .filter((product) => product[item])
            .map((products) => products[item])
            .sort((a, b) => {
              if (typeof a === 'number' && typeof b === 'number') {
                return b - a;
              }

              return (a as string).localeCompare(b as string);
            }),
        ),
      ];
    };

    const itemsToFilter = [
      {
        header: 'Type',
        items: getItemsToFilter('type'),
        searchParamsSlug: 'type',
      },
      {
        header: 'Manufacturer',
        items: getItemsToFilter('manufacturer'),
        searchParamsSlug: 'manufacturer',
      },
      {
        header: 'Assignment',
        items: getItemsToFilter('assignment'),
        searchParamsSlug: 'assignment',
      },
      {
        header: 'Frequency',
        items: getItemsToFilter('frequency'),
        searchParamsSlug: 'frequency',
      },
      {
        header: 'Memory Capacity',
        items: getItemsToFilter('capacity'),
        searchParamsSlug: 'capacity',
      },
      {
        header: 'Form Factor',
        items: getItemsToFilter('formFactor'),
        searchParamsSlug: 'formFactor',
      },
      {
        header: 'Socket',
        items: getItemsToFilter('socket'),
        searchParamsSlug: 'socket',
      },
      {
        header: 'Chipset',
        items: getItemsToFilter('chipset'),
        searchParamsSlug: 'chipset',
      },
      {
        header: 'Number of M2 Slots',
        items: getItemsToFilter('m2Count'),
        searchParamsSlug: 'm2Count',
      },
      {
        header: 'Core Count',
        items: getItemsToFilter('coreCount'),
        searchParamsSlug: 'coreCount',
      },
      {
        header: 'Integrated Graphics',
        items: getItemsToFilter('withVideo'),
        searchParamsSlug: 'withVideo',
      },
      {
        header: 'Memory Type',
        items: getItemsToFilter('memoryType'),
        searchParamsSlug: 'memoryType',
      },
      {
        header: 'Disk Type',
        items: getItemsToFilter('hddType'),
        searchParamsSlug: 'hddType',
      },
      {
        header: 'Disk Form Factor',
        items: getItemsToFilter('hddFormFactor'),
        searchParamsSlug: 'hddFormFactor',
      },
      {
        header: 'Disk Speed',
        items: getItemsToFilter('speed'),
        searchParamsSlug: 'speed',
      },
      {
        header: 'Power',
        items: getItemsToFilter('power'),
        searchParamsSlug: 'power',
      },
      {
        header: 'Cooler Size',
        items: getItemsToFilter('coolerSize'),
        searchParamsSlug: 'coolerSize',
      },
      {
        header: 'Cooling Type',
        items: getItemsToFilter('coolerType'),
        searchParamsSlug: 'coolerType',
      },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 overflow-y-scroll bg-white">
        <Container>
          <div className="mt-4 flex items-center justify-between border-b-2 pb-2">
            <h2 className="text-2xl font-semibold">Filter</h2>

            <button
              onClick={() => setIsFilterOpened(false)}
              type="button"
              className="h-6 w-6"
            >
              <Image src={closeIcon as string} alt="close" />
            </button>
          </div>

          {itemsToFilter
            .filter((item) => item.items.length > 0)
            .sort((a, b) => a.header.localeCompare(b.header))
            .map((item) => (
              <FilterCheckBoxes
                key={item.header}
                header={item.header}
                items={item.items as string[]}
                searchParamsSlug={item.searchParamsSlug}
              />
            ))}
        </Container>
      </div>
    );
  },
);
