import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAndSubcategoryItems } from "../store/slices/categorySlice";

const Footer = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category?.items);
  useEffect(() => {
    dispatch(fetchCategoryAndSubcategoryItems());
  }, [dispatch]);

  return (
    <div className="w-full px-4 sm:pt-8 pt-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen  md:px-24 lg:px-16 border-t border-gray-200 bg-gray-100">
      <div className="grid sm:gap-16 gap-7 row-gap-10 sm:mb-8 mb-4 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2 my-3">
          <Link
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Ecommerce
            </span>
          </Link>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-xs text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adip nonum soc et
              justo.Lorem ipsum dolor sit amet, consectetur adip nonum soc et
              justo.Lorem ipsum dolor sit amet, consectetur adip nonum soc et
              justo.
            </p>
            <p className="mt-4 text-xs text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adip nonum soc et justo.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-3 md:grid-cols-3">
          <div>
            <p className="font-semibold font-heading text-lg text-gray-800 my-3">
              Shop
            </p>

            <ul className="space-y-1">
              {" "}
              <li>
                <Link
                  href="/shop"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/latest"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/review"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                >
                  Review
                </Link>
              </li>
              {categories.map((category) =>
                category.Subcategories?.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/category/${sub.id}`}
                      className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                    >
                      {sub.subcategory_name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <p className="font-semibold font-heading text-lg text-gray-800 my-3">
              Connect With Us
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                >
                  Mail
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 sm:text-sm text-xs"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between py-2 border-t sm:flex-row">
        <p className="text-xs text-gray-600">
          © Copyright 2020 Ecommerce Inc. All rights reserved.
        </p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          <Link
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
            </svg>
          </Link>
          <Link
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
              <circle cx="15" cy="15" r="4" />
              <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
            </svg>
          </Link>
          <Link
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
