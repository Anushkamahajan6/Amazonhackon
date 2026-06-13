import {
  Search,
  MapPin,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

function Topbar() {
  return (
    <div className="bg-[#131921] h-16 flex items-center px-4 text-white">

      {/* Amazon Logo */}
      <div className="mr-6 cursor-pointer">
        <h1 className="text-4xl font-bold">
          amazon<span className="text-sm">.in</span>
        </h1>
      </div>

      {/* Location */}
      <div className="flex items-center mr-6 cursor-pointer">
        <MapPin size={18} />
        <div className="ml-1 leading-none">
          <p className="text-xs text-gray-300">
            Delivering to Agra 282001
          </p>
          <p className="font-bold">
            Update location
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-1 max-w-4xl">

        <button className="bg-gray-200 text-black px-3 rounded-l-md flex items-center text-sm">
          Pocket friendly store
          <ChevronDown size={14} className="ml-1" />
        </button>

        <input
          type="text"
          placeholder="Search Amazon.in"
          className="flex-1 px-4 text-black outline-none"
        />

        <button className="bg-[#FEBD69] px-4 rounded-r-md">
          <Search className="text-black" size={22} />
        </button>
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-8 ml-8">

        <div className="flex items-center gap-1 cursor-pointer">
          🇮🇳
          <span className="font-semibold">EN</span>
          <ChevronDown size={14} />
        </div>

        <div className="cursor-pointer">
          <p className="text-xs">Hello, sign in</p>
          <p className="font-bold text-sm">
            Account & Lists
          </p>
        </div>

        <div className="cursor-pointer">
          <p className="text-xs">Returns</p>
          <p className="font-bold text-sm">
            & Orders
          </p>
        </div>

        <div className="flex items-center cursor-pointer">
          <ShoppingCart size={34} />
          <span className="font-bold mt-3">Cart</span>
        </div>

      </div>
    </div>
  );
}

export default Topbar;