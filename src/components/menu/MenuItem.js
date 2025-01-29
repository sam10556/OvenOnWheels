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
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={preventClose}
            className="bg-white p-2 my-8 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                className="mx-auto"
                src={image}
                alt={name}
                width={400}
                height={200}
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm">{description}</p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-600">Pick Your Size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-1 p-2 rounded-md mb-1 text-gray-500"
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
              )}
              {extraIngredientsPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-600">Any Extras?</h3>
                  {extraIngredientsPrices.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-1 p-2 rounded-md mb-1 text-gray-500"
                    >
                      <input
                        type="checkbox"
                        name={extraThing.name}
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                      />
                      {extraThing.name} +₹{extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <button>
                <div
                  className="primary sticky bottom-2"
                  onClick={handleAddToCartButtonClick}
                >
                  Add To Cart ₹{selectedPrice}
                </div>
              </button>
              <button
                className="mt-2 border-0"
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
