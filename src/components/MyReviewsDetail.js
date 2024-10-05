export default function MyReviewsDetail({ review }) {
  console.log(review);
  return (
    <>
      <div className="flex items-center justify-center mx-auto h-[60vh]">
        <div className="flex-col mt-5">
          <h2 className="sm:text-3xl text-base font-semibold font-heading flex items-center justify-center mx-auto">
            Review
          </h2>
          <div className="mt-8 font-body sm:w-[520px] w-full grid gap-3">
            <div
              name="rating"
              className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            >
              Product Name: {review.Product.product_name}
            </div>
            <div
              name="rating"
              className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            >
              Rating: {review.rating}
            </div>
            <div
              name="rating"
              className="border-2 border-gray-500 bg-white h-12 px-3 focus:outline-none"
            >
              Comment: {review.comment}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
