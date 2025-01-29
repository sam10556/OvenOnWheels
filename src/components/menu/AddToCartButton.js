

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <button>
          <div onClick={onClick}>Add to cart ₹{basePrice}</div>
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary text-white rounded-full mt-4 px-8 py-2"
    >
      <span>Add To Cart (from ₹{basePrice})</span>
    </button>
  );
}
