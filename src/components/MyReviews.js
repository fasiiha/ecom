import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUserReviews } from "../services/reviewService";

export default function MyReviews() {
  const [step, setStep] = useState("myReviewList");
  const user = useSelector((state) => state.user.user);
  const [myReviews, setMyReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchData = async () => {
    try {
      const reviews = await getAllUserReviews(user?.id);
      setMyReviews(reviews.data);
    } catch (error) {
      console.error("Failed to fetch pending reviews:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const handleNext = (review) => {
    setSelectedReview(review);
    setStep("myReviewDetails");
  };

  const handleBack = () => {
    setStep("myReviewList");
    setSelectedReview(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <div>
        <h2 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
          Your Reviews
        </h2>

        <section className="text-gray-600 body-font">
          <div className="w-full mx-auto overflow-auto">
            {step === "myReviewList" ? (
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl font-body">
                      Product Name
                    </th>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                      Rating
                    </th>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                      Review
                    </th>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myReviews.map((review) => (
                    <tr key={review.id}>
                      <Link href={`/product/${review.Product.id}`}>
                        <td className="px-4 py-3 text-blue-400 underline">
                          {review.Product.product_name}
                        </td>
                      </Link>
                      <td className="px-4 py-3">{review.rating}</td>
                      <td className="px-4 py-3">{review.comment}</td>
                      <td className="px-4 py-3">
                        {formatDate(review.createdAt)}
                      </td>
                      {/* <td className="px-4 py-3">
                        <button
                          className="text-blue-500"
                          onClick={() => handleNext(review)}
                        >
                          View
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <div
                  onClick={handleBack}
                  className="cursor-pointer flex items-center group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="sm:h-7 h-4 sm:w-7 w-4 mr-1"
                  >
                    <path
                      d="M6 12H18M6 12L11 7M6 12L11 17"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="relative text-black sm:text-base text-sm">
                    Back to Reviews List
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
                {/* <MyReviewsDetail review={selectedReview} /> */}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}