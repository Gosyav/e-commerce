import React from 'react';

import Link from 'next/link';
import { type ConfigureState } from '~/pagesComponents/ConfigurePage/store';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

import { ProfileNavBar } from '~/components/ProfileNavBar';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const ConfigurationsPage: React.FC = React.memo(async () => {
  const session = await getServerAuthSession();
  const configurations = await api.configuration.getConfigurationsById({
    userId: session?.user.id ?? '',
  });

  return (
    <div className="h-full">
      <Container className="grid h-full grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-none">
        <ProfileNavBar />

        {!configurations.length && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold">
              No configurations at this time
            </p>
          </div>
        )}

        {!!configurations.length && (
          <div>
            <div className="mt-2 grid grid-cols-3 gap-2 px-4 text-lg font-medium">
              <p>Id</p>
              <p>Creation Date</p>
              <p>Amount</p>
            </div>

            <div className="mt-4 flex flex-col">
              {configurations.map((configuration) => {
                const parts = JSON.parse(
                  configuration.parts,
                ) as ConfigureState['configuration'];

                const sum = Object.values(parts).reduce(
                  (accum, part) => accum + (part?.price ?? 0),
                  0,
                );

                return (
                  <Link
                    key={configuration.id}
                    className="grid grid-cols-3 gap-2 border-t border-color-three px-4 py-6 transition hover:bg-color-one"
                    href={`/profile/configurations/${configuration.id}`}
                  >
                    <p title={configuration.id} className="truncate">
                      {configuration.id}
                    </p>
                    <p>{configuration.createdAt.toLocaleDateString()}</p>
                    <p>{`${sum} UAH`}</p>
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

export default ConfigurationsPage;
