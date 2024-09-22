'use client';

import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';

import { Input } from '~/ui/Input';

type Inputs = {
  email: string;
  password: string;
};

// eslint-disable-next-line react/display-name
export const SignInForm: React.FC = React.memo(() => {
  const { handleSubmit, control, formState, setError } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/profile',
    }).catch(() =>
      setError('root', {
        message: 'Check your login credentials',
      }),
    );
  };

  return (
    <div className="relative">
      {formState.errors && formState.errors.root?.message && (
        <p className="absolute text-color-eight">
          {formState.errors.root?.message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="flex flex-col gap-4">
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
            name="password"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field }) => (
              <Input
                labelText="Password"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                error={formState.errors.password?.message}
                placeholder="Password"
                type="password"
              />
            )}
          />
        </div>

        <button className="mt-4 block w-full rounded-[50px] border-2 border-color-three bg-color-three px-8 py-4 text-center text-white">
          Sign In
        </button>
      </form>
    </div>
  );
});
