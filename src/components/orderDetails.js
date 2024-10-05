export default function OrderDetails({ order }) {
  console.log(order);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Order #{order.id}</h1>
      <div className="mb-4">
        <p className="font-semibold">Order Date:</p>
        <p> {formatDate(order.createdAt)}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Shipping Address:</p>
        <p>{order.User.first_name}</p>
        <p>
          {order.ShippingAddress?.address_line1}
          {order.ShippingAddress?.address_line2}
        </p>
        <p>{`${order.ShippingAddress?.city}, ${order.ShippingAddress?.state} ${order.ShippingAddress?.postalCode}, ${order.ShippingAddress?.country}`}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Payment Method:</p>
        {/* <p>{order.paymentMethod}</p> */}
      </div>
      {/* <div className="mb-4">
        <p className="font-semibold">Shipping Method:</p>
        <p>{order.shippingMethod}</p>
      </div> */}
      {/* <div className="mb-4">
        <p className="font-semibold">Tracking Number:</p>
        <p>{order.trackingNumber}</p>
      </div> */}
      <div className="mb-4">
        <p className="font-semibold">Estimated Delivery Date:</p>
        <p> {formatDate(order.estimated_delivery_date)}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Order Items</h2>
      <div className="border-t border-gray-200">
        {order.OrderItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img
                src={
                  item.Product?.images && item.Product?.images.length > 0
                    ? item.Product?.images[0]
                    : null
                }
                alt={item.Product.product_name}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <p className="font-semibold">{item.Product.product_name}</p>
                <p>Quantity: {item.quantity}</p>
                {item.color ? <p>Size: {item.size}</p> : null}
                {item.color ? <p>Color: {item.color}</p> : null}
              </div>
            </div>
            <p className="font-semibold">${item.Product.price}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 py-4 flex justify-end">
        <p className="text-lg font-bold">
          {/* Total: ${order.totalAmount.toFixed(2)} */}
          Total: ${order.total_amount}
        </p>
      </div>
    </div>
  );
}
