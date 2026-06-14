import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-[#131921] text-white px-8 py-4 flex items-center justify-between shadow-lg">

      <h1 className="text-2xl font-bold">
        EcoShop
      </h1>

      <div className="flex gap-8 font-medium">

       <Link
  to="/home"
  className="hover:text-yellow-400"
>
  Home
</Link>

<Link
  to="/marketplace"
  className="hover:text-yellow-400"
>
  Marketplace
</Link>

<button
  className="hover:text-yellow-400"
  onClick={() => {
    const section = document.getElementById("recommended");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  }}
>
  Recommended
</button>

<Link
  to="/orders"
  className="hover:text-yellow-400"
>
  Orders
</Link>

      </div>

    </div>
  );
};

export default Navbar;