import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WishlistButton from "../components/WishlistButton";
import { fetchProduct } from "../store/slices/productSlice";
export default function Product() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.items);
  const productStatus = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProduct());
    }
  }, [productStatus, dispatch]);

  const handleButtonClick = (buttonName) => {
    if (selectedButton === buttonName) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonName);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 770);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  if (productStatus === "loading") {
    return <div>Loading your product...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error loading product: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row lg:mt-14 md:mt-7 h-screen">
      {product.map((item) => (
        <div key={item.id}>
          <div className="flex-1 flex items-start justify-center lg:px-20 lg:py-2 md:px-10 md:py-2 p-4">
            {isMobile ? (
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
              >
                {/* {images.map((src, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-64"
              >
                <img
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  src={src}
                  alt={`blog ${index}`}
                  onClick={() => openModal(src)}
                />
              </div>
            ))} */}
              </Carousel>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {/* {images.map((src, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-64"
              >
                <img
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  src={src}
                  alt={`blog ${index}`}
                  onClick={() => openModal(src)}
                />
              </div>
            ))} */}
              </div>
            )}
          </div>

          <div className="flex-1 p-4">
            <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
              {}
            </h1>
            <div className="flex justify-between gap-4 mb-4 xl:w-[85%]">
              <h2 className="sm:text-xl text-lg font-semibold font-heading">
                ${item.price}
              </h2>
              <div>
                <WishlistButton />
              </div>
            </div>

            <p className="font-body sm:text-base text-sm xl:w-[75%]">
              Discover timeless elegance with our Sterling Silver Ring, crafted
              to perfection for those who appreciate sophistication and style.
              Made from high-quality 925 sterling silver, this ring features a
              classic design that seamlessly complements any outfit, whether for
              everyday wear or special occasions.
            </p>
            <h2 className="text-base font-semibold mt-3 font-heading">
              {item.stock_quantity} items in stock
            </h2>

            <h2 className="text-base  mt-3 font-heading font-semibold">
              Color
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 ">
              <button
                className={`px-4 sm:py-2 py-1 overflow-hidden border-2 border-secondary ${
                  selectedButton === "Silver"
                    ? "bg-secondary text-white"
                    : " text-black"
                }`}
                onClick={() => handleButtonClick("Silver")}
              >
                <span className="relative sm:text-base text-sm font-body">
                  Silver
                </span>
              </button>

              <button
                className={`px-4 sm:py-2 py-1 overflow-hidden border-2 border-secondary  ${
                  selectedButton === "Gold"
                    ? "bg-secondary text-white"
                    : " text-black"
                }`}
                onClick={() => handleButtonClick("Gold")}
              >
                <span className="relative sm:text-base text-sm font-body">
                  Gold
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-5 ">
              <Link href="/cart">
                <div class="relative px-20  py-2.5 overflow-hidden group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100">
                  <span class="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                  <span class="relative sm:text-lg text-base font-body">
                    Add to Cart
                  </span>
                </div>
              </Link>
              <Link href="/">
                <div class="px-20 py-2 overflow-hidden border-2 border-black cursor-pointer">
                  <span class="relative sm:text-lg text-base font-body text-black">
                    Buy Now
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative max-w-3xl mx-auto p-4">
            <button
              className="absolute top-[-25px] right-[-25px] p-2 text-white"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              className={`transition-transform transform ${
                isZoomed ? "scale-150" : "scale-100"
              } max-w-full max-h-full object-contain cursor-pointer`}
              src={selectedImage}
              alt="Modal Content"
              onClick={toggleZoom}
            />
          </div>
        </div>
      )}
    </div>
  );
}
