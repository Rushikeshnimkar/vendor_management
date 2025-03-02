import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { supabaseAdmin } from "../../../../utils/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Generate with: `openssl rand -base64 32`
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      // Check if the user exists in your Supabase database
      const { data, error } = await supabaseAdmin
        .from("authorized_users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (error || !data) {
        console.log(`User ${user.email} not authorized`);
        return false;
      }

      console.log(`User ${user.email} authorized`);
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/pages/signin",
    error: "/pages/error", // Error code passed in query string as ?error=
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
