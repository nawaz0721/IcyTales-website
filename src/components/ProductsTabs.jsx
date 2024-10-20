import React, { useState } from "react";

const ProductsTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="mt-4">
            <p className="text-gray-700">
              Ratione voluptatem serui nesciunt neave porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </p>
            <p className="text-gray-700 mt-4">
              Quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt porro quisquam est, qui dolore ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem ruis aute irure dolor in reprehenderit.
            </p>
          </div>
        );
      case "additionalInfo":
        return (
          <div className="mt-4 text-gray-700">
            <p>
              Quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt porro quisquam est, qui dolore ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem ruis aute irure dolor in reprehenderit.
            </p>
            <p className="text-gray-700 mt-4">
              Ratione voluptatem serui nesciunt neave porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </p>
          </div>
        );
      case "reviews":
        return (
          <div className="mt-4 text-gray-700">
            <p>
              Reviews Ratione voluptatem serui nesciunt neave porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </p>
            <p className="text-gray-700 mt-4">
              Quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt porro quisquam est, qui dolore ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem ruis aute irure dolor in reprehenderit
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[75%] m-auto my-4 p-3  rounded-xl">
      <div className="flex space-x-8">
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === "description"
              ? "text-pink-500 border-b-2 border-pink-500"
              : "text-gray-500 hover:text-pink-500"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === "additionalInfo"
              ? "text-pink-500 border-b-2 border-pink-500"
              : "text-gray-500 hover:text-pink-500"
          }`}
          onClick={() => setActiveTab("additionalInfo")}
        >
          Additional Information
        </button>
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === "reviews"
              ? "text-pink-500 border-b-2 border-pink-500"
              : "text-gray-500 hover:text-pink-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <hr />
      <div className="py-4">{renderContent()}</div>
      <hr />
    </div>
  );
};

export default ProductsTabs;
