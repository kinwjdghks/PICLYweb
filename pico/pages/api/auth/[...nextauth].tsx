// import { NextApiHandler } from "next";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { FirestoreAdapter } from "@next-auth/firebase-adapter"
// import { firebaseConfig } from "@/lib/firebase/firebase";

// //초기화
// const authHandler: NextApiHandler = (req, res) =>
//   NextAuth(req, res, {
//     providers: [
//       //구글 provider 정의
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//     ],
//     callbacks: {
//       async signIn({ user, account, profile, email, credentials }) {
//         const isAllowedToSignIn = true;

//         console.log(user);
//         console.log(account);
//         console.log(profile);
//         console.log(email);
//         console.log(credentials);

//         if (isAllowedToSignIn) {
//           return true;
//         } else {
//           // Return false to display a default error message
//           return false;
//           // Or you can return a URL to redirect to:
//           // return '/unauthorized'
//         }
//       },
//     },
//     adapter: FirestoreAdapter(firebaseConfig),
// });

// export default authHandler;
