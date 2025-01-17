"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
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
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        cartProducts,
      }),
    });
    const link = await res.json();
    window.location = link;
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
              <div className="flex items-center gap-4 border-b py-4">
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-700 ">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra) => (
                        <div>
                          {extra.name} ₹{extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ₹{cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
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
