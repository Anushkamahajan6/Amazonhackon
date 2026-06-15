const ProductCard = ({ product }) => {
  const imageMap = {
    "iPhone 13":
      "https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg",

    "Samsung Galaxy S23":
      "https://m.media-amazon.com/images/I/61VfL-aiToL._SX679_.jpg",

    "Sony Headphones":
      "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg",

    "HP Laptop":
      "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",

    "Dell Laptop":
      "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg",

    "Nike Shoes":
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/air-max-270-shoes-KkLcGR.png",

    // "Adidas Sneakers":
    //   "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7b3db6b9c2f84ecbbca9af0100d4c49c_9366/Grand_Court_2.0_Shoes_White_GW9195_01_standard.jpg",

    // "Levi's Jeans":
    //   "https://lsco.scene7.com/is/image/lsco/005013353-front?$regular_mobile$",

    "Puma T-Shirt":
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/586668/01/mod01/fnd/IND/fmt/png",

    // "Boat Smartwatch":
    //   "https://www.boat-lifestyle.com/cdn/shop/files/Storm_Call_3.webp?v=1704456887",

    "Apple Watch":
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/s9-case-unselect-gallery-1-202309",

    // "Canon Camera":
    //   "https://in.canon/media/image/2023/02/08/eos-r50-black.png",

    // "LG Monitor":
    //   "https://www.lg.com/content/dam/channel/wcms/in/images/monitors/27mp400-b_awry_eein_in_c/gallery/27MP400-B-DZ-1.jpg",

    "Wooden Study Table":
      "https://m.media-amazon.com/images/I/71vFKBpKakL._SX679_.jpg",

    // "Office Chair":
    //   "https://m.media-amazon.com/images/I/71H4bhM4iXL._SX679_.jpg"
  };

  const originalPrice = product.originalPrice || 0;

  const discountedPrice =
    product.discountedPrice ||
    Math.round(originalPrice * 0.8);

  const discountPercent =
    originalPrice > 0
      ? Math.round(
        ((originalPrice - discountedPrice) /
          originalPrice) *
        100
      )
      : 0;

return (
  <div className="relative bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

    {/* Discount Badge */}
    <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-br-2xl text-xs font-bold z-10">
      {discountPercent}% OFF
    </div>

    {/* Image */}
    <div className="h-40 bg-[#FAFAFA] flex justify-center items-center border-b p-3">

      <img
        src={imageMap[product.name]}
        alt={product.name}
        className="h-32 object-contain"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x300?text=Product";
        }}
      />

    </div>

    {/* Content */}
    <div className="p-4">

      <h2 className="text-lg font-bold text-[#0F1111] h-12">
        {product.name}
      </h2>

      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
        {product.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">

        <span className="bg-green-700 text-white px-2 py-1 rounded text-xs font-semibold">
          ★ 4.8
        </span>

        <span className="text-gray-500 text-xs">
          1,245 ratings
        </span>

      </div>

      {/* Grade */}
      <div className="mt-3">

        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
            product.grade === "A"
              ? "bg-green-500"
              : product.grade === "B"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          Grade {product.grade || "A"}
        </span>

      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">

        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-semibold">
          ✓ Refurbished
        </span>

        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-semibold">
          Trust 92
        </span>

        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[10px] font-semibold">
          🤖 AI Pick
        </span>

        <span className="bg-[#00A8E1] text-white px-2 py-1 rounded text-[10px] font-semibold">
          Prime
        </span>

      </div>

      {/* Price */}
      <div className="mt-4">

        <span className="text-2xl font-bold text-[#B12704]">
          ₹{discountedPrice.toLocaleString()}
        </span>

        <span className="ml-2 text-sm text-gray-500 line-through">
          ₹{originalPrice.toLocaleString()}
        </span>

      </div>

      {/* Savings */}
      <div className="text-green-600 text-xs mt-1 font-medium">
        Save ₹{(originalPrice - discountedPrice).toLocaleString()}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">

        <button className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-xs font-semibold transition">
          Add to Cart
        </button>

        <button className="flex-1 bg-[#FFA41C] hover:bg-[#FA8900] py-2 rounded-full text-xs font-semibold transition">
          Buy Now
        </button>

      </div>

    </div>

  </div>
);
};

export default ProductCard;