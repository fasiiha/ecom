import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating.js";
import { fetchProduct } from "../store/slices/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.items);
  const productStatus = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const user = useSelector((state) => state.user);

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
  return (
    <>
      <section className="text-black  body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {product.map((item) => (
              <div key={item.id} className="sm:p-4 p-2 w-1/2 lg:w-1/4">
                <Link href={`/product/${item.id}`}>
                  <div className="shadow-lg rounded-lg overflow-hidden border transform transition-transform duration-300 hover:scale-105 cursor-pointer">
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
      </section>
    </>
  );
}
