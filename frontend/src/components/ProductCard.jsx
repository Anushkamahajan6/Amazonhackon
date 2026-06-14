const ProductCard = ({ product }) => {

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) /
      product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Discount Badge */}
      <div className="absolute bg-red-600 text-white px-3 py-1 rounded-br-lg text-sm font-semibold">
        {discountPercent}% OFF
      </div>

      {/* Image */}
      <div className="h-56 bg-gray-50 flex justify-center items-center p-4">
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1">
          {product.description}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-1 mt-3 text-yellow-500">
          ★★★★★
          <span className="text-gray-500 text-sm ml-2">
            4.8
          </span>
        </div>

        {/* Grade */}
        <div className="mt-3">

          <span
            className={`px-3 py-1 rounded-full text-sm text-white font-medium
            ${
              product.grade === "A"
                ? "bg-green-500"
                : product.grade === "B"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            Grade {product.grade}
          </span>

        </div>

        {/* Certified Badge */}
        <div className="mt-3 text-blue-600 font-medium text-sm">
          ✓ Certified Refurbished
        </div>

        {/* Prime Badge */}
        <div className="mt-2">
          <span className="bg-[#00A8E1] text-white px-2 py-1 rounded text-xs font-semibold">
            Prime
          </span>
        </div>

        {/* Prices */}
        <div className="mt-4">

          <span className="text-3xl font-bold text-black">
            ₹{product.discountedPrice}
          </span>

          <span className="ml-3 text-gray-500 line-through">
            ₹{product.originalPrice}
          </span>

        </div>

        {/* Savings */}
        <div className="text-green-600 text-sm mt-1">
          Save ₹
          {product.originalPrice - product.discountedPrice}
        </div>

        {/* Add to Cart */}
        <button className="mt-5 w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full font-medium transition duration-200">
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;