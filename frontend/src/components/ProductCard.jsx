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
    <div className="bg-white border border-gray-200 hover:border-[#FF9900] hover:shadow-lg transition-all duration-200 overflow-hidden h-full flex flex-col">

      {/* Discount Badge */}
      <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-br-2xl text-xs font-bold z-10">
        {discountPercent}% OFF
      </div>

      {/* Image */}
      <div className="h-56 bg-white flex justify-center items-center p-4">
        <img
          src={imageMap[product.name]}
          alt={product.name}
          className="h-48 object-contain hover:scale-105 transition"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300?text=Product";
          }}
        />

      </div>

      {/* Content */}
      <div className="p-4">

        <h2 className="text-sm font-medium text-[#0F1111] h-10 overflow-hidden">
          {product.name}
        </h2>

        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">

          <span className="text-[#FFA41C] text-sm">
            ★★★★★
          </span>

          <span className="text-[#007185] text-xs hover:text-[#C7511F] cursor-pointer">
            1,245 ratings
          </span>

        </div>

        {/* Grade */}
        <div className="mt-3">

          <span
            className={`px-3 py-1 rounded text-white text-xs font-semibold ${product.grade === "A"
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
        <div className="flex flex-wrap gap-1 mt-2">

          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[9px] font-semibold">
            ✓ Refurbished
          </span>

          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-semibold">
            Trust 92
          </span>

          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[9px] font-semibold">
            🤖 AI Pick
          </span>

          <span className="bg-[#00A8E1] text-white px-2 py-1 rounded text-[9px] font-semibold">
            Prime
          </span>

        </div>

        {/* Price */}
        <div className="mt-4">

          <span className="text-3xl font-normal text-[#0F1111]">
            ₹{discountedPrice.toLocaleString()}
          </span>

          <span className="ml-2 text-xs text-gray-500 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>

        </div>

        {/* Savings */}
        <div className="text-green-600 text-xs mt-1 font-medium">
          Save ₹{(originalPrice - discountedPrice).toLocaleString()}
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-4 space-y-2">

          <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-sm">
            Add to Cart
          </button>

          <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] py-2 rounded-full text-sm">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;