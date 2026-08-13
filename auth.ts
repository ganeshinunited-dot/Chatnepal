import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { verifyEmailLoginCode } from '@/lib/services/email-otp-service';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // DigitalOcean terminates TLS at its proxy and probes the service through
  // an internal localhost host. Auth.js must trust that reverse-proxy host
  // for the platform health check to reach the app successfully.
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  // Credentials-based OTP sign-in requires a JWT-backed session. Google accounts
  // continue to be stored through the Prisma adapter, while all sessions are signed.
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET,
      // Google reports whether it verified ownership of the Gmail address. Linking
      // only this verified provider prevents a duplicate ChatNP user for the same email.
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        if (!profile.email || !profile.email_verified) {
          throw new Error('Google must provide a verified email address.');
        }

        return {
          id: profile.sub,
          name: profile.name || profile.email.split('@')[0],
          email: profile.email.trim().toLowerCase(),
          image: profile.picture,
        };
      },
    }),
    Credentials({
      id: 'email-otp',
      name: 'Email code',
      credentials: {
        email: { label: 'Email', type: 'email' },
        code: { label: 'Code', type: 'text' },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === 'string' ? credentials.email : '';
        const code = typeof credentials?.code === 'string' ? credentials.code : '';

        try {
          const user = await verifyEmailLoginCode({ email, code });
          if (!user) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error('Email OTP authorization failed', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/chat',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as typeof session.user & { id: string }).id = token.sub;
      }
      return session;
    },
  },
});
