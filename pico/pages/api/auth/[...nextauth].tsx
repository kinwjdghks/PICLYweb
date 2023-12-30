import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages:{
    signIn: '/Login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  }
});

export { handler as GET, handler as POST }