import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPendingReviews } from "../services/reviewService";

export default function PendingReviews() {
  const [step, setStep] = useState("pendingReviewlist");
  const user = useSelector((state) => state.user.user);
  const [pendingReviews, setPendingReviews] = useState([]);

  const fetchData = async () => {
    try {
      const reviews = await getPendingReviews(user?.id);
      setPendingReviews(reviews.data);
    } catch (error) {
      console.error("Failed to fetch pending reviews:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const handleNext = () => {
    setStep("pendingReviewDetails");
  };

  const handleBack = () => {
    setStep("pendingReviewlist");
  };

  console.log(pendingReviews);
  return (
    <>
      <div>
        <h2 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
          Pending Reviews
        </h2>

        <section className="text-gray-600 body-font">
          <div className="w-full mx-auto overflow-auto">
            {step === "pendingReviewlist" ? (
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl font-body">
                      Product Name
                    </th>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                      Order Date
                    </th>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                      Delivery Date
                    </th>
                    <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                      Review Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingReviews &&
                    pendingReviews.length > 0 &&
                    pendingReviews.map((review) => (
                      <tr key={review.id}>
                        <td className="px-4 py-3">{review.product_name}</td>
                        <td className="px-4 py-3">disabled</td>
                        <td className="px-4 py-3">sdsd</td>
                        <td className="px-4 py-3">Pending</td>

                        <td className="px-4 py-3">
                          <button
                            className="text-blue-500"
                            onClick={handleNext}
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
                    Back to Orders List
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
                {/* <OrderDetails /> */}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
