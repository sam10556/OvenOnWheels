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

  return (
    <section className="mt-8 px-4 md:px-12 lg:px-24">
      <div className="text-center mb-6">
        <SectionHeaders mainHeader="Your Cart" />
      </div>
      {cartProducts?.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-12">
          Your Shopping Cart is Empty
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {cartProducts?.length > 0 &&
              cartProducts.map((product, index) => (
                <CartProduct
                  key={index}
                  product={product}
                  index={index} // Pass the index to the CartProduct component
                  onRemove={removeCartProduct}
                />
              ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Delivery Charges:</span>
                <span className="font-semibold">₹100</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-2">
                <span>Total:</span>
                <span>₹{subtotal + 100}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={proceedToCheckout} className="space-y-4">
              <AddressInputs
                addressProps={address}
                setAddressProps={handleAddressChange}
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                Pay ₹{subtotal + 100}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
