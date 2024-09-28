export default function OrderDetails() {
  const order = {
    orderNumber: "123456",
    orderDate: "2024-09-15",
    items: [
      {
        productName: "T-shirt",
        quantity: 2,
        price: 20,
        image: "/images/tshirt.png",
      },
      {
        productName: "Jeans",
        quantity: 1,
        price: 50,
        image: "/images/jeans.png",
      },
      { productName: "Hat", quantity: 1, price: 10, image: "/images/hat.png" },
    ],
    totalAmount: 100,
    paymentMethod: "Credit Card",
    shippingMethod: "Express",
    trackingNumber: "TRACK12345",
    estimatedDeliveryDate: "2024-09-20",
    shippingAddress: {
      name: "John Doe",
      addressLine1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Order #{order.orderNumber}</h1>
      <div className="mb-4">
        <p className="font-semibold">Order Date:</p>
        <p>{order.orderDate}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Shipping Address:</p>
        <p>{order.shippingAddress.name}</p>
        <p>{order.shippingAddress.addressLine1}</p>
        <p>{`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Payment Method:</p>
        <p>{order.paymentMethod}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Shipping Method:</p>
        <p>{order.shippingMethod}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Tracking Number:</p>
        <p>{order.trackingNumber}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Estimated Delivery Date:</p>
        <p>{order.estimatedDeliveryDate}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Order Items</h2>
      <div className="border-t border-gray-200">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <p className="font-semibold">{item.productName}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 py-4 flex justify-end">
        <p className="text-lg font-bold">
          Total: ${order.totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
