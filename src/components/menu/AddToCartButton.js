import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton targetTop={"5%"} targetLeft={"80%"} src={image}>
          <div onClick={onClick}>Add to cart ₹{basePrice}</div>
        </FlyingButton>
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
