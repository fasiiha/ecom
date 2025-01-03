import Loading from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteImg from "../assets/images/delete.png";
import NotFound from "../assets/images/not-found.jpg";
import { fetchCartItems, removeCartItem } from "../store/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    totalCost: 0,
    totalQuantity: 0,
    tax: 0,
    shippingCost: 10,
    discount: 0,
  });

  // Calculate current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    }
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    const calculateOrderDetails = () => {
      let totalCost = 0;
      let totalQuantity = 0;
      cart.forEach((item) => {
        totalCost += parseInt(item.Product?.price, 10);
        totalQuantity += 1;
      });
      const tax = totalCost * 0.07;
      setOrderDetails({
        totalCost,
        totalQuantity,
        tax,
        shippingCost: orderDetails.shippingCost,
        discount: orderDetails.discount,
      });
    };

    calculateOrderDetails();
  }, [cart]);

  const handleRemoveItem = async (id) => {
    await dispatch(removeCartItem(id));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push("/checkout");
  };

  if (cartStatus === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (cartStatus === "failed") {
    return <div>Error loading cart: {error}</div>;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row lg:mt-14 md:mt-7 max-w-[1400px] w-full mx-auto min-h-screen">
        <div className="flex-1 p-4">
          <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
            Your Cart
          </h1>
          <h2 className="sm:text-xl text-base font-body">
            Not ready to checkout? Continue shopping
          </h2>
          {cart.map((item) => (
            <div
              key={item.id}
              className="md:py-4 py-2 flex sm:flex-row flex-col justify-start max-w-[600px] sm:text-left bg-gray-100 px-5 m-1"
            >
              <Image
                src={
                  item.Product?.images && item.Product?.images.length > 0
                    ? item.Product?.images[0]
                    : NotFound
                }
                alt={item.Product?.product_name}
                width={500}
                height={500}
                className="w-36 h-36"
              />

              <div className="flex-grow sm:pl-8">
                <div className="flex justify-between">
                  {" "}
                  <Link href={`/product/${item.Product?.id}`}>
                    <h2 className="title-font font-semibold font-heading text-2xl text-gray-900">
                      {item.Product?.product_name}
                    </h2>{" "}
                  </Link>
                  <Image
                    onClick={() => handleRemoveItem(item.id)}
                    src={DeleteImg}
                    width={500}
                    height={500}
                    alt="delete"
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <div className="font-body my-2 text-gray-500">
                  Color:
                  <span className="ml-1">{item?.color}</span>
                </div>
                <div className="font-body my-2 text-gray-500">
                  Size:
                  <span className="ml-1">{item?.size}</span>
                </div>
                <div className="font-body text-gray-500">
                  Quantity:
                  <span className="ml-1">{item?.quantity}</span>
                </div>
                <div className="flex justify-between max-w-[350px] w-full mt-3">
                  <div className="sm:text-xl text-lg font-medium font-heading">
                    <span className="text-2xl">$</span>
                    {item.Product?.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 p-4">
          <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading sm:mt-0 mt-14">
            Order Details
          </h1>

          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Order Date: </div>
            <div className="ml-1">{currentDate}</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Product Cost: </div>
            <div className="ml-1">${orderDetails.totalCost}</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Products Quantity: </div>
            <div className="ml-1">{orderDetails.totalQuantity}</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Discount: </div>
            <div className="ml-1">${orderDetails.discount.toFixed(2)}</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Shipping Cost: </div>
            <div className="ml-1">${orderDetails.shippingCost.toFixed(2)}</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 pb-3 border-b border-black flex max-w-[700px] w-full justify-between">
            <div> Tax: </div>
            <div className="ml-1">${orderDetails.tax.toFixed(2)}</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Total Amount: </div>
            <div className="ml-1">
              $
              {orderDetails.totalCost +
                orderDetails.shippingCost +
                orderDetails.tax}
            </div>
          </div>
          {/* <Link href="/checkout"> */}
          <div
            onClick={handleCheckout}
            className="relative mt-8 max-w-[700px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100"
          >
            <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
            <span className="relative sm:text-lg text-base font-body text-center">
              {isLoading ? <Loading /> : "Continue to Checkout"}
            </span>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
