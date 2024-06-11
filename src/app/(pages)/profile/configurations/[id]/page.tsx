'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import {
  type ConfigureState,
  useConfigureStore,
} from '~/pagesComponents/ConfigurePage/store';
import { api } from '~/trpc/react';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const ConfigurationPage: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>()!;
  const { isFetching, data: configuration } =
    api.configuration.getConfigurationById.useQuery({ id });
  const router = useRouter();

  const setWithUpdateButton = useConfigureStore(
    (state) => state.setWithUpdateButton,
  );
  const setFilterObjectItem = useConfigureStore(
    (state) => state.setFilterObjectItem,
  );

  if (isFetching) {
    return (
      <Container className="flex h-full items-center justify-center">
        <p className="text-xl">Зачекайте...</p>
      </Container>
    );
  }

  if (!configuration) {
    return notFound();
  }

  const parts = JSON.parse(
    configuration.parts,
  ) as ConfigureState['configuration'];

  const total = Object.values(parts).reduce(
    (accum, part) => accum + (part?.price ?? 0),
    0,
  );

  return (
    <div className="h-full">
      <Container className="mt-4 grid grid-rows-[min-content_1fr_min-content] gap-20">
        <div>
          <p className="text-wrap text-xl font-bold md:text-3xl">{`Збірка ${configuration.id}`}</p>
        </div>

        <div>
          <div className="grid grid-cols-5 gap-2 text-sm font-medium md:grid-cols-6 md:text-lg">
            <p>Фото</p>
            <p>Id</p>
            <p>Товар</p>
            <p>Тип</p>
            <p>Ціна</p>
          </div>

          <div className="mt-4 border-t-2 border-color-three">
            {Object.values(parts).map((part) => {
              return (
                <div
                  className="grid grid-cols-5 grid-rows-[1fr_min-content] items-center gap-x-2 gap-y-6 border-b-2 border-color-six py-6 md:grid-cols-6 md:grid-rows-none"
                  key={part?.id}
                >
                  <Image
                    src={part?.imgUrl ?? ''}
                    alt={part?.title ?? ''}
                    width={100}
                    height={100}
                  />

                  <p className="truncate" title={part?.id}>
                    {part?.id}
                  </p>

                  <Link
                    href={`/${part?.dbType}/${part?.id}`}
                    className="truncate text-color-three"
                    target="_blank"
                    title={part?.title}
                  >
                    {part?.title}
                  </Link>

                  <p className="truncate">{part?.type}</p>

                  <p>{`${part?.price} грн`}</p>

                  <button
                    onClick={() => {
                      setWithUpdateButton(true);

                      setFilterObjectItem({
                        socket: part?.socket ? [part.socket] : [],
                        memoryType: part?.memoryType ? [part.memoryType] : [],
                        formFactor: part?.formFactor ? [part.formFactor] : [],
                      });

                      router.push(`/${part?.dbType}?configurationId=${id}`);
                    }}
                    className="col-start-1 col-end-6 border-2 border-color-three py-2 md:col-start-6 md:col-end-7"
                  >
                    Змінити
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-2xl font-semibold">
          <p className="text-color-five">Усього</p>
          <p>{`${total} грн`}</p>
        </div>
      </Container>
    </div>
  );
});

export default ConfigurationPage;
