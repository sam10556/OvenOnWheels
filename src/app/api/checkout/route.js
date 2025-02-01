import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../models/Order";
// import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { authOption } from "@/app/utils/auth";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { MenuItem } from "../../models/MenuItem";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOption);
  const userEmail = session?.user?.email;
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];

  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    if (!productInfo) {
      throw new Error(`Product with ID ${cartProduct._id} not found.`);
    }

    let productPrice = productInfo.basePrice;
    if (productInfo.sizes && cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size.id.toString() === cartProduct.size._id.toString()
      );
      if (size) productPrice += size.price;
    }

    if (productInfo.extraIngredientPrices && cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const extraThingInfo = productInfo.extraIngredientPrices.find(
          (extra) =>
            extra.id.toString() === cartProductExtraThing._id.toString()
        );
        if (extraThingInfo) productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "INR",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "INR" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
