import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";
export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
<div className="p-6 rounded-2xl mx-2 text-center border md:border-none border-gray-300 shadow-lg md:shadow-none shadow-black/10">
  {/* Image Container with Button Overlay */}
  <div className="relative w-full group">
    <Image
      src={image}
      width={400}
      height={400}
      alt={name}
      className="w-full h-auto rounded-lg object-cover"
    />

    <div className="hidden md:flex absolute inset-0 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
        className="bg-primary text-white w-1/3 py-2 rounded-lg shadow-md hover:bg-primary/90 transition duration-300 "
      />
    </div>
  </div>

  {/* Name & Price in One Row */}
  <div className="mt-6 flex justify-between items-center">
    <h4 className="font-bold text-lg text-center md:text-start text-primary font-hlo">{name}</h4>
    {/* Price Hidden on Mobile, Button Replaces It */}
    <h4 className="font-bold text-lg text-primary font-hlo">
      ₹{basePrice}
    </h4>
  </div>

  {/* Description Below */}
  <p className="text-gray-500 text-sm mt-2 text-justify leading-tight font-ibm">{description}</p>

  {/* Button Below Price in Mobile */}
  <div className="mt-4 sm:hidden">
    <AddToCartButton
      hasSizesOrExtras={hasSizesOrExtras}
      onClick={onAddToCart}
      basePrice={basePrice}
      image={image}
      className="bg-primary text-white w-full py-2 rounded-lg shadow-md hover:bg-primary/90 transition duration-300"
    />
  </div>
</div>



  );
}
