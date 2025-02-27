import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientsPrices } =
    menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);
  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setTimeout(() => {
      setShowPopUp(false);
    }, 1000);
    toast.success("Added To Cart");
  }
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }
  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  function closePopUp() {
    setShowPopUp(false);
  }

  function preventClose(ev) {
    ev.stopPropagation();
  }

  return (
    <>
      {showPopUp && (
        <div
          onClick={closePopUp}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
        >
          <div
            onClick={preventClose}
            className="bg-white p-4 rounded-xl shadow-lg max-w-lg w-full relative"
          >
            <button
              className=" border-none text-2xl p-0 m-0 text-gray-600 hover:text-gray-800"
              onClick={closePopUp}
            >
              ✖
            </button>
            <div className="overflow-y-auto p-4 max-h-[80vh]">
              <Image
                className="mx-auto rounded-lg"
                src={image}
                alt={name}
                width={400}
                height={200}
              />
              <h2 className="text-2xl font-semibold text-center mt-4">
                {name}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-4">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-lg font-medium text-gray-700 text-center mb-2">
                    Pick Your Size
                  </h3>
                  <div className="flex flex-col gap-2">
                    {sizes.map((size) => (
                      <label
                        key={size._id}
                        className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="radio"
                          name="size"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                        />
                        {size.name} ₹{basePrice + size.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {extraIngredientsPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-lg font-medium text-gray-700 text-center mb-2">
                    Any Extras?
                  </h3>
                  <div className="flex flex-col gap-2">
                    {extraIngredientsPrices.map((extraThing) => (
                      <label
                        key={extraThing._id}
                        className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          name={extraThing.name}
                          onChange={(ev) =>
                            handleExtraThingClick(ev, extraThing)
                          }
                          checked={selectedExtras
                            .map((e) => e._id)
                            .includes(extraThing._id)}
                        />
                        {extraThing.name} +₹{extraThing.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="w-full bg-primary text-white py-2 rounded-lg mt-4 hover:bg-red-700 transition"
                onClick={handleAddToCartButtonClick}
              >
                Add To Cart ₹{selectedPrice}
              </button>
              <button
                className="w-full mt-2 text-gray-600 py-2 border rounded-lg hover:bg-gray-100 transition"
                type="button"
                onClick={closePopUp}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
