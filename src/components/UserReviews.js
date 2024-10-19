import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductReviews } from "../store/slices/reviewSlice";
import Loading from "./Loading";

export default function UserReviews({ productId }) {
  console.log(productId);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.items);
  const status = useSelector((state) => state.review.status);
  const error = useSelector((state) => state.review.error);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductReviews(productId));
    }
  }, [dispatch, productId]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviews);

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] flex justify-center mx-auto ">
      {reviews.length > 0 ? (
        <div className="w-full">
          <h1 className="sm:text-3xl text-2xl font-semibold font-heading mt-8">
            Reviews
            <span className="text-base ml-3">({averageRating} / 5)</span>
          </h1>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4 ">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4  sm:w-[400px] w-full">
                    <div className="flex shadow-md px-5 py-6 flex-row bg-gray-100">
                      <img
                        alt="blog"
                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        className="w-12 h-12 m-4 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-2  ">
                          {review.User?.first_name}
                        </h2>
                        <div className="flex mb-2">
                          {Array.from({ length: 5 }, (_, index) => (
                            <svg
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating
                                  ? "text-[#384353]"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.12-6.54L1 6.545l6.545-.954L10 0l2.455 5.591L19 6.545l-4.242 4.005 1.12 6.54z" />
                            </svg>
                          ))}
                        </div>
                        <p className="leading-relaxed text-base">
                          <i>&quot;{review.comment}&quot;</i>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
