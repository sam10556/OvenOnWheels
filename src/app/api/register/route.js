import { User } from "../../models/User";
import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect("mongodb+srv://Admin:eQUYIeeTKNrcrt4Z@pizza.rh9vz.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Database connection failed");
  }
}

export async function POST(req) {
  await connectToDatabase();

  const body = await req.json();
  const pass = body.password;

  try {
    if(!pass?.length || pass.length <5){

    }
    const notHashedPass = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPass,salt);

    const createdUser = await User.create(body);
    return new Response(JSON.stringify(createdUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
