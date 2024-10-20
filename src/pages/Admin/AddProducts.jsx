import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { fireDB } from "../../utils/firebase";

const categoryList = [
  {
    name: "Canned Ice Cream",
  },
  {
    name: "Ice Cream Pints",
  },
  {
    name: "Ice Cream Cake",
  },
  {
    name: "Sundaes",
  },
  {
    name: "Ice Cream Gelato",
  },
  {
    name: "Kulfi",
  },
  {
    name: "Sherbet",
  },
  {
    name: "Frozen Yogurt",
  },
  {
    name: "Frozen Custard",
  },
  {
    name: "Soft Serve",
  },
];
const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProductFunction = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("All fields are required");
    }

    // setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add product successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Add product failed");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Add Ice-Cream
            </h2>
          </div>
          <div className="mb-3">
            <input
              type="submit"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              className="bg-pink-500 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black-300"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Product Title"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              placeholder="Product Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>

          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-black bg-pink-50 border border-pink-200 rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-black "
            ></textarea>
          </div>
          <div className="mb-3">
            <button
              onClick={addProductFunction}
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
