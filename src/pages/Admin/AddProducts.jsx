import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { fireDB } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase"; // Make sure you import your storage configuration

const categoryList = [
  { name: "Canned Ice Cream" },
  { name: "Ice Cream Pints" },
  { name: "Ice Cream Cake" },
  { name: "Sundaes" },
  { name: "Ice Cream Gelato" },
  { name: "Kulfi" },
  { name: "Sherbet" },
  { name: "Frozen Yogurt" },
  { name: "Frozen Custard" },
  { name: "Soft Serve" },
];

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "", // Initialize as an empty string
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

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("Please select an image file.");
      return;
    }

    const productImageRef = ref(storage, `productimage/${file.name}`); // Adjust path as needed
    try {
      await uploadBytes(productImageRef, file); // Upload the file
      const url = await getDownloadURL(productImageRef); // Get the file URL
      setProduct((prev) => ({ ...prev, productImageUrl: url })); // Update the product state with the URL
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const addProductFunction = async () => {
    if (
      !product.title ||
      !product.price ||
      !product.productImageUrl ||
      !product.category ||
      !product.description
    ) {
      return toast.error("All fields are required");
    }

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-pink-500 mb-5">
          Add Ice-Cream
        </h2>

        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Product Title"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])} // Call the upload function
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Product Price"
            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
          />
        </div>
        <div className="mb-3">
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full px-1 py-2 text-black bg-pink-50 border border-pink-200 rounded-md outline-none"
          >
            <option>Select Product Category</option>
            {categoryList.map((value, index) => (
              <option key={index} value={value.name}>
                <select>{value.name}</select>
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            name="description"
            placeholder="Product Description"
            rows="5"
            className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-black"
          ></textarea>
        </div>
        <div className="mb-3">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
