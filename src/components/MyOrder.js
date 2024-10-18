import OrderDetails from "@/components/orderDetails";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpecificOrder } from "../services/orderService";

export default function MyOrder() {
  const user = useSelector((state) => state.user.user);
  const [step, setStep] = useState("orderlist");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchData = async () => {
    try {
      const reviews = await getSpecificOrder(user?.id);
      setOrders(reviews.data);
    } catch (error) {
      console.error("Failed to fetch pending reviews:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const handleNext = (order) => {
    setSelectedOrder(order);
    setStep("orderdetails");
  };

  const handleBack = () => {
    setStep("orderlist");
    setSelectedOrder(null);
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
        <h2 className="sm:text-5xl text-3xl  mb-4 font-heading">Your Orders</h2>

        <section className="text-gray-700 body-font ">
          <div className="w-full mx-auto overflow-auto ">
            {step === "orderlist" ? (
              <table className="table-auto w-full text-left whitespace-no-wrap sm:mt-4 mt-2">
                <thead>
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 rounded-tl rounded-bl font-heading">
                      Order Number
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Order Date
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Items
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Total
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Payment Method
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Status
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Delivery Date
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-900 sm:text-base text-sm bg-gray-100 font-heading">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-4 py-3">{order.OrderItems.length}</td>
                      <td className="px-4 py-3">{order.total_amount}</td>
                      <td className="px-4 py-3">Easy Paisa</td>
                      <td className="px-4 py-3">{order.order_status}</td>
                      <td className="px-4 py-3">
                        {formatDate(order.estimated_delivery_date)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="text-blue-500"
                          onClick={() => handleNext(order)}
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
                <OrderDetails order={selectedOrder} />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
