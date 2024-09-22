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
  address: string;
};

// eslint-disable-next-line react/display-name
export const NonAuthUserForm: React.FC<Props> = React.memo(
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
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <Input
                labelText="First Name"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder="Your first name"
                error={formState.errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <Input
                labelText="Last Name"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.lastName?.message}
                placeholder="Your last name"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid format',
              },
            }}
            render={({ field }) => (
              <Input
                labelText="Email"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.email?.message}
                placeholder="Email address"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: /^\+380-\d{2}-\d{3}-\d{2}-\d{2}$/,
                message: 'Invalid format',
              },
            }}
            render={({ field }) => (
              <Input
                labelText="Phone"
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
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <Input
                labelText="City"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.city?.message}
                placeholder="City"
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <Input
                labelText="Address"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.address?.message}
                placeholder="Address"
              />
            )}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button className="rounded-[50px] border-2 border-color-three bg-color-three px-8 py-3 text-white">
            Place Order
          </button>

          <Link
            href="/"
            className="block rounded-[50px] border-2 border-color-five px-8 py-3 text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </form>
    );
  },
);
