import Loading from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import greenTick from "../assets/images/greentick.png";
import NotFound from "../assets/images/not-found.jpg";
import { fetchCartItems } from "../store/slices/cartSlice";
import { addOrderItem } from "../store/slices/orderSlice";
import {
  addShippingAddressItem,
  fetchShippingAddressItems,
} from "../store/slices/shippingAddressSlice";
import { getUserDetails } from "../store/slices/userSlice";

export default function Checkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState("shipping");
  const [shippingAddress, setShippingAddress] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    postal_code: "",
  });
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const address = useSelector((state) => state.address.items);
  const [isLoading, setIsLoading] = useState(false);
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const [userInfo, setUserInfo] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    totalCost: 0,
    totalQuantity: 0,
    tax: 0,
    shippingCost: 10,
    discount: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const handlePayment = () => {
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 14);

    const formattedEstimatedDeliveryDate =
      estimatedDeliveryDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    setIsLoading(true);
    dispatch(
      addOrderItem({
        user_id: user?.id,
        address_id: shippingAddress?.id,
        estimated_delivery_date: formattedEstimatedDeliveryDate,
        total_amount: orderDetails.totalCost,
        orderitems: cart,
      })
    );
    setIsLoading(false);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (user?.id) {
      const fetchAddressInfo = async () => {
        const data = await dispatch(fetchShippingAddressItems(user?.id));
        if (data.payload) {
          setShippingAddress(data.payload.data);
        }
      };

      fetchAddressInfo();
    } else {
      router.push("/login");
    }
  }, [user?.id, dispatch, router]);

  useEffect(() => {
    if (user?.id) {
      const fetchUserInfo = async () => {
        const data = await dispatch(getUserDetails(user.id));
        setUserInfo(data);
      };

      fetchUserInfo();
    }
  }, [user?.id, dispatch]);

  const handleContinue = () => {
    setIsLoading(true);
    dispatch(addShippingAddressItem({ ...shippingAddress, user_id: user.id }));
    setIsLoading(false);
    setStep("payment");
  };

  useEffect(() => {
    const calculateOrderDetails = () => {
      let totalCost = 0;
      let totalQuantity = 0;

      const selectedCartItems = cart.filter((item) => item.selected);
      selectedCartItems.forEach((item) => {
        totalCost += parseInt(item.Product?.price, 10);
        totalQuantity += 1;
      });

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

  const handleBack = () => {
    setStep("shipping");
  };
  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    } else {
      router.push("/login");
    }
  }, [user, dispatch, router]);

  if (cartStatus === "failed") {
    return <div>Error loading cart: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row lg:mt-14 md:mt-7 max-w-[1400px] w-full mx-auto">
      <div className="flex-1 p-4">
        <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading sm:mt-0 mt-14">
          Checkout
        </h1>
        {step === "shipping" ? (
          <>
            <h2 className="sm:text-xl text-base font-body">
              Shipping Information
            </h2>
            <div className="mt-8 font-body">
              <div className="flex">
                <input
                  name="firstName"
                  value={userInfo?.payload.data.first_name}
                  disabled={true}
                  className="border-2 border-gray-500 bg-white h-12 px-3 sm:w-64 w-full focus:outline-none"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={userInfo?.payload.data.last_name}
                  disabled={true}
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-64 w-full focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <input
                name="email"
                value={userInfo?.payload.data.email}
                disabled={true}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="email"
                placeholder="Email"
              />
              <input
                name="phone"
                value={userInfo?.payload.data.phone_number}
                disabled={true}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="number"
                placeholder="Phone Number"
              />
              <input
                name="address_line1"
                value={shippingAddress.address_line1 || ""}
                onChange={handleChange}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="text"
                placeholder="Address"
              />
              <input
                name="address_line2"
                value={shippingAddress.address_line2 || ""}
                onChange={handleChange}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="text"
                placeholder="Apartment, suite, etc (optional)"
              />
              <div className="flex mt-2">
                <input
                  name="city"
                  value={shippingAddress.city || ""}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="City"
                />
                <input
                  name="country"
                  value={shippingAddress.country || ""}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="Country"
                />
                <input
                  name="postal_code"
                  value={shippingAddress.postal_code || ""}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div
              onClick={handleContinue}
              className="relative mt-8 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
              <span className="relative sm:text-lg text-base font-body text-center">
                Continue to Payment
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex font-body justify-between sm:w-[520px] w-full">
              <h2 className="sm:text-xl text-base ">Payment Details</h2>
              <div
                onClick={handleBack}
                className="cursor-pointer flex items-center group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="sm:h-7 h-4 sm:w-7 w-4 mr-1"
                >
                  <path
                    d="M6 12H18M6 12L11 7M6 12L11 17"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="relative text-black sm:text-base text-sm">
                  Back to Shipping
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </span>
              </div>
            </div>

            <div className="mt-8 font-body">
              <input
                className="border-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="text"
                placeholder="Card Number"
              />
              <div className="flex mt-2">
                <input
                  className="border-2 border-gray-500 bg-white h-12 px-3 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="Month"
                />
                <input
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="Year"
                />
                <input
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="CVV"
                />
              </div>
              <input
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="text"
                placeholder="Cardholder Name"
              />
              <Link href="/checkout">
                <div
                  className="relative mt-8 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100"
                  onClick={handlePayment}
                >
                  <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                  <span className="relative sm:text-lg text-base font-body text-center">
                    {isLoading ? <Loading /> : "Pay Now"}
                  </span>
                </div>
              </Link>
            </div>
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg text-center">
                  <div className="flex items-center justify-center mx-auto pb-5 pt-2">
                    <Image
                      width={50}
                      height={50}
                      src={greenTick}
                      alt="successful"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-body font-semibold">
                      Payment Successful
                    </h2>
                    <p className="mt-2 text-gray-600 font-body">
                      Your payment was successful. Your order will be processed
                      shortly.
                    </p>
                    <Link href="/">
                      <button className="font-body mt-4 bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white px-6 py-2 rounded-md">
                        Go to Homepage
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
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
                <h2 className="title-font font-semibold font-heading text-2xl text-gray-900">
                  {item.Product?.product_name}
                </h2>
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
        <div className="font-body  md:text-lg text-base mt-2 flex max-w-[600px] w-full justify-between">
          <div> Order Date: </div>
          <div className="ml-1">{currentDate}</div>
        </div>
        <div className="font-body  md:text-lg text-base mt-2 flex max-w-[600px] w-full justify-between">
          <div> Product Cost: </div>
          <div className="ml-1">${orderDetails.totalCost}</div>
        </div>
        <div className="font-body  md:text-lg text-base mt-2 flex max-w-[600px] w-full justify-between">
          <div> Products Quantity: </div>
          <div className="ml-1">{orderDetails.totalQuantity}</div>
        </div>
        <div className="font-body  md:text-lg text-base mt-2 flex max-w-[600px] w-full justify-between">
          <div> Discount: </div>
          <div className="ml-1">${orderDetails.discount.toFixed(2)}</div>
        </div>
        <div className="font-body  md:text-lg text-base mt-2 flex max-w-[600px] w-full justify-between">
          <div> Shipping Cost: </div>
          <div className="ml-1">${orderDetails.shippingCost.toFixed(2)}</div>
        </div>
        <div className="font-body  md:text-lg text-base mt-2 pb-3 border-b border-black flex max-w-[600px] w-full justify-between">
          <div> Tax: </div>
          <div className="ml-1">${orderDetails.tax.toFixed(2)}</div>
        </div>
        <div className="font-body  md:text-lg text-base mt-2 flex max-w-[600px] w-full justify-between">
          <div> Total Amount: </div>
          <div className="ml-1">
            $
            {orderDetails.totalCost +
              orderDetails.shippingCost +
              orderDetails.tax}
          </div>
        </div>
      </div>
    </div>
  );
}
