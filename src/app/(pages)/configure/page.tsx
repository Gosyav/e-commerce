'use client';

import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  type ConfigureState,
  useConfigureStore,
} from '~/pagesComponents/ConfigurePage/store';
import { api } from '~/trpc/react';

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
      title: 'Motherboard',
      onClick: () => {
        setWithButton(true);
        router.push('/motherboards');
      },
      name: 'motherboards' as keyof ConfigureState['configuration'],
      disabled: false,
    },
    {
      title: 'Processor',
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
      title: 'RAM',
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
      title: 'Graphics Card',
      onClick: () => {
        setWithButton(true);
        clearFilterObject();
        router.push('/gpus');
      },
      name: 'gpus' as keyof ConfigureState['configuration'],
      disabled: !configuration.rams,
    },
    {
      title: 'Power Supply',
      onClick: () => {
        setWithButton(true);
        router.push('/powers');
      },
      name: 'powers' as keyof ConfigureState['configuration'],
      disabled: !configuration.gpus,
    },
    {
      title: 'CPU Cooler',
      onClick: () => {
        setWithButton(true);
        router.push('/coolers');
      },
      name: 'coolers' as keyof ConfigureState['configuration'],
      disabled: !configuration.powers,
    },
    {
      title: 'SSD',
      onClick: () => {
        setWithButton(true);
        router.push('/ssds');
      },
      name: 'ssds' as keyof ConfigureState['configuration'],
      disabled: !configuration.coolers,
    },
    {
      title: 'HDD',
      onClick: () => {
        setWithButton(true);
        router.push('/hdds');
      },
      name: 'hdds' as keyof ConfigureState['configuration'],
      disabled: !configuration.ssds,
    },
    {
      title: 'Case',
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
    return (
      <Container className="flex h-full items-center justify-center">
        <p className="text-xl">Loading...</p>
      </Container>
    );
  }

  return (
    <div className="h-full">
      <Container className="mt-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-2xl font-semibold">
            Here you can create your PC configuration
          </h1>

          <button
            type="button"
            className="mt-4 block w-full rounded-[50px] border-2 border-color-three px-2 py-2 md:mt-0 md:w-fit"
            onClick={() => clearConfiguration()}
          >
            Clear Configuration
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
                    No selected item
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

                  <p className="block w-full text-left font-medium md:text-right">{`${configuration[part.name]?.price} UAH`}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t-2 py-4">
          <p className="text-xl font-medium text-color-five">Total</p>
          <p className="text-xl font-medium">{`${total} UAH`}</p>
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
                Save Configuration
              </button>
            </div>
          )}
      </Container>
    </div>
  );
});

export default ConfigurePage;
