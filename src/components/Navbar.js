import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsUser(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-3 lg:px-12 shadow  border-b border-black font-body">
      <div className="flex justify-between lg:w-auto w-full pl-6 pr-2 border-solid border-gray-300">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-8">
          <span className="font-semibold font-heading text-xl tracking-tight">
            E-Commerce
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            id="nav"
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border border-black"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-md lg:flex-grow">
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            Shop
          </Link>
          <Link
            href="/latest"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            New Arrivals
          </Link>
          <Link
            href="/wishlist"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            Best Selling Products
          </Link>
          <Link
            href="/product"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            Categories
          </Link>
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            Reviews
          </Link>
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            Contact Us
          </Link>
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 hover:bg-gray-200 "
          >
            FAQs
          </Link>
        </div>
        <div className="relative mx-auto text-gray-600 lg:block hidden mr-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.09-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            className="border border-black bg-white h-10 pl-10 pr-3 w-80 text-sm focus:outline-none"
            type="search"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-start ">
          {isUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="lg:px-5 px-4 py-2  mt-4 lg:mt-0 w-full items-start flex overflow-hidden sm:text-base text-sm font-body hover:bg-gray-200"
              >
                {user.first_name}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg">
                  <Link href="/cart">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      Cart
                    </div>
                  </Link>
                  <Link href="/wishlist">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      Wishlist
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signup">
                <div className="lg:px-5 px-4 py-2  mt-4 lg:mt-0 w-full items-start flex overflow-hidden sm:text-base text-sm font-body hover:bg-gray-200">
                  Signup
                </div>
              </Link>
              <Link href="/login">
                <div className="lg:px-5 px-4 py-2  mt-4 lg:mt-0 w-full items-start flex overflow-hidden sm:text-base text-sm font-body hover:bg-gray-200">
                  Login
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
