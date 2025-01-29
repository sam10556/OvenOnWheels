import { User } from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();
  const pass = body.password;

  try {
    if (!pass?.length || pass.length < 5) {
    }
    const notHashedPass = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPass, salt);
    const createdUser = await User.create(body);
    return new Response(JSON.stringify(createdUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
