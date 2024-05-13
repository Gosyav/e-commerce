'use client';

import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

import {
  type ConfigureState,
  useConfigureStore,
} from '~/pagesComponents/ConfigurePage/store';

import { Container } from '~/ui/Container';

/* eslint-disable indent */
// eslint-disable-next-line react/display-name
const ConfigurePage: React.FC = React.memo(() => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const createConfigurationMutation = api.configuration.create.useMutation();

  const configuration = useConfigureStore((state) => state.configuration);
  const clearConfiguration = useConfigureStore(
    (state) => state.clearConfiguration,
  );
  const setWithButton = useConfigureStore((state) => state.setWithButton);
  const setFilterObjectItem = useConfigureStore(
    (state) => state.setFilterObjectItem,
  );
  const clearFilterObject = useConfigureStore(
    (state) => state.clearFilterObject,
  );

  const parts = [
    {
      title: 'Материнська плата',
      onClick: () => {
        setWithButton(true);
        router.push('/motherboards');
      },
      name: 'motherboards' as keyof ConfigureState['configuration'],
      disabled: false,
    },
    {
      title: 'Процесор',
      onClick: () => {
        setFilterObjectItem({
          socket: [configuration.motherboards?.socket] as string[],
        });
        router.push('/cpus');
      },
      name: 'cpus' as keyof ConfigureState['configuration'],
      disabled: !configuration.motherboards,
    },
    {
      title: 'Оперативна пам`ять',
      onClick: () => {
        setFilterObjectItem({
          memoryType: [configuration.motherboards?.memoryType] as string[],
        });
        router.push('/rams');
      },
      name: 'rams' as keyof ConfigureState['configuration'],
      disabled: !configuration.cpus,
    },
    {
      title: 'Відеокарта',
      onClick: () => {
        setWithButton(true);
        clearFilterObject();
        router.push('/gpus');
      },
      name: 'gpus' as keyof ConfigureState['configuration'],
      disabled: !configuration.rams,
    },
    {
      title: 'Блок живлення',
      onClick: () => {
        setWithButton(true);
        router.push('/powers');
      },
      name: 'powers' as keyof ConfigureState['configuration'],
      disabled: !configuration.gpus,
    },
    {
      title: 'Охолодження процесора',
      onClick: () => {
        setWithButton(true);
        router.push('/coolers');
      },
      name: 'coolers' as keyof ConfigureState['configuration'],
      disabled: !configuration.powers,
    },
    {
      title: 'SSD диск',
      onClick: () => {
        setWithButton(true);
        router.push('/ssds');
      },
      name: 'ssds' as keyof ConfigureState['configuration'],
      disabled: !configuration.coolers,
    },
    {
      title: 'Жорсткий диск',
      onClick: () => {
        setWithButton(true);
        router.push('/hdds');
      },
      name: 'hdds' as keyof ConfigureState['configuration'],
      disabled: !configuration.ssds,
    },
    {
      title: 'Корпус',
      onClick: () => {
        setWithButton(true);

        setFilterObjectItem({
          formFactor: [configuration.motherboards?.formFactor] as string[],
        });
        router.push('/cases');
      },
      name: 'cases' as keyof ConfigureState['configuration'],
      disabled: !configuration.hdds,
    },
  ];

  const total = Object.values(configuration).reduce(
    (accum, product) => accum + (product?.price ?? 0),
    0,
  );

  if (status === 'loading') {
    return <p>Зачекайте</p>;
  }

  return (
    <div className="h-full">
      <Container className="mt-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-2xl font-semibold">
            Тут ви можете створити свою конфігурацію ПК
          </h1>

          <button
            type="button"
            className="mt-4 block w-full rounded-[50px] border-2 border-color-three px-2 py-2 md:mt-0 md:w-fit"
            onClick={() => clearConfiguration()}
          >
            Очистити конфігурацію
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {parts.map((part) => (
            <div key={part.name}>
              <h2 className="text-base font-semibold">{part.title}</h2>

              {!configuration[part.name] && (
                <button
                  type="button"
                  onClick={part.onClick}
                  disabled={part.disabled}
                  className="mt-2 block w-full border-2 border-dashed border-color-five py-8 disabled:cursor-not-allowed"
                >
                  <p className="block text-center text-color-five">
                    Немає обраного елемента
                  </p>
                </button>
              )}

              {configuration[part.name] && (
                <div className="mt-2 grid grid-rows-[1fr_min-content_min-content] items-center justify-items-start gap-2 py-8 md:grid-cols-3 md:grid-rows-none">
                  <Image
                    src={configuration[part.name]?.imgUrl ?? ''}
                    alt={configuration[part.name]?.title ?? ''}
                    width={100}
                    height={100}
                  />

                  <h3 className="font-medium">
                    {configuration[part.name]?.title}
                  </h3>

                  <p className="block w-full text-left font-medium md:text-right">{`${configuration[part.name]?.price} грн`}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t-2 py-4">
          <p className="text-xl font-medium text-color-five">Усього</p>
          <p className="text-xl font-medium">{`${total} грн`}</p>
        </div>

        {!Object.values(configuration).some((item) => !item) &&
          session?.user && (
            <div>
              <button
                type="button"
                className="block w-full rounded-[50px] bg-color-three py-4 font-medium text-white"
                onClick={() => {
                  createConfigurationMutation.mutate({
                    userId: session.user.id,
                    parts: JSON.stringify(configuration),
                  });
                  clearConfiguration();
                }}
              >
                Зберегти конфігурацію
              </button>
            </div>
          )}
      </Container>
    </div>
  );
});

export default ConfigurePage;
