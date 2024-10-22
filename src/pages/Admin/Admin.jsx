import React, { useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "../../components/admin/ProductDetails"; // Check spelling
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";
import { MyContext } from "../../context/MyState"; // Ensure this matches your export

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(MyContext);
  const {
    getAllProduct = [],
    getAllOrder = [],
    getAllUser = [],
    loading,
  } = context || {}; // Default to empty array

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {/* Top */}
      <div className="top mb-5 px-5 mt-5">
        <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Admin Dashboard
          </h2>
        </div>
      </div>

      <div className="px-5">
        {/* Mid */}
        <div className="mid mb-5">
          {/* Main */}
          <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="Admin Profile"
              />
            </div>
            <div className="">
              <h2 className="text-center text-lg text-pink-500">
                <span className="font-bold text-black">Name: </span>
                {user?.name}
              </h2>
              <h2 className="text-center text-lg text-pink-500">
                <span className="font-bold text-black">Email: </span>
                {user?.email}
              </h2>
              <h2 className="text-center text-lg text-pink-500">
                <span className="font-bold text-black">Date: </span>
                {user?.date}
              </h2>
              <h2 className="text-center text-lg text-pink-500">
                <span className="font-bold text-black">Role: </span>
                {user?.role}
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="">
          <Tabs>
            <TabList className="flex flex-wrap -m-4 text-center justify-center">
              {/* Total Products */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                  <h2 className="title-font font-medium text-3xl text-pink-400 fonts1">
                    {getAllProduct.length}
                  </h2>
                  <p className="text-pink-500 font-bold">Total Products</p>
                </div>
              </Tab>

              {/* Total Orders */}
              <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                  <h2 className="title-font font-medium text-3xl text-pink-400 fonts1">
                    {getAllOrder.length}
                  </h2>
                  <p className="text-pink-500 font-bold">Total Orders</p>
                </div>
              </Tab>

              {/* Total Users */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                  <h2 className="title-font font-medium text-3xl text-pink-400 fonts1">
                    {getAllUser.length}
                  </h2>
                  <p className="text-pink-500 font-bold">Total Users</p>
                </div>
              </Tab>
            </TabList>

            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            <TabPanel>
              <UserDetail />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
