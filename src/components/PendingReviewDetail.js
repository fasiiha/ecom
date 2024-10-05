import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReviewItem } from "../store/slices/reviewSlice";

export default function PendingReviewDetail({ review }) {
  console.log(review);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 1,
    user_id: user?.id,
    product_id: review.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReviewItem(formData));
  };

  return (
    <div className="flex items-center justify-center mx-auto h-[60vh]">
      <div className="flex-col mt-5">
        <h2 className="sm:text-3xl text-base font-semibold font-heading flex items-center justify-center mx-auto">
          Review
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 font-body sm:w-[520px] w-full grid gap-3"
        >
          <input
            name="rating"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="number"
            placeholder="rating"
            value={formData.rating}
            onChange={handleChange}
          />
          <textarea
            name="comment"
            rows="10"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="text"
            placeholder="comment"
            value={formData.comment}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="relative mt-8 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100"
          >
            <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
            <span className="relative sm:text-lg text-base font-body text-center">
              Submit
            </span>
          </button>
        </form>
        {/* {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error?.message}</p>} */}
      </div>
    </div>
  );
}
