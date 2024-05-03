/* eslint-disable react/display-name */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '~/components/ProductCard';
import { Features, ProductsSection } from '~/pages/HomePage';
import { Container } from '~/ui/Container';

import banner from '../../public/assets/banner.jpg';
import brands from '../../public/assets/brands.jpg';
import section1 from '../../public/assets/homeSections/1.jpg';
import section2 from '../../public/assets/homeSections/2.jpg';
import section3 from '../../public/assets/homeSections/3.jpg';

const Home: React.FC = React.memo(() => {
  const sections = [
    {
      img: section1,
      title: 'Ноутбуки',
      linkTo: '/',
    },
    {
      img: section2,
      title: 'ПК',
      linkTo: '/',
    },
    {
      img: section3,
      title: 'Монітори',
      linkTo: '/',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Container className="mt-6">
        <Image src={banner} alt="banner" />
      </Container>

      <Features />

      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Новинки</h2>

          <Link href="/" className="text-color-four text-sm">
            Дивитися все
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-5">
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
        {sections.map((section) => (
          <ProductsSection
            key={section.title}
            img={section.img}
            title={section.title}
            linkTo={section.linkTo}
          />
        ))}
      </Container>

      <Container className="mt-6 flex justify-center">
        <Image src={brands} alt="brands" />
      </Container>
    </div>
  );
});

export default Home;
