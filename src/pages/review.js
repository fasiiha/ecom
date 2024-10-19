import Loading from "@/components/Loading";
import Link from "next/link";
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
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (reviewStatus === "failed") {
    return <div>Error loading review: {error}</div>;
  }

  return (
    <div className="max-w-[1400px] flex justify-center  mx-auto min-h-screen">
      <div className="w-full">
        <div className="flex flex-col p-4 sm:mt-10 mt-3">
          <div className="flex text-gray-500 sm:text-sm text-xs font-body">
            <Link href="/" className="sm:p-2 p-1">
              Home
            </Link>
            <span className="sm:p-2 p-1">/</span>
            <span className="sm:p-2 p-1">Reviews</span>
          </div>
          <h1 className="sm:text-6xl text-4xl font-heading mt-4">Reviews</h1>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 sm:py-24 py-8 mx-auto">
            <div className="flex flex-wrap -mx-4 -my-8">
              {review.map((item) => {
                const date = new Date(item.createdAt);
                const options = { month: "short", day: "numeric" };
                const formattedDate = date.toLocaleDateString("en-US", options);
                const year = date.getFullYear().toString().slice(-2);

                return (
                  <div
                    className="sm:py-8 py-4 px-4 lg:w-[30%] sm:w-[45%] w-full shadow-md bg-slate-100 m-2"
                    key={item.id}
                  >
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
                        {" "}
                        <Link
                          href={`/category/${item.Product?.Subcategory?.id}`}
                        >
                          <h2 className="tracking-wider text-xs title-font font-medium text-indigo-500 mb-1 font-body">
                            {item.Product?.Subcategory?.subcategory_name}
                          </h2>{" "}
                        </Link>
                        <Link href={`/product/${item.Product?.id}`}>
                          <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                            {item.Product?.product_name}
                          </h1>
                        </Link>
                        <p className="leading-relaxed mb-5">
                          <i> &quot;{item.comment}&quot;</i>
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
        </section>{" "}
      </div>
    </div>
  );
}
