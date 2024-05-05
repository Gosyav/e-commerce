import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '~/ui/Input';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  adress: string;
};

// eslint-disable-next-line react/display-name
export const NonAauthUserForm: React.FC = React.memo(() => {
  const { handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('1');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        // rules={{ required: 'Обов`язково' }}
        rules={{
          pattern: {
            value: /^[A-Za-z]+$/,
            message: '',
          },
        }}
        render={({ field }) => (
          <Input
            labelText="Ім`я"
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
          />
        )}
      />
    </form>
  );
});
