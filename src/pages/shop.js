import Image from "next/image.js";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../assets/images/not-found.jpg";
import Rating from "../components/Rating.js";
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
    <>
      <section className="text-black  body-font">
        <div className="container px-5 py-8 mx-auto">
          {Object.keys(groupedProducts).map((category) => (
            <div key={category} className="mt-12">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {category}
              </h2>
              <div className="flex flex-wrap -m-4">
                {groupedProducts[category].map((item) => (
                  <div key={item.id} className="sm:p-4 p-2 w-1/2 lg:w-1/4">
                    <Link href={`/product/${item.id}`}>
                      <div className="shadow-lg rounded-lg overflow-hidden border transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                        <Image
                          src={
                            item.images && item.images.length > 0
                              ? item.images[0]
                              : NotFound
                          }
                          alt={item.product_name}
                          // layout="responsive"
                          // width={500}
                          // height={300}
                          height={500}
                          width={300}
                          style={{ width: "500px", height: "300px" }}
                          // className="w-full h-full object-cover"
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
          ))}
        </div>
      </section>
    </>
  );
}
