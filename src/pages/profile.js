import MyOrder from "@/components/MyOrder";
import MyReviews from "@/components/MyReviews";
import PendingReviews from "@/components/PendingReviews";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <div className="max-w-[1400px] flex justify-center  mx-auto min-h-screen">
      <div className="w-full">
        <header className=" body-font sm:mt-10 mt-3">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
            <nav className="md:border-gray-400 flex flex-wrap items-center justify-center border-b border-gray-500 pb-2 mt-4">
              <a
                className={`sm:text-base text-sm font-heading mr-3 hover:text-gray-400 ${
                  activeTab === "orders" ? "font-semibold" : ""
                }`}
                onClick={() => setActiveTab("orders")}
                style={{ cursor: "pointer" }}
              >
                Orders Status
              </a>
              <span>|</span>
              <a
                className={`pl-3 sm:text-base text-sm font-heading mr-5 hover:text-gray-400 ${
                  activeTab === "toreview" ? "font-semibold" : ""
                }`}
                onClick={() => setActiveTab("toreview")}
                style={{ cursor: "pointer" }}
              >
                Pending Reviews
              </a>{" "}
              <span>|</span>
              <a
                className={`pl-3 sm:text-base text-sm font-heading mr-5 hover:text-gray-400 ${
                  activeTab === "myreview" ? " font-semibold" : ""
                }`}
                onClick={() => setActiveTab("myreview")}
                style={{ cursor: "pointer" }}
              >
                My Reviews
              </a>
            </nav>
            <div
              className="max-w-[120px] flex justify-center text-white bg-[#0047AB] border cursor-pointer mt-3 py-2 px-4 text-sm font-body rounded-lg"
              onClick={handleLogout}
            >
              logout
            </div>
          </div>
        </header>

        <div className="container mx-auto p-5">
          {activeTab === "orders" && <MyOrder />}
          {activeTab === "toreview" && <PendingReviews />}
          {activeTab === "myreview" && <MyReviews />}
        </div>
      </div>
    </div>
  );
}
