import React from 'react';
import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';

type Inputs = {
  adress: string;
  city: string;
};

// eslint-disable-next-line react/display-name
export const AuthUserForm: React.FC = React.memo(() => {
  const { handleSubmit, control } = useForm<Inputs>();

  return <form>1</form>;
});
