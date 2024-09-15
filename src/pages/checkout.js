import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/slices/cartSlice";
import { addShippingAddressItem } from "../store/slices/shippingAddressSlice";
import { getUserDetails } from "../store/slices/userSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const [step, setStep] = useState("shipping");
  const [shippingAddress, setShippingAddress] = useState({
    phone_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    postal_code: "",
  });
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(getUserDetails(user.id));
  });
  console.log(user);
  const handleContinue = () => {
    dispatch(addShippingAddressItem({ ...shippingAddress, user_id: user.id }));
    setStep("payment");
  };

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
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    } else {
      if (cartStatus === "idle") {
        dispatch(fetchCartItems(user?.id));
      }
    }
  }, [user, cartStatus, dispatch]);

  if (cartStatus === "loading") {
    return <div>Loading your cart...</div>;
  }

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
                  value={shippingAddress.firstName}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 sm:w-64 w-full focus:outline-none"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-64 w-full focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <input
                name="email"
                value={shippingAddress.email}
                onChange={handleChange}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="email"
                placeholder="Email"
              />
              <input
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="number"
                placeholder="Phone Number"
              />
              <input
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="text"
                placeholder="Address"
              />
              <input
                name="apartment"
                value={shippingAddress.apartment}
                onChange={handleChange}
                className="border-2 mt-2 border-gray-500 bg-white h-12 px-3 sm:w-[520px] w-full focus:outline-none"
                type="text"
                placeholder="Apartment, suite, etc (optional)"
              />
              <div className="flex mt-2">
                <input
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="City"
                />
                <input
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="Country"
                />
                <input
                  name="zipcode"
                  value={shippingAddress.zipcode}
                  onChange={handleChange}
                  className="border-2 border-gray-500 bg-white h-12 px-3 ml-2 sm:w-[168px] w-full focus:outline-none"
                  type="text"
                  placeholder="Zipcode"
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
                <div class="relative mt-8 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100">
                  <span class="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                  <span class="relative sm:text-lg text-base font-body text-center">
                    Pay Now
                  </span>
                </div>
              </Link>
            </div>
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
            className="md:py-4 py-2 flex sm:flex-row flex-col justify-start sm:text-left"
          >
            <img
              alt="order"
              className="flex-shrink-0 w-36 h-36 object-cover object-center sm:mb-0 mb-4"
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
              <div className="flex justify-between max-w-[350px] w-full mt-3">
                <div className="sm:text-xl text-lg font-medium font-heading">
                  <span className="text-2xl">$</span>
                  {item.Product?.price}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="font-body md:text-lg text-base md:mt-10 mt-5 flex max-w-[700px] w-full justify-between">
          <div> Order Number: </div>
          <div className="ml-1">#123456789</div>
        </div>
        <div className="font-body md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
          <div> Order Date: </div>
          <div className="ml-1">August 21, 2024</div>
        </div>
        <div className="font-body md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
          <div> Product Cost: </div>
          <div className="ml-1">$79.99</div>
        </div>
        <div className="font-body md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
          <div> Discount: </div>
          <div className="ml-1">$0</div>
        </div>
        <div className="font-body md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
          <div> Shipping Cost: </div>
          <div className="ml-1">$10</div>
        </div>
        <div className="font-body md:text-lg text-base mt-2 pb-3 border-b border-black flex max-w-[700px] w-full justify-between">
          <div> Tax: </div>
          <div className="ml-1">$5.59</div>
        </div>
        <div className="font-body md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
          <div> Total Amount: </div>
          <div className="ml-1">$95</div>
        </div>
      </div>
    </div>
  );
}
