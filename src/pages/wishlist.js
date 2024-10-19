import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteImg from "../assets/images/delete.png";
import NotFound from "../assets/images/not-found.jpg";
import { addCartItem } from "../store/slices/cartSlice";
import {
  fetchWishlistItems,
  removeWishlistItem,
} from "../store/slices/wishlistSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const wishlistStatus = useSelector((state) => state.wishlist.status);
  const error = useSelector((state) => state.wishlist.error);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    } else {
      if (wishlistStatus === "idle") {
        dispatch(fetchWishlistItems(user?.id));
      }
    }
  }, [user, wishlistStatus, dispatch]);

  const handleAddToCart = async (item) => {
    try {
      const result = await dispatch(
        addCartItem({
          product_id: item.Product.id,
          user_id: user?.id,
          quantity: 1,
          color: item.Product?.colors[0],
          size: item.Product?.sizes[0],
        })
      ).unwrap();

      if (result) {
        console.log("Item added to cart successfully!");
        dispatch(removeWishlistItem(item.id));
      } else {
        console.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeWishlistItem(itemId));
  };

  return (
    <div className="max-w-[1400px] flex justify-center  mx-auto h-screen">
      <div className="w-full">
        <div className="flex flex-col p-4 sm:mt-10 mt-3">
          <h1 className="sm:text-6xl text-4xl font-heading mt-4">
            Your Wishlist
          </h1>
          <h2 className="sm:text-lg text-base font-body mt-2 mb-5">
            Not ready to checkout? Continue shopping
          </h2>
          {wishlist?.map((item) => (
            <div
              key={item.id}
              className="md:py-4 py-2 flex sm:flex-row flex-col justify-start sm:text-left max-w-[600px] w-full bg-gray-100 px-5 m-1"
            >
              {/* <img
                alt={item.Product.product_name}
                className="flex-shrink-0 w-36 h-36 object-cover object-center sm:mb-0 mb-4 text-xs"
                src={require(`${item.Product.ProductImages.image_url}`)}
              /> */}
              <Image
                src={
                  item.Product?.images && item.Product?.images.length > 0
                    ? item.Product?.images[0]
                    : NotFound
                }
                alt={item.Product?.product_name}
                width={500}
                height={500}
                className="w-36 h-36 "
              />
              <div className="flex-grow sm:pl-8">
                <div className="flex justify-between">
                  <Link href={`/product/${item.Product?.id}`}>
                    <h2 className="title-font font-semibold font-heading text-2xl text-gray-900">
                      {item.Product?.product_name}
                    </h2>{" "}
                  </Link>
                  <Image
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    src={DeleteImg}
                    width={500}
                    height={500}
                    alt="delete"
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between max-w-[550px] w-full mt-3">
                  <div className="sm:text-xl text-lg font-medium font-heading">
                    <span className="text-2xl">$</span>
                    {item.Product?.price}
                  </div>
                </div>{" "}
                <div
                  onClick={() => handleAddToCart(item)}
                  className="max-w-[120px] flex justify-center text-white bg-[#0047AB] border cursor-pointer mt-3 py-2 px-3 text-sm font-body rounded-lg"
                >
                  Add to Cart
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
