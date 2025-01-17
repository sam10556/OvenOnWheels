import AddToCartButton from "@/components/menu/AddToCartButton";
export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-lg hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src={image} alt="Pizza-1" className="max-h-32 block mx-auto"></img>
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 tet-sm line-clamp-3 ">{description}</p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
}
