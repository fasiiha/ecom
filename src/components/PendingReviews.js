import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPendingReviews } from "../services/reviewService";
import PendingReviewDetail from "./PendingReviewDetail";

export default function PendingReviews() {
  const router = useRouter();
  const [step, setStep] = useState("pendingReviewlist");
  const user = useSelector((state) => state.user.user);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const reviews = await getPendingReviews(user?.id);
      setPendingReviews(reviews.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch pending reviews:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id, router]);

  const handleNext = (review) => {
    setSelectedReview(review);
    setStep("pendingReviewDetails");
  };

  const handleBack = () => {
    setStep("pendingReviewlist");
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
        <h2 className="sm:text-5xl text-3xl  mb-4 font-heading">
          Pending Reviews
        </h2>
        {isLoading ? (
          <Loading />
        ) : (
          <section className="text-gray-700 body-font">
            <div className="w-full mx-auto overflow-auto">
              {step === "pendingReviewlist" ? (
                <table className="table-auto w-full text-left whitespace-no-wrap sm:mt-4 mt-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 rounded-tl rounded-bl font-heading">
                        Product Name
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                        Order Date
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                        Delivered Date
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                        Status
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingReviews &&
                      pendingReviews.length > 0 &&
                      pendingReviews.map((review, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <Link href={`/product/${review.product.id}`}>
                              {review.product.product_name}
                            </Link>{" "}
                          </td>

                          <td className="px-4 py-3">
                            {formatDate(review.orderDetails.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            {formatDate(review.orderDetails.updatedAt)}
                          </td>
                          <td className="px-4 py-3">Pending</td>
                          <td className="px-4 py-3">
                            <button
                              className="text-blue-500"
                              onClick={() => handleNext(review.product)}
                            >
                              Review Now
                            </button>
                          </td>
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
                      Back to Pending Review List
                      <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </div>
                  <PendingReviewDetail review={selectedReview} />
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
