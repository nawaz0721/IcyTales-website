import React from "react";
import { useContext, useEffect, useState } from "react";
import myContext, { MyContext } from "../context/MyState";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(MyContext);
  const { getAllOrder, loading } = context || {};

  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    const savedStatuses =
      JSON.parse(localStorage.getItem("orderStatuses")) || {};
    setOrderStatuses(savedStatuses);
  }, []);

  const shipping = 20;

  return (
    <div className="container mx-auto px-4 py-5 lg:py-8">
      <div className="top mb-5 px-5 mt-5">
        <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h2 className="text-center text-2xl font-bold text-pink-500">
            User Dashboard
          </h2>
        </div>
      </div>
      <div className="top">
        <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-center text-lg">
              <span className="font-bold">Name : </span>
              {user?.name}
            </h2>
            <h2 className="text-center text-lg">
              <span className="font-bold">Email : </span>
              {user?.email}
            </h2>
            <h2 className="text-center text-lg">
              <span className="font-bold">Date : </span>
              {user?.date}
            </h2>
            <h2 className="text-center text-lg">
              <span className="font-bold">Role : </span>
              {user?.role}
            </h2>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
          {getAllOrder
            .filter((obj) => obj.userid === user?.uid)
            .map((order, index) => (
              <div key={index}>
                {Array.isArray(order.cartItems) && order.cartItems.length > 0
                  ? order.cartItems.map((item, index) => {
                      const {
                        id,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                        description,
                      } = item;

                      const currentStatus =
                        orderStatuses[order.id]?.[item.id] || "Pending";

                      return (
                        <div
                          key={index}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
                        >
                          {/* Order Details */}
                          <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-black">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    #{id}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    ${" "}
                                    {(Number(price) || 0).toFixed(2) *
                                      quantity +
                                      shipping}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Order Status
                                  </div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                                    {currentStatus}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                        src={productImageUrl}
                                        alt="img"
                                      />
                                    </div>
                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {category}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {description}
                                        </p>
                                      </div>
                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      {(Number(price) || 0).toFixed(2)}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
