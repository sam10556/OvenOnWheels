import mongoose from "mongoose";
import NextAuth from "next-auth";
import {User} from "@/app/models/User"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect"


export const authOption = {
  secret: process.env.SECRET,
  adapter:MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const {email,password} = credentials;

        mongoose.connect(process.env.MONGODB_URL);
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        console.log(passwordOk)
        if(passwordOk){
          return user;
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
