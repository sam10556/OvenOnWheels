import {Order} from "../../models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("Missing Stripe signature");
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event;
  try {
    const reqBuffer = await req.text();

    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);

  } catch (error) {
    console.error("Error verifying Stripe webhook:", error.message);
    return new Response("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";

    if (isPaid) {
      try {
        const result = await Order.updateOne({ _id: orderId }, { paid: true });
        console.log("Order update result:", result);
      } catch (err) {
        console.error("Error updating order:", err);
        return new Response("Order update error", { status: 500 });
      }
    }
  }

  return new Response("ok", { status: 200 });
}
