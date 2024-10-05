import MyOrder from "@/components/MyOrder";
import MyReviews from "@/components/MyReviews";
import PendingReviews from "@/components/PendingReviews";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("orders");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <nav className="md:border-gray-400 flex flex-wrap items-center justify-center border-b border-gray-500 pb-2 mt-4">
            <a
              className={`sm:text-base text-sm font-heading mr-3 hover:text-gray-900 ${
                activeTab === "orders" ? "text-gray-700 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("orders")}
              style={{ cursor: "pointer" }}
            >
              Orders Status
            </a>
            <a
              className={`pl-3 sm:text-base text-sm font-heading mr-5 hover:text-gray-900 ${
                activeTab === "toreview" ? "text-gray-700 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("toreview")}
              style={{ cursor: "pointer" }}
            >
              Pending Reviews
            </a>
            <a
              className={`pl-3 sm:text-base text-sm font-heading mr-5 hover:text-gray-900 ${
                activeTab === "myreview" ? "text-gray-700 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("myreview")}
              style={{ cursor: "pointer" }}
            >
              My Reviews
            </a>
          </nav>
          <div
            className="mt-2 font-heading cursor-pointer font-semibold text-blue-400"
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
    </>
  );
}
