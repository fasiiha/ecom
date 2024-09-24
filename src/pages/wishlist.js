import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/slices/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    } else {
      if (cartStatus === "idle") {
        dispatch(fetchCartItems(user?.id));
      }
    }
  }, [user, cartStatus, dispatch]);
  return (
    <div className="flex mx-auto justify-center items-center ">
      <div className="flex-col p-4">
        <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
          Your Wishlist
        </h1>
        <h2 className="sm:text-xl text-base font-body">
          Not ready to checkout? Continue shopping
        </h2>
        {cart.map((item) => (
          <div
            key={item.id}
            className="md:py-4 py-2 flex sm:flex-row flex-col justify-start sm:text-left max-w-[950px] w-full"
          >
            {/* <img
                alt={item.Product.product_name}
                className="flex-shrink-0 w-36 h-36 object-cover object-center sm:mb-0 mb-4 text-xs"
                src={require(`${item.Product.ProductImages.image_url}`)}
              /> */}
            <img
              alt={item.Product?.product_name}
              className="flex-shrink-0 w-36 h-36 object-cover object-center sm:mb-0 mb-4 text-xs"
              src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
            />
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-semibold font-heading text-2xl text-gray-900">
                {item.Product?.product_name}
              </h2>

              <div className="font-body my-2 text-gray-500">
                Color:
                <span className="ml-1">{item?.Product?.color}</span>
              </div>
              <div className="font-body text-gray-500">
                Quantity:
                <span className="ml-1">{item?.Product?.stock_quantity}</span>
              </div>
              <div className="flex justify-between max-w-[550px] w-full mt-3">
                <div className="sm:text-xl text-lg font-medium font-heading">
                  <span className="text-2xl">$</span>
                  {item.Product?.price}
                </div>
                <div
                  onClick={() => handleRemoveItem(item.id)}
                  className="flex justify-end text-accent border-accent border cursor-pointer py-1 px-2"
                >
                  Add to Cart
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
