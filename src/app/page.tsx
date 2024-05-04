/* eslint-disable react/display-name */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { api } from '~/trpc/server';

import { Features, ProductsSection } from '~/pages/HomePage';

import { ProductCard } from '~/components/ProductCard';

import { Container } from '~/ui/Container';

import banner from '../../public/assets/banner.jpg';
import brands from '../../public/assets/brands.jpg';
import section1 from '../../public/assets/homeSections/1.jpg';
import section2 from '../../public/assets/homeSections/2.jpg';
import section3 from '../../public/assets/homeSections/3.jpg';

const Home: React.FC = React.memo(async () => {
  const newProducts = await api.product.getNewProducts();
  const laptops = await api.product.getByType({ type: 'laptops' });
  const pcs = await api.product.getByType({ type: 'pcs' });
  const monitors = await api.product.getByType({ type: 'monitors' });

  const sections = [
    {
      img: section1,
      title: 'Ноутбуки',
      linkTo: '/laptops',
      products: laptops,
    },
    {
      img: section2,
      title: 'ПК',
      linkTo: '/pcs',
      products: pcs,
    },
    {
      img: section3,
      title: 'Монітори',
      linkTo: '/monitors',
      products: monitors,
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

          <Link href="/" className="text-sm text-color-four">
            Дивитися все
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-5">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              img={product.imgUrl}
              title={product.title}
              price={product.price}
              href={`${product.dbType}/${product.id}`}
            />
          ))}
        </div>
      </Container>

      <Container className="flex flex-col gap-8">
        {sections.map((section) => (
          <ProductsSection
            products={section.products}
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
