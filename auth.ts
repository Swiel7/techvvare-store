import { loginSchema } from '@/lib/validations';
import NextAuth from 'next-auth';
import { compare } from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/lib/services/user.service';
import { authRoutes, protectedRoutes } from '@/lib/routes';
import { TAuthenticatedUser } from '@/types';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validationResult = loginSchema.safeParse(credentials);

        if (validationResult.success) {
          const { email, password } = validationResult.data;

          const userFromDb = await getUserByEmail(email);
          if (!userFromDb || !userFromDb.password) return null;

          const isPasswordValid = await compare(password, userFromDb.password);

          if (isPasswordValid) {
            const { id, firstName, lastName, email, role } = userFromDb as TAuthenticatedUser;

            return { id, firstName, lastName, email, role };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === 'update' && session?.user) {
        return { ...token, ...session.user };
      }

      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      if (user?.firstName) token.firstName = user.firstName;
      if (user?.lastName) token.lastName = user.lastName;

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
    authorized({ request, auth }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;

      if (!isLoggedIn && protectedRoutes.some((r) => r.test(nextUrl.pathname))) return false;

      if (isLoggedIn && authRoutes.some((r) => r.test(nextUrl.pathname)))
        return Response.redirect(new URL('/', nextUrl));

      return true;
    },
  },
});
