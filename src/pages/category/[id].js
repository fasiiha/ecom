import Loading from "@/components/Loading";
import Image from "next/image.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../assets/images/not-found.jpg";
import { fetchProduct } from "../../store/slices/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
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
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }
  const filteredProducts = product.filter((item) => item?.subcategory_id == id);

  if (filteredProducts.length === 0) {
    return <div>No products found for this subcategory.</div>;
  }

  const categoryName =
    filteredProducts[0].Subcategory?.subcategory_name || "Category";
  return (
    <div className="max-w-[1400px] flex justify-center  mx-auto min-h-screen">
      <div className="w-full">
        <div className="flex flex-col p-4 sm:mt-10 mt-3">
          <div className="flex text-gray-500 sm:text-sm text-xs font-body">
            <Link href="/" className="sm:p-2 p-1">
              Home
            </Link>
            <span className="sm:p-2 p-1">/</span>
            <span className="sm:p-2 p-1">{categoryName}</span>
          </div>
          <h1 className="sm:text-6xl text-4xl font-heading mt-4">
            {categoryName}
          </h1>
        </div>
        <section className="text-black body-font">
          <div className="container px-5 sm:pt-8 pb-8 mx-auto">
            <div className="sm:mt-12 mt-8">
              <h2 className="text-2xl font-heading mb-4">Products</h2>
              <div className="flex flex-wrap -m-4">
                {filteredProducts.map((item) => (
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
        </section>
      </div>
    </div>
  );
}