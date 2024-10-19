import Image from "next/image.js";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import NotFound from "../assets/images/not-found.jpg";
import { fetchLatestProduct } from "../store/slices/productSlice";
import Loading from "./Loading.js";

export function SuggestItems() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.items);
  const productStatus = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchLatestProduct());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <Loading />;
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }

  return (
    <div className="max-w-[1400px] flex justify-center  mx-auto">
      <div className="w-full">
        <div className="sm:text-3xl text-2xl font-semibold font-heading mt-8">
          You May Also Like
        </div>
        <section className="text-black  body-font">
          <div className="container px-5 sm:pt-8 pb-8 mx-auto ">
            <div className="flex flex-wrap -m-4">
              <Swiper
                style={{ padding: "30px 26px" }}
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    // spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    // spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    // spaceBetween: 30,
                  },
                }}
              >
                {product.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <div className="sm:m-4 m-2">
                      <Link href={`/product/${item.id}`}>
                        <div className="shadow-md  overflow-hidden  transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                          <div className="relative w-full sm:h-[250px] h-[140px] overflow-hidden">
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
