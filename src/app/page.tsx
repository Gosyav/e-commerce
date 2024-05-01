/* eslint-disable react/display-name */
import React from 'react';

import Image from 'next/image';
import { Features } from '~/pages/HomePage';
import { Container } from '~/ui/Container';

import banner from '../../public/assets/banner.jpg';
import brands from '../../public/assets/brands.jpg';

const Home: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col gap-8">
      <Container className="mt-6">
        <Image src={banner} alt="banner" />
      </Container>

      <Container className="mt-6">
        <Image src={brands} alt="brands" />
      </Container>

      <Features />
    </div>
  );
});

export default Home;
