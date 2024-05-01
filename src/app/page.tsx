/* eslint-disable react/display-name */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '~/components/ProductCard/ProductCard';
import { Features, ProductsSection } from '~/pages/HomePage';
import { Container } from '~/ui/Container';

import banner from '../../public/assets/banner.jpg';
import brands from '../../public/assets/brands.jpg';
import section1 from '../../public/assets/homeSections/1.jpg';

const Home: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col gap-8">
      <Container className="mt-6">
        <Image src={banner} alt="banner" />
      </Container>

      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Новинки</h2>

          <Link href="/" className="text-color-four text-sm">
            Дивитися все
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 2xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <ProductCard
              key={item}
              img="https://content2.rozetka.com.ua/goods/images/big/414340675.jpg"
              title="RTX 3050"
              price="8500"
              href="/"
            />
          ))}
        </div>
      </Container>

      <Container className="flex flex-col gap-8">
        <ProductsSection img={section1} />
        <ProductsSection img={section1} />
        <ProductsSection img={section1} />
      </Container>

      <Container className="mt-6 flex justify-center">
        <Image src={brands} alt="brands" />
      </Container>

      <Features />
    </div>
  );
});

export default Home;
