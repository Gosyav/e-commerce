import { type PropsWithChildren } from 'react';

import { getServerSession } from 'next-auth';
import { TRPCReactProvider } from '~/trpc/react';

import SessionProvider from '~/shared/SessionProvider';

const Providers: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
};

export default Providers;
