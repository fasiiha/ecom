import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../store/slices/userSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const result = dispatch(registerNewUser(formData));
      if (result.payload.status != 500) {
        router.push("/");
      } else {
        console.error("Registration failed", result.payload.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto h-[80vh]">
      <div className="flex-col mt-5">
        <h2 className="sm:text-3xl text-2xl font-semibold font-heading flex items-center justify-center mx-auto">
          Register Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 font-body sm:w-[520px] w-screen grid gap-3 px-4"
        >
          <input
            name="first_name"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            name="last_name"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            name="email"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="phone_number"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="number"
            placeholder="Phone Number (optional)"
            value={formData.phone_number}
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
          <input
            name="confirmPassword"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />{" "}
          <button
            type="submit"
            className="relative mt-8 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100"
          >
            <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
            <span className="relative sm:text-lg text-base font-body text-center">
              Signup
            </span>
          </button>
        </form>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}
