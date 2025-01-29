"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import dbTimeForHuman from "@/libs/dateTime";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();
  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={`${
                      order.paid ? "bg-green-500" : "bg-red-400"
                    } p-2 rounded-md text-white w-24 text-center`}
                  >
                    {order.paid ? "Paid" : "Not Paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                    <div className="text-gray-500">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>

                  <div className="text-gray-500 text-xs">
                    Menu Items:{" "}
                    {order.cartProducts?.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              <div className="justify-end text-right flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show Order
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-3xl text-gray-500 mt-4">
            No orders found
          </div>
        )}
      </div>
    </section>
  );
}
