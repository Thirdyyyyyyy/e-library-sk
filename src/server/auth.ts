import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { env } from "~/env.mjs";
import { prisma } from '~/server/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkHashedPassword } from './api/routers/users/shared/passwordHandling/passwordHandling';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      hasAdminAccess: boolean;
      hasCMAccess: boolean;
      // ...other properties
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // session({ session, ...rest }) {
    //   if (rest.token?.sub) {
    //     session.user = {
    //       ...session.user,
    //       id: rest.token.sub,
    //     };
    //   }
    //   return session;
    // },
    session({ session, token }) {
      try {
        if (token?.sub) {
          session.user = {
            ...session.user,
            id: token.sub,
          };
        }
        return session;
      } catch (error) {
        console.error('Error during session callback:', error);
        throw new Error('Error while processing session.');
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        const checkIfPasswordIsCorrect = await checkHashedPassword(
          credentials?.password ?? '',
          user?.password ?? ''
        );

        if (user && checkIfPasswordIsCorrect) {
          const userData: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
          } = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            // ...other properties
          };
          return userData;
        } else {
          return null; // Return null instead of throwing an error for unauthenticated response
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/',
  },
  debug: true,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
