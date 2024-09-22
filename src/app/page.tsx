/* eslint-disable react/display-name */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Features, ProductsSection } from '~/pagesComponents/HomePage';
import { api } from '~/trpc/server';

import { ProductCard } from '~/components/ProductCard';

import { Container } from '~/ui/Container';

import banner from '../../public/assets/banner.jpg';
import brands from '../../public/assets/brands.jpg';
import section1 from '../../public/assets/homeSections/1.jpg';
import section2 from '../../public/assets/homeSections/2.jpg';

const Home: React.FC = React.memo(async () => {
  const newProducts = await api.product.getNewProducts();
  const laptops = await api.product.getByType({ type: 'laptops' });
  const pcs = await api.product.getByType({ type: 'pcs' });

  const sections = [
    {
      img: section1,
      title: 'Laptops',
      linkTo: '/laptops',
      products: laptops,
    },
    {
      img: section2,
      title: 'PCs',
      linkTo: '/pcs',
      products: pcs,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Container className="mt-6">
        <Image src={banner} alt="banner" className="w-full" />
      </Container>

      <Features />

      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">New Arrivals</h2>

          <Link href="/pcs" className="text-sm text-color-four">
            View All
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

      <Container className="mt-8 flex flex-col gap-8">
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
