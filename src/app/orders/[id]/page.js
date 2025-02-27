"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CartProduct from "@/components/menu/CartProduct";
import AddressInputs from "@/components/layout/AddressInputs";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrders(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrders(false);
        });
      });
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  return (
    <section className="max-w-2xl mx-auto mt-8 text-center">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks For Your Order</p>
          <p>We Will Call You When Your Order Will On The Way</p>
        </div>
      </div>
      {loadingOrders && <div>Loading Order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:{" "}
              <span className="text-black font-bold inline-block w-12">
                ₹{subtotal}
              </span>
              <br />
              Delivery:{" "}
              <span className="text-black font-bold inline-block w-12">
                ₹50
              </span>
              <br />
              Total:{" "}
              <span className="text-black font-bold inline-block w-12">
                ₹{subtotal + 50}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
