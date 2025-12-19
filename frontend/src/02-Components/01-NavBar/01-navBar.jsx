import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useLoginUserDetails } from "../../00-CreateGlobalSession/hook/03-useData";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaRocket } from "react-icons/fa";

export function Navbar() {
  const [open, setOpen] = useState(false);
   

   

  return (
    <>
      <nav className="w-full flex items-center justify-between  h-[10vh] bg-white shadow-sm fixed top-0 z-50">
        {/* Left - Logo */}

        <Link
          to="/"
          className="hover:bg-gray-100 block h-full py-2 lg:py-4 xl:py-6 px-4"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex justify-center items-center w-10 h-10 rounded-xl 
                        bg-gradient-to-br from-blue-500 to-purple-500 
                        text-white font-extrabold text-2xl  animate-bounce -mb-4"
            >
              C
            </div>

            <h1
              className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-500 to-purple-500 
                       bg-clip-text text-transparent"
            >
              Connectly
            </h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 px-4">
          {/* Notification Icon */}
          <div className="relative cursor-pointer">
            <IoIosNotifications className="text-gray-700 text-3xl" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs px-1.5 py-[1px] rounded-full">
              3
            </span>
          </div>

          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `px-5 py-2 rounded-2xl font-semibold text-lg transition
     ${
       isActive
         ? "bg-blue-500 text-white border-blue-500"
         : "border border-blue-500 text-blue-600 hover:bg-blue-50"
     }`
            }
          >
            Sign In
          </NavLink>

          <NavLink
            to="/auth/register"
            className={({ isActive }) =>
              `px-5 py-2 rounded-2xl font-semibold text-lg transition
     ${
       isActive
         ? "bg-purple-600 text-white border-purple-600"
         : "border border-purple-600 text-purple-600 hover:bg-blue-50"
     }`
            }
          >
            Get Started
          </NavLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <IoClose /> : <GiHamburgerMenu />}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-15 left-0 w-full bg-white shadow-md px-6 py-2 flex flex-col gap-4 md:hidden z-10">
            <div className="relative cursor-pointer self-start">
              <IoIosNotifications className="text-gray-700 text-3xl" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs px-1.5 py-[1px] rounded-full">
                3
              </span>
            </div>

            <Link to="/auth/login" className="w-full px-5 py-2 border border-blue-500 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition">
              Sign In
            </Link>

            <Link to="/auth/register" className="w-full px-5 py-2 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition">
              Get Started Free
            </Link>
          </div>
        )}
      </nav>
      <div className="h-15"></div>
    </>
  );
}
