

export default function AddToCartButton({
  className,
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      <span>Add To Cart</span>
    </button>
  );
}
