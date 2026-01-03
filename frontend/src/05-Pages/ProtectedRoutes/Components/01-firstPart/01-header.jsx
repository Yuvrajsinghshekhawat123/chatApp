import { CgProfile } from "react-icons/cg";
import { BsChatLeftText, BsChatLeftTextFill } from "react-icons/bs";
import { HiOutlineUserGroup, HiUserCircle, HiUserGroup } from "react-icons/hi2";
import Swal from "sweetalert2";
import { IoIosLogOut } from "react-icons/io";
import { useLogout } from "../../../../03-features/user/hook/useLogout";
import { toast } from "react-toastify";
import {  useQueryClient } from "@tanstack/react-query";
 
 
import { useNavigate } from "react-router-dom";

export function Header({ activePage, setActivePage , userDetail}) {
    const queryClient = useQueryClient();
   const navigate = useNavigate(); // ⭐ FIX
    const {mutate:userLogout}=useLogout();
    function handlelogout(){
        
      userLogout(undefined,{
        onSuccess: async (data) => {
          
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: ["userDetails"] });
          navigate("/", { replace: true });  
         
      },
      onError:(err)=>toast.error(err.response?.data?.message || "Something went wrong!"),
      
      })
    }
  
  return (
    <>
      <section className="flex flex-col  items-center justify-between w-full h-full py-5 ">
        <section className="space-y-4 ">
          <div
            onClick={() => setActivePage("chats")}
            className={`h-12 w-12 rounded-full flex justify-center items-center cursor-pointer relative group
              ${activePage === "chats" ? "bg-gray-700 " : "hover:bg-gray-700"}`}
          >
            {activePage === "chats" ? (
              <BsChatLeftTextFill className="text-2xl inline" />
            ) : (
              <BsChatLeftText className="text-2xl inline" />
            )}
            {/* text visible ONLY on hover */}
            <p
              className="absolute left-14 top-1/2 -translate-y-1/2 
                  bg-white text-black text-sm px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              Chats
              {/* pointer-events-none==it disables the mouse interactions for that element.        */}
            </p>
          </div>
          <div
            onClick={() => setActivePage("groups")}
            className={`h-12 w-12 rounded-full flex justify-center items-center cursor-pointer relative group
              ${
                activePage === "groups" ? "bg-gray-700 " : "hover:bg-gray-700"
              }`}
          >
            {activePage === "groups" ? (
              <HiUserGroup className="text-4xl inline" />
            ) : (
              <HiOutlineUserGroup className="text-4xl inline" />
            )}
            <p
              className="z-10 absolute left-14 top-1/2 -translate-y-1/2 
                  bg-white text-black text-sm px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              Communities
              {/* pointer-events-none==it disables the mouse interactions for that element.        */}
            </p>
          </div>
        </section>

        <section className="space-y-4 ">
          <div
            onClick={() => {
              Swal.fire({
                title: "Logout?",
                text: "Are you sure you want to logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Logout",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#dc2626",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.close();      // 👈 instantly closes popup
                  handlelogout();
                }
              });
            }}
            className={`h-12 w-12 rounded-full flex justify-center items-center cursor-pointer relative group
    ${activePage === "logout" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <IoIosLogOut className="text-3xl" />

            {/* Hover Tooltip */}
            <p
              className="absolute left-14 top-1/2 -translate-y-1/2 
        bg-white text-black text-sm px-2 py-1 rounded-md
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none"
            >
              Logout
            </p>
          </div>

          <div
            onClick={() => setActivePage("profile")}
            className={`h-12 w-12 rounded-full flex justify-center items-center cursor-pointer relative group
              ${
                activePage === "profile" ? "bg-gray-700 " : "hover:bg-gray-700"
              }`}
          >
            {activePage === "profile" ? (
              <HiUserCircle className="text-4xl inline" />
            ) : (
              <CgProfile className="text-3xl" />
            )}
            <p
              className="absolute left-14 top-1/2 -translate-y-1/2 
                  bg-white text-black text-sm px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              Profile
              {/* pointer-events-none==it disables the mouse interactions for that element.        */}
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
