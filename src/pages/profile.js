import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("orders");
  const orders = [
    {
      orderNumber: "1001",
      orderDate: "2024-09-01",
      items: "Product A, Product B",
      total: "$45.00",
      paymentMethod: "Credit Card",
      status: "Shipped",
      deliveryDate: "2024-09-05",
    },
    {
      orderNumber: "1002",
      orderDate: "2024-09-02",
      items: "Product C",
      total: "$20.00",
      paymentMethod: "PayPal",
      status: "Pending",
      deliveryDate: "2024-09-07",
    },
    {
      orderNumber: "1003",
      orderDate: "2024-09-03",
      items: "Product D, Product E, Product F",
      total: "$75.00",
      paymentMethod: "Debit Card",
      status: "Delivered",
      deliveryDate: "2024-09-06",
    },
  ];

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
                activeTab === "addresses" ? "text-gray-700 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("addresses")}
              style={{ cursor: "pointer" }}
            >
              My Addresses
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

            <section class="text-gray-600 body-font">
              <div class="w-full mx-auto overflow-auto">
                <table class="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl font-body">
                        Order Number
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Order Date
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Items
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Total
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Payment Method
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Status
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Delivery Date
                      </th>
                      <th class="px-4 py-3 tracking-wider font-semibold text-gray-900 text-sm bg-gray-100 font-body">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderNumber}>
                        <td className="px-4 py-3">{order.orderNumber}</td>
                        <td className="px-4 py-3">{order.orderDate}</td>
                        <td className="px-4 py-3">{order.items}</td>
                        <td className="px-4 py-3">{order.total}</td>
                        <td className="px-4 py-3">{order.paymentMethod}</td>
                        <td className="px-4 py-3">{order.status}</td>
                        <td className="px-4 py-3">{order.deliveryDate}</td>
                        <td className="px-4 py-3">
                          <button className="text-blue-500">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === "addresses" && (
          <div>
            <h2 className="sm:text-4xl text-2xl font-bold mb-4 font-heading">
              Your Addresses
            </h2>
            {/* Replace with actual addresses content */}
            <p>Here is the list of your addresses...</p>
          </div>
        )}
      </div>
    </>
  );
}
