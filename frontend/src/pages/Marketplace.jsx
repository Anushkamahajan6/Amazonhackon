import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/marketplace"
        );

       console.log(response.data);
setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#EAEDED] min-h-screen p-6">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Certified Refurbished Marketplace
        </h1>

        <p className="text-gray-600 mt-2">
          Discover sustainable and quality-checked products.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-4 mb-8">
        <select className="border p-2 rounded">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Furniture</option>
        </select>

        <select className="border p-2 rounded">
          <option>All Grades</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded flex-1"
        />
      </div>

      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (

  <div
    key={product._id}
    className="bg-white p-4 mb-2 rounded shadow"
  >
    {product.name}
  </div>

))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;