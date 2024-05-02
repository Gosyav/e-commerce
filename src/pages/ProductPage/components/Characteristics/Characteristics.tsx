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
          <p>Тип</p>

          <p>{product.type}</p>
        </div>
      )}

      {product?.manufacturer && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Виробник</p>

          <p>{product.manufacturer}</p>
        </div>
      )}

      {product?.assignment && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Призначення</p>

          <p>{product.assignment}</p>
        </div>
      )}

      {product?.frequency && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Частота</p>

          <p>{product.frequency}</p>
        </div>
      )}

      {product?.capacity && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Місткість</p>

          <p>{product.capacity}</p>
        </div>
      )}

      {product?.formFactor && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Форм-фактор</p>

          <p>{product.formFactor}</p>
        </div>
      )}

      {product?.socket && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Сокет</p>

          <p>{product.socket}</p>
        </div>
      )}

      {product?.chipset && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Чіпсет</p>

          <p>{product.chipset}</p>
        </div>
      )}

      {product?.m2Count && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Кількість М2</p>

          <p>{product.m2Count}</p>
        </div>
      )}

      {product?.coreCount && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Кількість ядер</p>

          <p>{product.coreCount}</p>
        </div>
      )}

      {product?.withVideo && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Вбудоване відео</p>

          <p>{product.withVideo ? 'Так' : 'Ні'}</p>
        </div>
      )}

      {product?.memoryType && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Тип пам`яті</p>

          <p>{product.memoryType}</p>
        </div>
      )}

      {product?.hddType && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Тип диску</p>

          <p>{product.hddType}</p>
        </div>
      )}

      {product?.formFactor && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Форм-фактор диску</p>

          <p>{product.formFactor}</p>
        </div>
      )}

      {product?.speed && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Об/хв диску</p>

          <p>{product.speed}</p>
        </div>
      )}

      {product?.power && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Потужність</p>

          <p>{product.power}</p>
        </div>
      )}

      {product?.coolerSize && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Розмір кулера</p>

          <p>{product.coolerSize}</p>
        </div>
      )}

      {product?.coolerType && (
        <div className="flex items-center justify-between border-b-2 pb-1">
          <p>Тип охолодження</p>

          <p>{product.coolerType}</p>
        </div>
      )}
    </div>
  );
});
