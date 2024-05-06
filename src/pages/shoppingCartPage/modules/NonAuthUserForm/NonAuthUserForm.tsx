import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Link from 'next/link';

import { useProductsStore } from '~/shared/store';

import { Input } from '~/ui/Input';

type Props = {
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  adress: string;
};

// eslint-disable-next-line react/display-name
export const NonAauthUserForm: React.FC<Props> = React.memo(
  ({ setIsSuccess }) => {
    const { handleSubmit, control, formState } = useForm<Inputs>();

    const clearShoppingCart = useProductsStore(
      (state) => state.clearShoppingCart,
    );

    const onSubmit: SubmitHandler<Inputs> = () => {
      setIsSuccess(true);
      clearShoppingCart();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'Обов`язково' }}
            render={({ field }) => (
              <Input
                labelText="Ім`я"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder="Ваше ім`я"
                error={formState.errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Обов`язково' }}
            render={({ field }) => (
              <Input
                labelText="Прізвище"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.lastName?.message}
                placeholder="Ваше прізвище"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Обов`язково',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Некоректний формат',
              },
            }}
            render={({ field }) => (
              <Input
                labelText="Ел. Пошта"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.email?.message}
                placeholder="Електрона пошта"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Обов`язково',
              pattern: {
                value: /^\+380-\d{2}-\d{3}-\d{2}-\d{2}$/,
                message: 'Некоректний формат',
              },
            }}
            render={({ field }) => (
              <Input
                labelText="Телефон"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.phone?.message}
                placeholder="+380-00-000-00-00"
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            rules={{ required: 'Обов`язково' }}
            render={({ field }) => (
              <Input
                labelText="Місто"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.city?.message}
                placeholder="Місто"
              />
            )}
          />

          <Controller
            name="adress"
            control={control}
            rules={{ required: 'Обов`язково' }}
            render={({ field }) => (
              <Input
                labelText="Адреса"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.adress?.message}
                placeholder="Aдреса"
              />
            )}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button className="rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-white">
            Оформити замовлення
          </button>

          <Link
            href="/"
            className="block rounded-[50px] border-2 border-color-five px-8 py-3 text-center"
          >
            Продовжити покупки
          </Link>
        </div>
      </form>
    );
  },
);
