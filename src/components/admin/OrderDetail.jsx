import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyState";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../utils/firebase";

const OrderDetail = () => {
  const context = useContext(MyContext);
  const { getAllOrder, loading, setLoading } = context || {};
  const [orderStatus, setOrderStatus] = useState([]);

  // Fetch all orders from Firebase
  useEffect(() => {
    const fetchOrder = async () => {
      const querySnapshot = await getDocs(collection(fireDB, "order"));
      const orderList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrderStatus(orderList);
    };

    fetchOrder();
  }, []);

  // Handle status change
  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      await setDoc(
        doc(fireDB, "order", orderId),
        { status: newStatus },
        { merge: true }
      );

      // Update local state for UI
      setOrderStatus((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteProduct = async (orderId, itemId) => {
    setLoading(true);
    try {
      const orderDoc = await getDoc(doc(fireDB, "order", orderId));
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();

        const updatedCartItems = orderData.cartItems.filter(
          (item) => item.id !== itemId
        );

        await setDoc(doc(fireDB, "order", orderId), {
          cartItems: updatedCartItems,
        });

        setOrderStatus((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, cartItems: updatedCartItems }
              : order
          )
        );

        toast.success("Item deleted successfully");
      } else {
        toast.error("Order not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-5">
        <h2 className="text-xl text-pink-300 font-bold">All Orders</h2>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <tbody>
            <tr>
              {/* Table Headers */}
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                S.No.
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Order Id
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Image
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Title
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Category
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Price
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Quantity
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Total Price
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Status
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Name
              </th>
              <th className="h-12 p-6 text-md font-bold fontPara border-l first-border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Complete Address
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first-border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Email
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Date
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Action
              </th>
            </tr>
            {Array.isArray(getAllOrder) && getAllOrder.length > 0 ? (
              getAllOrder.map((order) => {
                if (!Array.isArray(order.cartItems)) {
                  console.error(
                    `cartItems is not an array for order ${order.id}`,
                    order.cartItems
                  );
                  return null;
                }

                return order.cartItems.map((item, index) => {
                  const {
                    id,
                    productImageUrl,
                    title,
                    category,
                    price,
                    quantity,
                  } = item;

                  return (
                    <tr key={index} className="text-pink-300">
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {index + 1}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {order.id}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        <img src={productImageUrl} alt="img" />
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {title}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {category}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {(Number(price) || 0).toFixed(2)}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {quantity}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {(Number(price) || 0).toFixed(2) * quantity}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600 first:border-l-0 border-pink-100 text-slate-500">
                        <div>
                          <form className="flex flex-col gap-2">
                            <label className="flex gap-2">
                              <input
                                type="radio"
                                name={`status-${order.id}`}
                                value="pending"
                                checked={order.status === "pending"}
                                onChange={(event) =>
                                  handleStatusChange(event, order.id)
                                }
                              />
                              Pending
                            </label>
                            <label className="flex gap-2">
                              <input
                                type="radio"
                                name={`status-${order.id}`}
                                value="confirm"
                                checked={order.status === "confirm"}
                                onChange={(event) =>
                                  handleStatusChange(event, order.id)
                                }
                              />
                              Confirm
                            </label>
                            <label className="flex gap-2">
                              <input
                                type="radio"
                                name={`status-${order.id}`}
                                value="deliver"
                                checked={order.status === "deliver"}
                                onChange={(event) =>
                                  handleStatusChange(event, order.id)
                                }
                              />
                              Deliver
                            </label>
                          </form>
                        </div>
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {order.billingInfo.firstName +
                          " " +
                          order.billingInfo.lastName}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {order.billingInfo.address}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {order.email}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {order.date}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first-border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                        <div>
                          <button
                            onClick={() => deleteProduct(order.id, id)} // Pass both order ID and item ID
                            className="ml-2 bg-red-700 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                });
              })
            ) : (
              <tr>
                <td colSpan="14" className="text-center py-4 text-gray-500">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
