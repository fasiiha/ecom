import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginExistingUser } from "../store/slices/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const loginStatus = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (loginStatus === "succeeded" && user) {
      router.push("/");
    }
    if (loginStatus === "failed") {
      setErrorMessage("Credentials are wrong.");
    }
  }, [loginStatus, user, router]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage("");
    dispatch(loginExistingUser(formData));
    setIsLoading(false);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return formData.email && formData.password && isEmailValid(formData.email);
  };

  return (
    <div className="flex items-center justify-center mx-auto h-[60vh]">
      <div className="flex-col mt-5">
        <h2 className="sm:text-3xl text-base font-semibold font-heading flex items-center justify-center mx-auto">
          Login Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 font-body sm:w-[520px] w-full grid gap-3"
        >
          <input
            name="email"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessage && (
            <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`${
              !isFormValid() ? "cursor-not-allowed" : "cursor-pointer"
            }  relative mt-4 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100`}
          >
            <span
              className={`${
                !isFormValid() ? "cursor-not-allowed" : "cursor-pointer"
              } absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease`}
            ></span>
            <span className="relative sm:text-lg text-base font-body text-center">
              {isLoading ? <Loading /> : "Login"}
            </span>
          </button>
        </form>
        {/* {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error?.message}</p>} */}
      </div>
    </div>
  );
}
