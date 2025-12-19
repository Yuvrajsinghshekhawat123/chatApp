import { useState } from "react";
import { Header } from "./Components/01-firstPart/01-header";
import { Chats } from "./Components/02-secondPart/01-chats/01-chats";
import { Groups } from "./Components/02-secondPart/02-groups";
import { Profile } from "./Components/02-secondPart/03-profile";
import { Logout } from "./Components/02-secondPart/04-logut";
import { useLoginUserDetails } from "../../00-CreateGlobalSession/hook/03-useData";
import { ClipLoader } from "react-spinners";
import { ProfileThirdPart } from "./Components/03-thirdPart/01-profile";

export default function Dashboard() {


  const { data: user,isLoading } = useLoginUserDetails();
   if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <ClipLoader color="#2563eb" loading size={50} />
        </div>
      </div>
    );

  }

  console.log()


  
  const [activePage, setActivePage] = useState("chats");
  const [searchText,setSearchText]=useState("");

  return (
    <>
      <section className="grid grid-cols-[5%_30%_65%] w-full h-screen">
        <section className="bg-[#202c33] text-white border-r border-gray-700">
          {/* header */}
          <Header activePage={activePage} setActivePage={setActivePage} userDetail={user} />
        </section>

        <section className="bg-[#111b21] text-white  py-4 border-r border-gray-700">
          {activePage === "chats" && <Chats searchText={searchText} setSearchText={setSearchText}/>}
          {activePage === "groups" && <Groups />}
          {activePage === "profile" && <Profile    />}
          {activePage === "logout" && <Logout />}
        </section>

        <section className="bg-[#191c1e]">
            
           
          {activePage === "profile" && <ProfileThirdPart/>}
          
        </section>
      </section>
    </>
  );
}
