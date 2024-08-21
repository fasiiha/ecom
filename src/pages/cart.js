import Link from "next/link";
export default function Cart() {
  return (
    <>
      <div className="flex flex-col md:flex-row lg:mt-14 md:mt-7 max-w-[1400px] w-full  mx-auto">
        <div className="flex-1 p-4">
          <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
            Your Cart
          </h1>
          <h2 className="sm:text-xl text-base font-body">
            Not ready to checkout? Continue shopping
          </h2>
          <div className="md:py-4 py-2 flex sm:flex-row flex-col justify-start  sm:text-left">
            <img
              alt="order"
              className="flex-shrink-0 w-36 h-36 object-cover object-center sm:mb-0 mb-4"
              src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
            />
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-semibold font-heading text-2xl text-gray-900">
                Elegant Sterling Silver Ring
              </h2>

              <div className="font-body my-2 text-gray-500">
                Color:
                <span className="ml-1">Silver</span>
              </div>
              <div className="font-body text-gray-500">
                Quantity:
                <span className="ml-1">2</span>
              </div>
              <div className="flex justify-between max-w-[350px] w-full mt-3">
                <div className="sm:text-xl text-lg font-medium font-heading">
                  <span className="text-2xl">$</span>
                  159.98
                </div>
                <div className="flex justify-end text-accent border-accent border cursor-pointer py-1 px-2">
                  remove
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading sm:mt-0 mt-14">
            Order Details
          </h1>
          <div className="font-body md:text-lg text-base md:mt-10 mt-5 flex max-w-[700px] w-full justify-between">
            <div> Order Number: </div>
            <div className="ml-1">#123456789</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Order Date: </div>
            <div className="ml-1">August 21, 2024</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Product Cost: </div>
            <div className="ml-1">$79.99</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Discount: </div>
            <div className="ml-1">$0</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Shipping Cost: </div>
            <div className="ml-1">$10</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 pb-3 border-b border-black flex max-w-[700px] w-full justify-between">
            <div> Tax: </div>
            <div className="ml-1">$5.59</div>
          </div>
          <div className="font-body  md:text-lg text-base mt-2 flex max-w-[700px] w-full justify-between">
            <div> Total Amount: </div>
            <div className="ml-1">$95</div>
          </div>
          <Link href="/checkout">
            <div class="relative mt-8 max-w-[700px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100">
              <span class="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
              <span class="relative sm:text-lg text-base font-body text-center">
                Continue to Checkout
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
