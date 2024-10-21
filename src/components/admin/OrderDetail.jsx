import React, { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../utils/firebase";
import { CartContext } from "../../context/CartContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, setLoading } = context;
  const { cartItems } = useContext(CartContext);

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Product Deleted successfully");
      // getAllOrder();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, itemId) => {
    setLoading(true);
    try {
      const orderDocRef = doc(fireDB, "order", orderId);

      await updateDoc(orderDocRef, {
        [`cartItems.${itemId}.status`]: "Confirmed",
      });

      toast.success(
        `Status updated for Order ${orderId}, Item ${itemId}: Confirmed`
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
      setLoading(false);
    }
    getAllOrder();
  };

  return (
    <div>
      <div>
        <div className="py-5">
          <h2 className="text-xl text-pink-300 font-bold">All Orders</h2>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
            <tbody>
              <tr>
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
                <th className="h-12 p-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
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
              {getAllOrder.map((order) => {
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
                        {id}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        <img src={productImageUrl} alt="img" />
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
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
                        {/* Display the current status */}
                        <span
                          className={`font-bold ${
                            item.status === "Confirm"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {item.status || "Pending"}
                        </span>
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
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => deleteProduct(order.id)}
                            className="ml-2 bg-red-700 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, index)}
                            className="ml-2 bg-green-700 text-white px-2 py-1 rounded"
                          >
                            Confirm
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
