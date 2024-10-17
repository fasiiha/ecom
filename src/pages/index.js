import { Inter } from "next/font/google";
import Image from "next/image.js";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bgImage from "../assets/images/bg.jpg";
import Rating from "../components/Rating.js";
import { fetchLatestProduct } from "../store/slices/productSlice";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.items);
  const productStatus = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchLatestProduct());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <div>Loading your product...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }
  return (
    <>
      <div className="relative">
        <Image
          src={bgImage}
          alt="background-image"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="absolute inset-0 flex items-center pl-20">
          <div className="flex flex-col">
            <h1 className="font-heading text-7xl mb-2 text-white">ToZee</h1>
            <h1 className="font-heading text-xl mt-3 mb-10 text-white">
              From Chic Apparel to Dazzling Jewelry {`-`} Find It All Here!
            </h1>
          </div>
        </div>
      </div>

      <div className="container px-5 py-24 mx-auto">
        <h4 className="justify-center items-center flex font-heading text-xl mt-2 ">
          Popular Products
        </h4>
        <h1 className="justify-center items-center flex font-heading text-5xl mt-2 mb-10">
          Trending Now
        </h1>
        <div className="flex flex-wrap -m-4">
          {product.slice(0, 8).map((item) => (
            <div key={item.id} className="sm:p-4 p-2 w-1/2 lg:w-1/4">
              <Link href={`/product/${item.id}`}>
                <div className="shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img
                    className="w-full h-auto object-cover object-center"
                    src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
                    alt={item.product_name}
                  />
                  <div className="p-3 flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="inline-flex items-center sm:text-lg text-sm font-body font-medium">
                        {item.product_name}
                      </div>
                      <div className="inline-flex items-center ">
                        <Rating totalStars={5} />
                      </div>
                      <div className="inline-flex items-center font-heading font-semibold">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="container px-5 py-16 mx-auto">
        <h4 className="justify-center items-center flex font-heading text-xl mt-2 ">
          Shop
        </h4>
        <h1 className="justify-center items-center flex font-heading text-5xl mt-2 mb-10">
          Best Selling
        </h1>
        <div className="flex flex-wrap -m-4">
          {product.slice(0, 8).map((item) => (
            <div key={item.id} className="sm:p-4 p-2 w-1/2 lg:w-1/4">
              <Link href={`/product/${item.id}`}>
                <div className="shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img
                    className="w-full h-auto object-cover object-center"
                    src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
                    alt={item.product_name}
                  />
                  <div className="p-3 flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="inline-flex items-center sm:text-lg text-sm font-body font-medium">
                        {item.product_name}
                      </div>
                      <div className="inline-flex items-center ">
                        <Rating totalStars={5} />
                      </div>
                      <div className="inline-flex items-center font-heading font-semibold">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
