export default function myOrder() {
  return (
    <>
      <div className="flex flex-col md:flex-row lg:mt-14 md:mt-7 max-w-[1400px] w-full  mx-auto">
        <div className="">
          <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
            Your Orders
          </h1>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
