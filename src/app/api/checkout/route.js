import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../models/Order";
import { MenuItem } from "../../models/MenuItem";
import { authOption } from "@/app/utils/auth";
const stripe = require("stripe")(process.env.STRIPE_SK);

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

    let productPrice = productInfo.basePrice || 0;

    if (productInfo.sizes?.length && cartProduct.size?._id) {
      const size = productInfo.sizes.find(
        (s) => s.id?.toString() === cartProduct.size._id?.toString()
      );
      if (size?.price) productPrice += size.price;
    }

    if (
      productInfo.extraIngredientsPrices?.length &&
      cartProduct.extras?.length
    ) {
      for (const extra of cartProduct.extras) {
        const matchedExtra = productInfo.extraIngredientsPrices.find(
          (e) => e.id?.toString() === extra._id?.toString()
        );
        if (matchedExtra?.price) {
          productPrice += matchedExtra.price;
        }
      }
    }

    const productName = cartProduct.name;
    let detailedName = productName;

    if (cartProduct.size?.name) {
      detailedName += ` (${cartProduct.size.name})`;
    }
    if (cartProduct.extras?.length) {
      const extrasList = cartProduct.extras.map((e) => e.name).join(", ");
      detailedName += ` + ${extrasList}`;
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "INR",
        product_data: {
          name: detailedName,
        },
        unit_amount: Math.round(productPrice * 100),
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
          fixed_amount: { amount: 10000, currency: "INR" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
