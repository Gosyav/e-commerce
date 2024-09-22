import React from 'react';

import Link from 'next/link';
import { SignUpForm } from '~/pagesComponents/SignUpPage/modules/SignUpForm';

import { Container } from '~/ui/Container';

// eslint-disable-next-line react/display-name
const SignUpPage: React.FC = React.memo(() => {
  return (
    <div className="h-full">
      <Container className="mt-4 grid h-full grid-rows-[1fr_min-content] items-stretch gap-4 md:grid-cols-2 md:grid-rows-none">
        <div className="flex flex-col justify-center bg-color-one px-4 py-20">
          <SignUpForm />
        </div>
        <div className="flex flex-col items-center justify-center bg-color-one px-4 py-20">
          <div>
            <p className="text-xl font-semibold">Already registered?</p>

            <Link
              href="/auth/signIn"
              className="mt-4 block rounded-[50px] border-2 border-color-three px-8 py-4 text-center text-color-seven"
            >
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
});

export default SignUpPage;
