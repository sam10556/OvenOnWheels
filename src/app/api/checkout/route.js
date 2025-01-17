import mongoose from "mongoose";
const stripe = require('stripe')()

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();


}
