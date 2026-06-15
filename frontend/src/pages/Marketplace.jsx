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
          "/api/marketplace"
        );
        setProducts(
          Array.isArray(response.data)
            ? response.data
            : []
        );




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

      return matchesSearch && matchesCategory && matchesGrade;
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

      <div className="bg-gradient-to-b from-slate-50 to-gray-100 min-h-screen px-8 py-6">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#334155] text-white rounded-3xl p-8 mb-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            Certified Refurbished Marketplace
          </h1>

          <p className="mt-3 text-lg text-gray-200">
            Discover sustainable and quality-checked products at amazing prices.
          </p>

          <div className="mt-5">
            <span className="bg-[#FEBD69] text-black px-5 py-2 rounded-full font-semibold">
              {filteredProducts.length} Products Available
            </span>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-3xl shadow-md flex flex-wrap gap-4 mb-10">

          <select
            className="border border-gray-300 p-2 rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Furniture</option>
          </select>

          <select
            className="border border-gray-300 p-2 rounded-xl"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option>All Grades</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <select
            className="border border-gray-300 p-2 rounded-xl"
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
            className="border border-gray-300 p-2 rounded-xl flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Recommended */}
        <div className="mb-16">

          <h2 className="text-2xl font-bold text-[#131921] mb-2">
            Recommended for You
          </h2>

          <p className="text-blue-600 mb-8">
            {reason}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {Array.isArray(recommendations) &&
              recommendations.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        </div>

        {/* Featured Products */}
        <div>

          <h2 className="text-2xl font-bold text-[#131921]">
            Featured Products
          </h2>

          <p className="text-gray-500 mb-8">
            Trending certified products selected for sustainability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 bg-gradient-to-r from-[#131921] to-[#232F3E] text-white p-8 rounded-3xl shadow-xl">

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