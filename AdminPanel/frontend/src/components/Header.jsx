import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { MdUpload } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { RiBarChart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useAuth();

  const [items, setItems] = useState([]);

  const fetchCategoryParents = async () => {
    try {
      const res = await axios.get("/api/category-parents");
      console.log(res.data.parents);
      setItems(res.data.parents);
    } catch (err) {
      console.error("Error fetching Parents:", err);
    }
  };

  useEffect(() => {
    fetchCategoryParents();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", { withCredentials: true });
      setUser(null);
      window.Location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="w-full">
      {/* top section */}
      <div className="flex flex-row justify-between items-center mx-20">
        {/* brand name */}
        <div className="text-3xl font-poppins p-4">Brand Driver</div>

        {/* profile */}
        {user && (
          <div className="flex items-center gap-3 h-full p-4 bg-gray-100 ">
            <FaUserCircle className="text-3xl text-gray-500" />
            <div className="text-right">
              <div className="text-sm font-poppins text-gray-800 font-semibold">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
        )}
      </div>

      <hr className=" border-t border-gray-200" />

      {/* bottom section */}
      <div className="flex flex-row justify-around items-center border-b border-gray-200 shadow-md ">
        {/* Home */}
        <div className="p-2 cursor-pointer font-poppins text-gray-500 hover:text-gray-700">
          <div className="flex items-center">
            <AiFillHome className="" />
            <Link
              to="/dashboard"
              className="ml-1 cursor-pointer font-poppins hover:text-blue-600"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Upload Banner */}
        <div className="p-2 relative group cursor-pointer font-poppins text-gray-500 hover:text-gray-700">
          <div className="flex items-center justify-center">
            <MdUpload className="" />
            <span className="ml-1">Banner</span>
          </div>

          {/* Drop Down */}
          <div className="font-poppins absolute left-0 mt-2 hidden min-w-[150px] rounded-md border border-gray-200 bg-white shadow-lg group-hover:block z-50">
            <ul className="py-2 text-sm text-gray-500 ">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/upload-banner" className="block w-full h-full">
                  Upload Banner
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/show-banners" className="block w-full h-full">
                  All Banners
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories */}
        <div className="p-2 relative group cursor-pointer font-poppins text-gray-500 hover:text-gray-700">
          <div className="flex items-center justify-center">
            <MdCategory className="" />
            <span className="ml-1">Category</span>
            <MdKeyboardArrowDown className="ml-1 inline-block text-gray-500 group-hover:text-gray-700" />
          </div>

          {/* Drop Down */}
          <div className="font-poppins absolute left-0 mt-2 hidden min-w-[150px] rounded-md border border-gray-200 bg-white shadow-lg group-hover:block z-50">
            <ul className="py-2 text-sm text-gray-500 ">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/manage-categories" className="block w-full h-full">
                  Dashboard
                </Link>
              </li>

              {items.map((item, i) => {
                return (
                  <li key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                    <Link
                      to= {`/${item.name}/${item._id}`}
                      className="block w-full h-full"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}

{/*               

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/event" className="block w-full h-full">
                  Event
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/festival" className="block w-full h-full">
                  Festival
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/business" className="block w-full h-full">
                  Business
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Analytics */}
        <div className="p-2 cursor-pointer font-poppins text-gray-500 hover:text-gray-700">
          <div className="flex items-center justify-center">
            <RiBarChart2Line className="" />
            <span className="ml-1">Analytics</span>
            <span className="ml-1" />
            <MdKeyboardArrowDown className="inline-block text-gray-500" />
          </div>
        </div>

        {/* Profile */}
        <div className="p-2 relative group cursor-pointer font-poppins text-gray-500 hover:text-gray-700">
          <div className="flex items-center justify-center">
            <span className="ml-1">Profile</span>
            <MdKeyboardArrowRight className="ml-1 inline-block text-gray-500 group-hover:text-gray-700" />
          </div>

          {/* Drop Down */}
          <div className="font-poppins absolute left-0 mt-2 hidden min-w-[150px] rounded-md border border-gray-200 bg-white shadow-lg group-hover:block z-50">
            <ul className="py-2 text-sm text-gray-500 ">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/login" className="block w-full h-full">
                  Log In
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <button
                  className="block border-0"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log Out
                </button>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold">
                <Link to="/register" className="block w-full h-full">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
