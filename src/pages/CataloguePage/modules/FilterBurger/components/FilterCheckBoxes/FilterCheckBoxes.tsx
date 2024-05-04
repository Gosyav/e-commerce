import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { createSearchParams } from '~/shared/helpers/createSearchParams';

type Props = {
  header: string;
  items: string[];
  searchParamsSlug: string;
};

// eslint-disable-next-line react/display-name
export const FilterCheckBoxes: React.FC<Props> = React.memo(
  ({ header, items, searchParamsSlug }) => {
    const router = useRouter();
    const searchParams = useSearchParams()!;

    const searchItems = searchParams.getAll(searchParamsSlug) || [];

    const handleOnChange = (value: string) => {
      const newSearchItems = searchItems.includes(value)
        ? searchItems.filter((item) => item !== value)
        : [...searchItems, value];

      router.push(
        createSearchParams(
          { [searchParamsSlug]: newSearchItems },
          searchParams,
        ),
      );
    };

    return (
      <div className="mt-4">
        <h3 className="text-xl font-medium">{header}</h3>

        <ul className="mt-2 flex flex-col gap-1">
          {items.map((item, index) => (
            <li
              key={`${item}/${index}`}
              className="flex items-center justify-between"
            >
              <span className="font-medium">{item}</span>

              <input
                type="checkbox"
                className="h-5 w-5"
                value={item}
                onChange={(event) => handleOnChange(event.target.value)}
                checked={searchItems.includes(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
