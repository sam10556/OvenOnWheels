import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../models/Order";
// import { authOption } from "../auth/[...nextauth]/route";
import { isAdmin,authOption } from "@/app/utils/auth";


export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOption);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return Response.json({ error: "Order not found" }, { status: 404 });
      }
      if (admin || order.userEmail === userEmail) {
        return Response.json(order);
      }
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    if (admin) {
      return Response.json(await Order.find());
    }

    if (userEmail) {
      const userOrders = await Order.find({ userEmail });
      console.log(userOrders);
      return Response.json(userOrders);
    }

    return Response.json({ error: "No orders found" }, { status: 404 });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
