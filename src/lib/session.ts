import { getServerSession } from "next-auth/next";
import { NextAuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "../graphql/methods";
import { SessionInterface, UserProfile } from "@/common/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: process.env.ISSUER_URL!,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async session({ session }): Promise<SessionInterface | Session> {
      try {
        const email = session?.user?.email as string;

        const data = (await getUser(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data.user!,
          },
        };
        return newSession;
      } catch (error) {
        return session;
      }
    },

    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExists.user) {
          const res = await createUser({
            name: user?.name as string,
            email: user?.email as string,
            avatarUrl: user?.image as string,
          });
        }

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentServerSession(): Promise<SessionInterface> {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
