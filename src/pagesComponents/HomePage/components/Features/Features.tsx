import React from 'react';

import Image from 'next/image';

import { Container } from '~/ui/Container';

import feature1 from '../../../../../public/assets/features/1.svg';
import feature2 from '../../../../../public/assets/features/2.svg';
import feature3 from '../../../../../public/assets/features/3.svg';

// eslint-disable-next-line react/display-name
export const Features: React.FC = React.memo(() => {
  const features = [
    {
      img: feature1 as string,
      title: 'Warranty',
      description: '3-year warranty on our products',
    },
    {
      img: feature2 as string,
      title: 'Personal Account',
      description: 'With personal tech support, free delivery, and much more',
    },
    {
      img: feature3 as string,
      title: 'Discount System',
      description: 'Up to 70% discounts for regular customers',
    },
  ];

  return (
    <section>
      <Container className="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-none">
        {features.map((feature) => (
          <div
            className="grid grid-rows-2 justify-items-center"
            key={feature.title}
          >
            <Image src={feature.img} alt={feature.title} />

            <div className="text-center">
              <h2 className="text-lg font-bold">{feature.title}</h2>

              <p className="text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
});
