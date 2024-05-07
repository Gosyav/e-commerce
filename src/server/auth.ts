import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import { env } from '~/env';
import { db } from '~/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    phone: string;
    city: string;
    adress: string;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      phone: string;
      city: string;
      adress: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    adress: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token }) => {
      return token;
    },
    session: ({ session, token }) => {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        phone: token.phone,
        city: token.city,
        adress: token.adress,
      };

      return session;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Ел. Пошта', type: 'text' },
        password: { label: 'Пароль', type: 'text' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password!,
        );

        if (!passwordMatch) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...normalizedUser } = user;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          adress: user.adress,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
