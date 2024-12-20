import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user?.email as string);

        if (!existingGuest)
          await createGuest({
            email: user?.email as string,
            fullName: user?.name as string,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const currentGuest = await getGuest(session.user.email);
      session.user.guestId = currentGuest?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
