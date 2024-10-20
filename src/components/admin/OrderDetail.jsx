import React, { Fragment, useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder } = context;

  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const savedStatuses =
      JSON.parse(localStorage.getItem("orderStatuses")) || {};
    setStatuses(savedStatuses);
  }, []);

  const handleStatusChange = (orderId, itemId, status) => {
    const updatedStatuses = {
      ...statuses,
      [orderId]: {
        ...(statuses[orderId] || {}),
        [itemId]: status,
      },
    };
    setStatuses(updatedStatuses);

    localStorage.setItem("orderStatuses", JSON.stringify(updatedStatuses));
    console.log(
      `Status updated for Order ${orderId}, Item ${itemId}: ${status}`
    );
  };
  return (
    <div>
      <div>
        <div className="py-5">
          <h2 className="text-xl text-pink-300 font-bold">All Order</h2>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  S.No.
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Order Id
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Image
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Title
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Category
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Price
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Quantity
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Total Price
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Name
                </th>

                <th
                  scope="col"
                  className="h-12 p-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Complete Address
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Email
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Date
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Action
                </th>
              </tr>
              {getAllOrder.map((order) => {
                return (
                  <React.Fragment key={order.id}>
                    {order.cartItems.map((item, index) => {
                      const {
                        id,
                        productImageUrl,
                        title,
                        category,
                        price,
                        quantity,
                      } = item;
                      const currentStatus =
                        statuses[order.id]?.[item.id] || "Pending";
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

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            {category}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            ${(Number(price) || 0).toFixed(2)}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            {quantity}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            ${(Number(price) || 0).toFixed(2) * quantity}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600 first:border-l-0 border-pink-100 text-slate-500">
                            <div className="flex flex-col gap-2">
                              <label>
                                <input
                                  type="radio"
                                  name={`status-${order.id}-${item.id}`}
                                  value="Pending"
                                  checked={currentStatus === "Pending"}
                                  onChange={() =>
                                    handleStatusChange(
                                      order.id,
                                      item.id,
                                      "Pending"
                                    )
                                  }
                                />
                                Pending
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name={`status-${order.id}-${item.id}`}
                                  value="Confirm"
                                  checked={currentStatus === "Confirm"}
                                  onChange={() =>
                                    handleStatusChange(
                                      order.id,
                                      item.id,
                                      "Confirm"
                                    )
                                  }
                                />
                                Confirm
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name={`status-${order.id}-${item.id}`}
                                  value="Deliver"
                                  checked={currentStatus === "Deliver"}
                                  onChange={() =>
                                    handleStatusChange(
                                      order.id,
                                      item.id,
                                      "Deliver"
                                    )
                                  }
                                />
                                Deliver
                              </label>
                            </div>
                          </td>
                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            {order.billingInfo.firstName +
                              " " +
                              order.billingInfo.lastName}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            {order.billingInfo.address}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                            {order.email}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            {order.date}
                          </td>

                          <td
                            onClick={() => deleteProduct(order.id)}
                            className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                          >
                            Delete
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
