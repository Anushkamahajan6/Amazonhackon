const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4">

      {/* Image */}
      <div className="h-52 flex justify-center items-center">
        <img
          src={`https://placehold.co/250x200?text=${product.name}`}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Name */}
      <h2 className="mt-4 text-lg font-semibold text-gray-800">
        {product.name}
      </h2>

      {/* Grade Badge */}
      <div className="mt-2">
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Grade {product.grade}
        </span>
      </div>

      {/* Certified Badge */}
      <div className="mt-3 text-sm text-blue-600 font-medium">
        ✓ Certified Refurbished
      </div>

      {/* Prices */}
      <div className="mt-4">

        <span className="text-2xl font-bold text-black">
          ₹{product.discountedPrice}
        </span>

        <span className="ml-3 text-gray-500 line-through">
          ₹{product.originalPrice}
        </span>

      </div>

      {/* Button */}
      <button className="mt-5 w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full font-medium">
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;