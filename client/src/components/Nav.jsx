import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-[#c6e6fd] px-10 py-4 flex justify-between items-center border-b border-gray-300 fixed top-0 left-0 w-full shadow-md z-50">
      {/* Brand */}
      <div className="text-2xl font-bold text-gray-800">Workio</div>

      {/* Links */}
      <div className="space-x-6">
        <a href="/choose" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
          New projects
        </a>
        <a href="/mprojects" className="text-lg font-bold text-black hover:text-[#66b0ff] transition">
          Your work
        </a>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-800 w-6 h-6" />
          <span className="text-lg font-bold text-gray-800">{user?.name || "Unknown User"}</span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="text-red-500 hover:text-red-700 transition flex items-center space-x-1"
        >
          <FaSignOutAlt className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
