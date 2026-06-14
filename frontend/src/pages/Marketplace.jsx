
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [grade, setGrade] = useState("All Grades");
  const [sortBy, setSortBy] = useState("Default");
  const [recommendations, setRecommendations] = useState([]);
  const [reason, setReason] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/marketplace"
        );

        setProducts(response.data);
        const recommendationResponse = await axios.get(
  "http://localhost:5000/api/recommendations/6a2d28a6ab8b05d85457fc85"
);

setRecommendations(recommendationResponse.data);

setReason(
  "Because you frequently return Electronics items, you may like these certified products."
);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      const matchesGrade =
        grade === "All Grades" ||
        product.grade === grade;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGrade
      );
    })
    .sort((a, b) => {
      if (sortBy === "Price Low to High") {
        return a.discountedPrice - b.discountedPrice;
      }

      if (sortBy === "Price High to Low") {
        return b.discountedPrice - a.discountedPrice;
      }

      return 0;
    });

  return (
    <>
      <Navbar />

      <div className="bg-[#EAEDED] min-h-screen px-8 py-6">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#131921] to-[#232F3E] text-white rounded-xl p-8 mb-8 shadow-lg">

          <h1 className="text-4xl font-bold">
            Certified Refurbished Marketplace
          </h1>

          <p className="mt-3 text-lg text-gray-200">
            Discover sustainable and quality-checked products at amazing prices.
          </p>

          <div className="mt-4">
            <span className="bg-[#FEBD69] text-black px-4 py-2 rounded-full font-semibold">
              {filteredProducts.length} Products Available
            </span>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl shadow-lg flex flex-wrap gap-4 mb-8">

          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Furniture</option>
          </select>

          <select
            className="border p-2 rounded"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option>All Grades</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Default</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>

          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


         {/* Recommended Section */}
<div
  id="recommended"
  className="mb-14"
>

  <h2 className="text-3xl font-bold text-gray-800">
    Recommended For You
  </h2>

  <p className="text-blue-600 mt-2 mb-6">
    {reason}
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

    {recommendations?.map((product) => (

      <ProductCard
        key={product._id}
        product={product}
      />

    ))}

  </div>

</div>

        {/* Featured Products */}
        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            Featured Products
          </h2>

          <p className="text-gray-500 mb-6">
            Trending certified products selected for sustainability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 bg-[#232F3E] text-white p-8 rounded-xl">

          <h2 className="text-2xl font-bold">
            EcoShop
          </h2>

          <p className="mt-3 text-gray-300">
            Buy certified refurbished products and contribute to a greener future.
          </p>

          <p className="mt-6 text-sm text-gray-400">
            © 2026 EcoShop Marketplace
          </p>

        </div>

      </div>
    </>
  );
};

export default Marketplace;

