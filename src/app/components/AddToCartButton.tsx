// components/AddToCartButton.tsx
"use client"; // This ensures the component is only rendered on the client side

import { useCart } from "../../../context/CartContex";
import { IoCartOutline } from "react-icons/io5";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-[212px] h-[63px] bg-[#029FAE] rounded-lg py-[14px] px-[24px] text-white flex gap-4 items-center transform duration-500  active:bg-[white] active:text-[#029FAE]">
      <IoCartOutline className="w-[29px] h-[29px]" />
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image,
          })
        }
        className="text-[20px] leading-[22px]"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
