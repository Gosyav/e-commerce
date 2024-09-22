'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import { ProfileNavBar } from '~/components/ProfileNavBar';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const Profile: React.FC = React.memo(() => {
  const { data, status } = useSession();

  if (status === 'loading') {
    return (
      <Container className="flex h-full items-center justify-center">
        <p className="text-xl">Loading...</p>
      </Container>
    );
  }

  return (
    <div className="h-full">
      <Container className="mt-4 grid h-full grid-rows-2 gap-16 md:grid-cols-2 md:grid-rows-none">
        <ProfileNavBar />

        <div className="flex flex-col gap-8 xl:flex-row">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium">Contact Information</p>

            <div className="flex flex-col text-color-five">
              <span className="text-lg">{data?.user.name}</span>

              <span className="text-lg">{data?.user.email}</span>

              <span className="text-lg">{data?.user.phone}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium">Delivery Address</p>

            <div className="flex flex-col text-color-five">
              <span className="text-lg">{data?.user.city}</span>

              <span className="text-lg">{data?.user.adress}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
});

export default Profile;
