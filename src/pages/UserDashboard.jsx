// import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import image1 from "../images/best-image1.jpg.png";
import myContext from "../context/myContext";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  useEffect(() => {
    // This effect could also be used to fetch orders from the API
    // You could use a setInterval or WebSocket to listen for changes if needed
  }, [getAllOrder]);

  return (
    // <Layout>
    <div className=" container mx-auto px-4 py-5 lg:py-8">
      <div className="top mb-5 px-5 mt-5">
        <div className=" bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h2 className=" text-center text-2xl font-bold text-pink-500">
            User Dashboard
          </h2>
        </div>
      </div>
      {/* Top  */}
      <div className="top ">
        {/* main  */}
        <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
          {/* image  */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              alt=""
            />
          </div>
          {/* text  */}
          <div className="">
            {/* Name  */}
            <h2 className=" text-center text-lg">
              <span className=" font-bold">Name : </span>
              {user?.name}
            </h2>
            {/* Email  */}
            <h2 className=" text-center text-lg">
              <span className=" font-bold">Email : </span>
              {user?.email}
            </h2>
            {/* Date  */}
            <h2 className=" text-center text-lg">
              <span className=" font-bold">Date : </span>
              {user?.date}
            </h2>
            {/* Role  */}
            <h2 className=" text-center text-lg">
              <span className=" font-bold">Role : </span>
              {user?.role}
            </h2>
          </div>
        </div>
      </div>
      {/* bottom  */}
      <div className="bottom">
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
          {getAllOrder
            .filter((obj) => obj.userid === user?.uid)
            .map((order, index) => (
              <div key={index}>
                {order.cartItems.map((item, index) => {
                  const {
                    id,
                    quantity,
                    price,
                    title,
                    productImageUrl,
                    category,
                  } = item;
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
                                $ {price * quantity}
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="text-sm font-semibold">
                                Order Status
                              </div>
                              <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                                {order.status}{" "}
                                {/* Display the updated status */}
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
                                  </div>
                                  <p className="mt-4 text-sm font-medium text-gray-500">
                                    x {quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="ml-auto flex flex-col items-end justify-between">
                                <p className="text-right text-sm font-bold text-gray-900">
                                  $ {price}
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
