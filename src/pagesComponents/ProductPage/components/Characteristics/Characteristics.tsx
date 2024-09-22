import React from 'react';

import { type Product } from '@prisma/client';

type Props = {
  product: Product;
};

// eslint-disable-next-line react/display-name
export const Characteristics: React.FC<Props> = React.memo(({ product }) => {
  return (
    <div className="flex flex-col gap-4">
      {product?.type && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Type</p>
          <p>{product.type}</p>
        </div>
      )}

      {product?.manufacturer && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Manufacturer</p>
          <p>{product.manufacturer}</p>
        </div>
      )}

      {product?.assignment && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Purpose</p>
          <p>{product.assignment}</p>
        </div>
      )}

      {product?.frequency && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Frequency</p>
          <p>{product.frequency}</p>
        </div>
      )}

      {product?.capacity && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Capacity</p>
          <p>{product.capacity}</p>
        </div>
      )}

      {product?.formFactor && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Form Factor</p>
          <p>{product.formFactor}</p>
        </div>
      )}

      {product?.socket && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Socket</p>
          <p>{product.socket}</p>
        </div>
      )}

      {product?.chipset && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Chipset</p>
          <p>{product.chipset}</p>
        </div>
      )}

      {product?.m2Count && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Number of M.2</p>
          <p>{product.m2Count}</p>
        </div>
      )}

      {product?.coreCount && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Number of Cores</p>
          <p>{product.coreCount}</p>
        </div>
      )}

      {product?.withVideo && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Integrated Video</p>
          <p>{product.withVideo ? 'Yes' : 'No'}</p>
        </div>
      )}

      {product?.memoryType && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Memory Type</p>
          <p>{product.memoryType}</p>
        </div>
      )}

      {product?.hddType && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Disk Type</p>
          <p>{product.hddType}</p>
        </div>
      )}

      {product?.formFactor && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Disk Form Factor</p>
          <p>{product.formFactor}</p>
        </div>
      )}

      {product?.speed && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Disk RPM</p>
          <p>{product.speed}</p>
        </div>
      )}

      {product?.power && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Power</p>
          <p>{product.power}</p>
        </div>
      )}

      {product?.coolerSize && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Cooler Size</p>
          <p>{product.coolerSize}</p>
        </div>
      )}

      {product?.coolerType && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Cooling Type</p>
          <p>{product.coolerType}</p>
        </div>
      )}
    </div>
  );
});
