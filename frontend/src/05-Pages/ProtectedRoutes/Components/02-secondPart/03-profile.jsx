import { MdEdit } from "react-icons/md";
import { EditAvatar } from "../../../../03-features/user/02-components/EditAvatar/editAvatar";
import { useEffect, useState } from "react";
import { useUpdateUserDetails } from "../../../../03-features/user/hook/useUpdateUserDetails";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import { email } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../03-features/user/hook/01-useSlice";
import { useLoginUserDetails } from "../../../../00-CreateGlobalSession/hook/03-useData";


export function Profile() {
    const navigate=useNavigate();
     const dispatch = useDispatch();
     
     const { data: userDetail, isLoading, refetch } = useLoginUserDetails();

useEffect(() => {
  refetch();  // <---- forces data refresh when returning to this page
}, []);


  // Static fallback values
  const fallback = {
    name: "Guest User",
    email: "guest@example.com",
    mobile: "+91 9876543210",
    avatar: null,
    created_at: "2023-01-01",
    last_login_date: "2024-01-01",
  };

  // Merge with userDetail
  const data = {
    name: userDetail?.name || fallback.name,
    email: userDetail?.email || fallback.email,
    mobile: userDetail?.mobile || fallback.mobile,
    avatar: userDetail?.avatar || fallback.avatar,
    created_at: userDetail?.created_at || fallback.created_at,
    last_login_date: userDetail?.last_login_date || fallback.last_login_date,
  };

  const [isOpen2, setIsOpen2] = useState(false);

  // Inline edit states
  const [editing, setEditing] = useState(null); // "name" | "email" | "mobile"
  const [tempValue, setTempValue] = useState("");
  const [processing, setProcessing] = useState(false);

  const { mutate: edit } = useUpdateUserDetails();
  const queryClient = useQueryClient();


  function startEdit(field, value) {
    setEditing(field);
    setTempValue(value);
  }

  function cancelEdit() {
    setEditing(null);
    setTempValue("");
  }

  function saveEdit(field) {
    const newValue = tempValue.trim() === "" ? data[field] : tempValue;
    setProcessing(true);
    // TODO → Backend API call
    // updateUser({ field, value: tempValue })
    const formData = new FormData();
    formData.append(`${field}`, newValue);
    edit(formData, {
      onSuccess: async (data) => {
        toast.success(data.message);

        setEditing(null);
        setTempValue("");

        
        await queryClient.invalidateQueries({ queryKey: ["userDetails"] });

        if (field == "email") {
            
            
        dispatch(setUser({name:userDetail.name, email: newValue }));
          navigate("verify-email");
        }


      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Something went wrong"); // asios error
      },
      onSettled: () => {
        setProcessing(false); // Stop processing after request acompletes
      },
    });
  }


     if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <ClipLoader color="#2563eb" loading size={50} />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">Profile</h1>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-6 py-6 px-6 w-full max-w-xl bg-[#202c33] shadow-lg rounded-xl text-white">
          {/* Avatar */}
          <div
            className="w-32 h-32 rounded-full border-2 border-black flex items-center justify-center 
                          bg-gradient-to-br from-[#1f2c34] via-[#182229] to-[#0b141a]
                          relative shadow-xl"
          >
            {data.avatar ? (
              <img
                src={data.avatar}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-6xl font-bold">
                {data.name[0].toUpperCase()}
              </div>
            )}

            {/* Edit Avatar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 bg-[#1f2c34] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer group border border-gray-700">
              {" "}
              <MdEdit
                onClick={() => setIsOpen2(true)}
                size={20}
                className="text-white "
              />
              {/* Tooltip */} 
              <p className="absolute left-12 top-1/2 -translate-y-1/2 bg-[#1f2c34] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700 pointer-events-none">
                
                Edit Avatar 
              </p>
            </div>
          </div>

          {/* ======================== NAME ========================== */}
          <div className="w-full bg-[#111b21] p-4 rounded-lg shadow-md">
            {editing === "name" ? (
              <div className="flex justify-between items-center">
                <input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="bg-[#1f2c34] text-white px-3 py-2 rounded border border-gray-600 w-2/3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit("name")}
                    className="px-3 py-1 bg-green-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <ClipLoader
                          className=""
                          color="white"
                          loading
                          size={22}
                        />{" "}
                        <span>Saving...</span>{" "}
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-red-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-lg font-semibold">{data.name}</p>
                </div>

                <button
                  onClick={() => startEdit("name", data.name)}
                  className="text-gray-500 hover:text-white hover:bg-gray-800 rounded-full p-2 cursor-pointer relative group"
                >
                  <MdEdit size={22} />
                  <p className="absolute -right-5 top-13 bg-[#1f2c34] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700 pointer-events-none">
                    Edit Name
                  </p>
                </button>
              </div>
            )}
          </div>

          {/* ======================== EMAIL ========================== */}
          <div className="w-full bg-[#111b21] p-4 rounded-lg shadow-md">
            {editing === "email" ? (
              <div className="flex justify-between items-center">
                <input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="bg-[#1f2c34] text-white px-3 py-2 rounded border border-gray-600 w-2/3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit("email")}
                    className="px-3 py-1 bg-green-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <ClipLoader
                          className=""
                          color="white"
                          loading
                          size={22}
                        />{" "}
                        <span>Saving...</span>{" "}
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-red-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg">{data.email}</p>
                </div>

                <button
                  onClick={() => startEdit("email", data.email)}
                  className="text-gray-500 hover:text-white hover:bg-gray-800 rounded-full p-2 cursor-pointer relative group"
                >
                  <MdEdit size={22} />
                  <p className="absolute -right-5 top-13 bg-[#1f2c34] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700 pointer-events-none">
                    Edit Email
                  </p>
                </button>
              </div>
            )}
          </div>

          {/* ======================== PHONE ========================== */}
          <div className="w-full bg-[#111b21] p-4 rounded-lg shadow-md">
            {editing === "mobile" ? (
              <div className="flex justify-between items-center">
                <input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="bg-[#1f2c34] text-white px-3 py-2 rounded border border-gray-600 w-2/3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit("mobile")}
                    className="px-3 py-1 bg-green-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <ClipLoader
                          className=""
                          color="white"
                          loading
                          size={22}
                        />{" "}
                        <span>Saving...</span>{" "}
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-red-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center ">
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-lg">{data.mobile}</p>
                </div>

                <button
                  onClick={() => startEdit("mobile", data.mobile)}
                  className="text-gray-500 hover:text-white hover:bg-gray-800 rounded-full p-2 cursor-pointer relative group"
                >
                  <MdEdit size={22} />
                  <p className="absolute -right-5 top-13 bg-[#1f2c34] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700 pointer-events-none">
                    Edit Number
                  </p>
                </button>
              </div>
            )}
          </div>

          {/* ======================== DATES ========================== */}
          <div className="w-full bg-[#111b21] p-4 rounded-lg shadow-md space-y-2">
            <p className="text-gray-400">
              <span className="font-semibold text-white">Member since: </span>
              {new Date(data.created_at).toLocaleDateString("en-US")}
            </p>

            <p className="text-gray-400">
              <span className="font-semibold text-white">Last login: </span>
              {new Date(data.last_login_date).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen2 && (
        <div>
          <div className="fixed inset-0 bg-black/40 z-40"></div>
          <EditAvatar setIsOpen={setIsOpen2} />
        </div>
      )}
    </section>
  );
}
