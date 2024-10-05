import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewItems } from "../store/slices/reviewSlice";

export default function Review() {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.review.items);
  const reviewStatus = useSelector((state) => state.review.status);
  const error = useSelector((state) => state.review.error);

  useEffect(() => {
    if (reviewStatus === "idle") {
      dispatch(fetchReviewItems());
    }
  }, [reviewStatus, dispatch]);

  if (reviewStatus === "loading") {
    return <div>Loading your review...</div>;
  }

  if (reviewStatus === "failed") {
    return <div>Error loading review: {error}</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          {review.map((item) => {
            const date = new Date(item.createdAt);
            const options = { month: "short", day: "numeric" };
            const formattedDate = date.toLocaleDateString("en-US", options);
            const year = date.getFullYear().toString().slice(-2);

            return (
              <div className="py-8 px-4 lg:w-1/3" key={item.id}>
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                      {formattedDate.split(" ")[0]} &apos;{year}
                    </span>
                    <span className="font-medium text-lg text-gray-800 title-font leading-none">
                      {formattedDate.split(" ")[1]}
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                      {item.Product.Subcategory.subcategory_name}
                    </h2>
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {item.Product.product_name}
                    </h1>
                    <p className="leading-relaxed mb-5">
                      &quot;{item.comment}&quot;
                    </p>
                    <a className="inline-flex items-center">
                      <img
                        alt="blog"
                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-gray-900">
                          {item.User.first_name}
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
