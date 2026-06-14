import { LayoutDashboard, Package, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Returns Queue",
      path: "/returns",
      icon: <Package size={20} />,
    },
    {
      name: "Trust System",
      path: "/trust",
      icon: <ShieldCheck size={20} />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#131A22] text-white">
      
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-[#FF9900]">
          Second Life
        </h1>
        <p className="text-sm text-gray-400">
          Commerce Admin
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 transition-all
              ${
                location.pathname === item.path
                  ? "bg-[#232F3E] text-[#FF9900]"
                  : "hover:bg-[#232F3E]"
              }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;