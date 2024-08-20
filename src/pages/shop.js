import Link from "next/link";
import Rating from "../components/Rating.js";

export default function Shop() {
  return (
    <>
      <section className="text-black bg-primary body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="sm:p-4 p-2 w-1/2 lg:w-1/3">
              <Link href="/">
                <div className="shadow-xl rounded-lg overflow-hidden bg-surface transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img
                    className="w-full h-auto object-cover object-center"
                    src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
                    alt="blog"
                  />
                  <div className="p-3 flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-1">
                      <p className="inline-flex items-center sm:text-lg text-sm font-heading">
                        Silver Diamond Ring
                      </p>
                      <p className="inline-flex items-center ">
                        <Rating totalStars={5} />
                      </p>
                      <p className="inline-flex items-center font-heading">
                        3000$
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="sm:p-4 p-2 w-1/2 lg:w-1/3">
              <Link href="/">
                <div className="shadow-xl rounded-lg overflow-hidden bg-surface transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img
                    className="w-full h-auto object-cover object-center"
                    src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
                    alt="blog"
                  />
                  <div className="p-3 flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-1">
                      <p className="inline-flex items-center sm:text-lg text-sm font-heading">
                        Silver Diamond Ring
                      </p>
                      <p className="inline-flex items-center ">
                        <Rating totalStars={5} />
                      </p>
                      <p className="inline-flex items-center font-heading">
                        3000$
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="sm:p-4 p-2 w-1/2 lg:w-1/3">
              <Link href="/">
                <div className="shadow-xl rounded-lg overflow-hidden bg-surface transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img
                    className="w-full h-auto object-cover object-center"
                    src="https://img.lazcdn.com/g/p/be2723539cde48470da1dc1b9f80f0b1.jpg_720x720q80.jpg"
                    alt="blog"
                  />
                  <div className="p-3 flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-1">
                      <p className="inline-flex items-center sm:text-lg text-sm font-heading">
                        Silver Diamond Ring
                      </p>
                      <p className="inline-flex items-center ">
                        <Rating totalStars={5} />
                      </p>
                      <p className="inline-flex items-center font-heading">
                        3000$
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
