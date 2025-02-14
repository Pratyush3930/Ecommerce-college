import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const OrderDisplay = () => {
  const { orderDetails, loading , setOrderDetails, setLoading} = useAppContext();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5140/api/order/1`);
      console.log(response.data);
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  useEffect(() => {
    fetchOrderDetails();  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <div className="text-center p-4">Loading order details...</div>;
 // Ensure orderDetails is not undefined before accessing it
 if (!orderDetails  ) {
    return <div className="text-center p-4">Order details are unavailable.</div>;
  }
  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Your Orders</h2>

        {orderDetails.length > 0 ? (
          orderDetails.map((order) => (
            <div key={order.orderId} className="mb-8 border-b pb-6">
              {/* Order Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-xl font-medium text-indigo-600 mb-2">
                    Order ID: <span className="text-gray-700">{order.orderId}</span>
                  </div>
                  <div className="text-md text-gray-500">
                    <span className="font-medium text-gray-800">Address:</span> {order.address}
                  </div>
                  <div className="text-md text-gray-500">
                    <span className="font-medium text-gray-800">Phone:</span> {order.phone}
                  </div>
                  <div className="text-md text-gray-500">
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    <span className={order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-800">Total Amount</div>
                  <div className="text-2xl font-bold text-indigo-600">₹{order.totalAmount ?? 0}</div>
                </div>
              </div>

              {/* Cart Items */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order Items</h3>
                {order.cartItems.length > 0 ? (
                  order.cartItems.map((item) => (
                    <div
                      key={item.cart_id}
                      className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 rounded-lg mb-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={`http://localhost:5140${item.imagePath}`}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-lg shadow-md mr-6"
                        />
                        <div>
                          <div className="text-lg font-semibold text-gray-800">{item.productName}</div>
                          <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-gray-800">₹{item.total_price}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">No cart items found.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No orders found.</div>
        )}
      </div>

    </div>
  );

};

export default OrderDisplay;
