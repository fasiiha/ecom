import Loading from "@/components/Loading";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import greenTick from "../assets/images/greentick.png";
import { addReviewItem } from "../store/slices/reviewSlice";
import Rating from "./Rating";

export default function PendingReviewDetail({ review }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(addReviewItem(formData));
    setIsLoading(false);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
    setFormData({
      comment: "",
      rating: 1,
      user_id: user?.id,
      product_id: review.id,
    });
    router.push("/profile");
  };

  return (
    <div className="flex items-center justify-center mx-auto h-[60vh]">
      <div className="flex-col mt-5">
        <h2 className="sm:text-3xl text-xl font-semibold font-heading flex items-center justify-center mx-auto">
          Review
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 font-body sm:w-[520px] w-full grid gap-3"
        >
          {/* <input
            name="rating"
            className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            type="number"
            placeholder="rating"
            value={formData.rating}
            onChange={handleChange}
          /> */}
          <div className="flex justify-center">
            <Rating totalStars={5} onRatingChange={handleRatingChange} />
          </div>
          <textarea
            name="comment"
            rows="10"
            className="border-2 border-gray-500 bg-white h-20 px-3 focus:outline-none"
            type="text"
            placeholder="comment"
            value={formData.comment}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="relative mt-2 max-w-[520px] w-full py-3 overflow-hidden flex justify-center items-center group cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-black text-white transition-all ease-out duration-100"
          >
            <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
            <span className="relative sm:text-lg text-base font-body text-center">
              {isLoading ? <Loading /> : "Submit"}
            </span>
          </button>
        </form>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded shadow-lg text-center sm:w-[400px] w-full">
              <div className="flex items-center justify-center mx-auto pb-5 pt-2">
                <Image
                  width={50}
                  height={50}
                  src={greenTick}
                  alt="successful"
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-body font-semibold">
                  Review Sent!
                </h2>
              </div>
            </div>
          </div>
        )}
        {/* {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error?.message}</p>} */}
      </div>
    </div>
  );
}
