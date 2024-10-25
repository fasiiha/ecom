import Loading from "@/components/Loading";
import Image from "next/image.js";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bgImage from "../assets/images/bg.jpg";
import NotFound from "../assets/images/not-found.jpg";
import { fetchLatestProduct } from "../store/slices/productSlice";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }

  const shuffledProducts1 = shuffleArray([...product]);
  const shuffledProducts2 = shuffleArray([...product]);
  return (
    <>
      <div className="relative">
        <Image
          src={bgImage}
          alt="background-image"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="absolute inset-0 flex items-center sm:pl-20 pl-5">
          <div className="flex flex-col">
            <h1 className="font-heading sm:text-7xl text-2xl mb-2 text-white">
              Ecommerce
            </h1>
            <h1 className="sm:w-full w-[50%] font-heading sm:text-xl text-sm sm:mt-3 sm:mb-10 mb-3 text-white">
              From Chic Apparel to Dazzling Jewelry {`-`} Find It All Here!
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto">
        <div className="container px-5 sm:py-24 py-10 mx-auto">
          <h4 className="justify-center items-center flex font-heading sm:text-xl text-lg mt-2 ">
            Popular Products
          </h4>
          <h1 className="justify-center items-center flex font-heading sm:text-5xl text-2xl mt-2 mb-10">
            Trending Now
          </h1>
          <div className="flex flex-wrap -m-4 justify-center">
            {shuffledProducts1.slice(0, 8).map((item) => (
              <div key={item.id} className="sm:m-4 m-2 ">
                <Link href={`/product/${item.id}`}>
                  <div className="shadow-md  overflow-hidden  transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="relative sm:w-[250px] w-[150px] sm:h-[250px] h-[140px] overflow-hidden">
                      <Image
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : NotFound
                        }
                        alt={item.product_name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                    <div className="p-5 flex justify-center items-center">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="inline-flex items-center sm:text-base text-xs font-body font-medium">
                          {item.product_name}
                        </div>
                        {/* <div className="inline-flex items-center ">
                                <Rating totalStars={5} />
                              </div> */}
                        <div className="inline-flex items-center sm:text-base text-xs font-heading font-semibold">
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
        <div className="container px-5 sm:py-16 py-7 mx-auto">
          <h4 className="justify-center items-center flex font-heading sm:text-xl text-lg mt-2 ">
            Shop
          </h4>
          <h1 className="justify-center items-center flex font-heading sm:text-5xl text-2xl mt-2 mb-10">
            Best Selling
          </h1>
          <div className="flex flex-wrap -m-4 justify-center">
            {shuffledProducts2.slice(0, 8).map((item) => (
              <div key={item.id} className="sm:m-4 m-2 ">
                <Link href={`/product/${item.id}`}>
                  <div className="shadow-md  overflow-hidden  transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="relative sm:w-[250px] w-[150px] sm:h-[250px] h-[140px] overflow-hidden">
                      <Image
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : NotFound
                        }
                        alt={item.product_name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                    <div className="p-5 flex justify-center items-center">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="inline-flex items-center sm:text-base text-xs font-body font-medium">
                          {item.product_name}
                        </div>
                        {/* <div className="inline-flex items-center ">
                                <Rating totalStars={5} />
                              </div> */}
                        <div className="inline-flex items-center sm:text-base text-xs font-heading font-semibold">
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
      </div>
    </>
  );
}
