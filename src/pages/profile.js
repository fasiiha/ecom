import OrderDetails from "@/components/orderDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecificOrderItems } from "../store/slices/orderSlice";
import { logoutUser } from "../store/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("orders");
  const [step, setStep] = useState("orderlist");
  const orders = useSelector((state) => state.order.items);
  const orderStatus = useSelector((state) => state.order.status);
  const error = useSelector((state) => state.order.error);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.id === undefined) {
      <div>Please Log in first</div>;
    } else {
      if (orderStatus === "idle") {
        dispatch(fetchSpecificOrderItems(user?.id));
      }
    }
  }, [user, orderStatus, dispatch]);

  // const orders = [
  //   {
  //     orderNumber: "1001",
  //     orderDate: "2024-09-01",
  //     items: "Product A, Product B",
  //     total: "$45.00",
  //     paymentMethod: "Credit Card",
  //     status: "Shipped",
  //     deliveryDate: "2024-09-05",
  //   },
  //   {
  //     orderNumber: "1002",
  //     orderDate: "2024-09-02",
  //     items: "Product C",
  //     total: "$20.00",
  //     paymentMethod: "PayPal",
  //     status: "Pending",
  //     deliveryDate: "2024-09-07",
  //   },
  //   {
  //     orderNumber: "1003",
  //     orderDate: "2024-09-03",
  //     items: "Product D, Product E, Product F",
  //     total: "$75.00",
  //     paymentMethod: "Debit Card",
  //     status: "Delivered",
  //     deliveryDate: "2024-09-06",
  //   },
  // ];

  const handleNext = () => {
    setStep("orderdetails");
  };

  const handleBack = () => {
    setStep("orderlist");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log(orders);
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
              My Reviews
            </a>
            <a
              className={`pl-3 sm:text-base text-sm font-heading mr-5 hover:text-gray-900 ${
                activeTab === "myreview" ? "text-gray-700 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("myreview")}
              style={{ cursor: "pointer" }}
            >
              To Review
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
        {activeTab === "orders" && (
          <div>
            <h2 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
              Your Orders
            </h2>

            <section className="text-gray-600 body-font">
              <div className="w-full mx-auto overflow-auto">
                {step === "orderlist" ? (
                  <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl font-body">
                          Order Number
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Order Date
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Items
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Total
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Payment Method
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Status
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Delivery Date
                        </th>
                        <th className="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.orderNumber}>
                          <td className="px-4 py-3">{order.id}</td>
                          <td className="px-4 py-3">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            {order.OrderItems.length}
                          </td>
                          <td className="px-4 py-3">{order.total_amount}</td>
                          <td className="px-4 py-3">Easy Paisa</td>
                          <td className="px-4 py-3">{order.order_status}</td>
                          <td className="px-4 py-3">
                            {" "}
                            {formatDate(order.estimated_delivery_date)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="text-blue-500"
                              onClick={handleNext}
                            >
                              View
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
                    <OrderDetails />
                  </>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === "toreview" && (
          <div>
            <h2 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
              Review Products Now
            </h2>
            <p>Here is the list of your toreview...</p>
          </div>
        )}

        {activeTab === "myreview" && (
          <div>
            <h2 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
              Your Review
            </h2>
            <p>Here is the list of your myreview...</p>
          </div>
        )}
      </div>
    </>
  );
}
