import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { supabaseAdmin } from "../../../../utils/supabase";

// Define the auth options but don't export them directly from the file
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Generate with: `openssl rand -base64 32`
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        // Check if the user exists in your Supabase database
        const { data, error } = await supabaseAdmin!
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
      } catch (error) {
        console.error("Error checking user authorization:", error);
        return false; // Fail closed for security
      }
    },
    async session({ session }) {
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

// Create the handler using the auth options
const handler = NextAuth(authOptions);

// Export the handler functions directly
export { handler as GET, handler as POST };
