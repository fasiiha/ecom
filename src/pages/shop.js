import Image from "next/image.js";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../assets/images/not-found.jpg";
import { fetchProduct } from "../store/slices/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.items);
  const productStatus = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const user = useSelector((state) => state.user);

  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const categoryName = product.Subcategory?.subcategory_name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProduct());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <div>Loading your product...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }
  const groupedProducts = groupByCategory(product);
  return (
    <div className="max-w-[1400px] flex justify-center  mx-auto">
      <div className="w-full">
        <div className="flex flex-col p-4 sm:mt-10 mt-3">
          <div className="flex text-gray-500 sm:text-sm text-xs font-body">
            <Link href="/" className="sm:p-2 p-1">
              Home
            </Link>
            <span className="sm:p-2 p-1">/</span>
            <span className="sm:p-2 p-1">Shop</span>
          </div>
          <h1 className="sm:text-6xl text-4xl font-heading mt-4">SHOP</h1>
        </div>
        <section className="text-black  body-font">
          <div className="container px-5 sm:pt-8 pb-8 mx-auto">
            {Object.keys(groupedProducts).map((category) => (
              <div key={category} className="sm:mt-12 mt-8">
                <h2 className="text-2xl font-heading mb-4">{category}</h2>
                <div className="flex flex-wrap -m-4">
                  {groupedProducts[category].map((item) => (
                    <div key={item.id} className="sm:m-4 m-2 ">
                      <Link href={`/product/${item.id}`}>
                        <div className="shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer">
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
