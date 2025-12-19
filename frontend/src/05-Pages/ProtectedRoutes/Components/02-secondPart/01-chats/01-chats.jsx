 import { useState } from "react";
import { MdOutlineAddComment } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import SearchBox from "./componenents/05- SearchBox";
import { All } from "./componenents/01-All";
import { Unread } from "./componenents/02-unRead";
import { Favourites } from "./componenents/03-Favourites";
import { Groups } from "../02-groups";

export  function Chats({ searchText, setSearchText }) {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <>
       <section className="h-[96vh] flex flex-col">

        {/* header */}
        <section className="shrink-0 px-6">

          <div className="w-full flex justify-between pb-4">
            <h1
              className="text-xl md:text-4xl font-bold text-white
                       bg-clip-text text-transparent"
            >
              Connectly
            </h1>

            <div className="flex justify-center items-center  pt-2 ">
              <div className="relative group ">
                <MdOutlineAddComment className=" text-3xl cursor-pointer" />
                <p
                  className="absolute  left-1/2 -translate-x-1/2 top-8
                  bg-white text-black text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-[90px]"
                >
                  New Chats
                </p>
              </div>
            </div>
          </div>

          {/* search box */}

          <div>
            <SearchBox searchText={searchText} setSearchText={setSearchText} />
          </div>


          <div className="flex gap-2 text-[#989a9c] ">
            <button onClick={()=>setActiveTab("all")} className={`rounded-3xl border border-[#353637]  p-1 px-3 font-bold text-lg cursor-pointer hover:bg-[#4a4b4c]  ${activeTab=="all" && "bg-green-800 hover:bg-green-700/50 text-white "} `}>All</button>
            <button onClick={()=>setActiveTab("unread")} className={`rounded-3xl border border-[#353637] p-1 px-2 font-bold text-lg cursor-pointer hover:bg-[#353637] ${activeTab=="unread" && "bg-green-800 hover:bg-green-700/50 text-white "} `}>Unread</button>
            <button onClick={()=>setActiveTab("favourites")} className={`rounded-3xl border border-[#353637] p-1 px-2 font-bold text-lg cursor-pointer hover:bg-[#353637] ${activeTab=="favourites" && "bg-green-800 hover:bg-green-700/50 text-white "} `}>Favourites</button>
            <button onClick={()=>setActiveTab("groups")} className={`rounded-3xl border border-[#353637] p-1 px-2 font-bold text-lg cursor-pointer hover:bg-[#353637] ${activeTab=="groups" && "bg-green-800 hover:bg-green-700/50 text-white "} `}>Groups</button>
          </div>


        </section>





      {/* body */}
    <section className="flex-1 overflow-y-auto mt-2 text-white text-xl custom-scrollbar">

  {activeTab === "all" && <All />}
  {activeTab === "unread" && <Unread />}
  {activeTab === "favourites" && <Favourites />}
  {activeTab === "groups" && <Groups />}
</section>

      </section>
    </>
  );
}
 