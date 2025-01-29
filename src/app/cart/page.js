"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment Failed");
      }
    }
  }, []);

  useEffect(() => {
    if (!profileData) return;

    const { phone, streetAddress, city, postalCode, country } = profileData;

    // Check if any address-related field exists
    if (phone || city || postalCode || postalCode || streetAddress) {
      setAddress({
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      });
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (res) => {
        if (res.ok) {
          resolve();
          window.location = await res.json();
        } else {
          reject();
        }
      });
    });
    toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your Shopping Cart Is Empty</p>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                product={product}
                key={index}
                onRemove={removeCartProduct}
              />
            ))}

          <div className="py-2 justify-end items-center pr-16 flex">
            <div className="text-gray-500">
              SubTotal:
              <br />
              Delivery Charges:
              <br />
              Total:
            </div>
            <div className="text-lg font-semibold text-right">
              ₹{subtotal}
              <br />
              ₹100
              <br />₹{subtotal + 100}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ₹{subtotal + 100}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
