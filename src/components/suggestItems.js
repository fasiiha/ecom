import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating.js";
import { fetchLatestProduct } from "../store/slices/productSlice";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Import required modules from Swiper
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

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
    return <div>Loading your product...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }

  return (
    <>
      <section>
        <div>View More</div>
        <section className="text-black body-font">
          <div className="container px-5 py-24 mx-auto">
            {/* Swiper carousel */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar]}
              spaceBetween={10}
              slidesPerView={1} // 1 item on very small screens
              navigation // Adds navigation buttons
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // 2 items on small screens
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3, // 3 items on medium screens
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4, // 4 items on large screens
                  spaceBetween: 30,
                },
              }}
            >
              {product.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="sm:p-4 p-2">
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
                            <div className="inline-flex items-center">
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </section>
    </>
  );
}
