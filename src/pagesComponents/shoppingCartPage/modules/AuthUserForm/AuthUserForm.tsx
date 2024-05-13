import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useSession } from 'next-auth/react';
import { api } from '~/trpc/react';

import { useProductsStore } from '~/shared/store';

import { Input } from '~/ui/Input';

type Inputs = {
  adress: string | undefined;
  city: string | undefined;
};

// eslint-disable-next-line react/display-name
export const AuthUserForm: React.FC = React.memo(() => {
  const { data } = useSession();
  const orderCreateMutation = api.order.create.useMutation();
  const { handleSubmit, formState, control } = useForm<Inputs>();

  const productsInShoppingCart = useProductsStore(
    (state) => state.productsInShoppingCart,
  );

  const clearShoppingCart = useProductsStore(
    (state) => state.clearShoppingCart,
  );

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    orderCreateMutation
      .mutateAsync({
        userId: data?.user.id ?? '',
        products: JSON.stringify(productsInShoppingCart),
        adress: (formData.adress ?? data?.user.adress)!,
        city: (formData.city ?? data?.user.city)!,
      })
      .then(() => clearShoppingCart())
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Controller
          name="adress"
          control={control}
          render={({ field }) => (
            <Input
              labelText="Адреса"
              value={field.value!}
              onChange={(event) => field.onChange(event.target.value)}
              placeholder="Адреса"
              error={formState.errors.adress?.message}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              labelText="Місто"
              value={field.value!}
              onChange={(event) => field.onChange(event.target.value)}
              error={formState.errors.city?.message}
              placeholder="Місто"
            />
          )}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button className="rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-white">
          Оформити замовлення
        </button>
      </div>
    </form>
  );
});
