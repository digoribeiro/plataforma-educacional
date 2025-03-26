// lib/auth.ts
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        console.log("account", account);
        try {
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          if (existingAccount) return true;
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (existingUser) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refreshToken: account.refresh_token,
                accessToken: account.access_token,
                expiresAt: account.expires_at,
                tokenType: account.token_type,
                scope: account.scope,
              },
            });
          } else {
            await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                emailVerified: new Date(),
                image: profile.picture,
                accounts: {
                  create: {
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    refreshToken: account.refresh_token,
                    accessToken: account.access_token,
                    expiresAt: account.expires_at,
                    tokenType: account.token_type,
                    scope: account.scope,
                  },
                },
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error in Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
