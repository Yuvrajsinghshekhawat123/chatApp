import { useState } from "react";
import { Members } from "../../../../../../02-Components/04-Chats/01-All/01-members";

 export const membersData = [
  {
    id: 1,
    name: "Yuvraj",
    lastMessage: "Hey, how are you?",
    time: "10:20 PM",
    unreadCount: 2,
    isOnline: true,
    type: "single",
    avatar: "/avatars/yuvraj.jpg",
  },
  {
    id: 2,
    name: "Aman",
    lastMessage: "Project done 👍",
    time: "9:45 PM",
    unreadCount: 0,
    isOnline: false,
    type: "single",
    avatar: "/avatars/aman.jpg",
  },
  {
    id: 3,
    name: "Riya",
    lastMessage: "Call me when free",
    time: "8:30 PM",
    unreadCount: 1,
    isOnline: true,
    type: "single",
    avatar: "/avatars/riya.jpg",
  },
  {
    id: 4,
    name: "College Friends",
    lastMessage: "Meeting at 6?",
    time: "Yesterday",
    unreadCount: 5,
    isOnline: false,
    type: "group",
    avatar: "/avatars/group.png",
  },

  // auto-generate more
  ...Array.from({ length: 16 }, (_, i) => ({
    id: i + 5,
    name: `Member ${i + 5}`,
    lastMessage: "Last message preview...",
    time: "Yesterday",
    unreadCount: i % 4 === 0 ? 3 : 0,
    isOnline: i % 2 === 0,
    type: "single",
    avatar: null,
  })),
];



 


export function All(){
    const [selectedUserId, setSelectedUserId] = useState(null);
    

    
    return (<>
         <div className="w-full space-y-2">
      {membersData.map((member) => (
        <Members key={member.id} data={member} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}  />
      ))}
    </div>
    </>)
}








/*
👉 Don’t load everything everywhere
    Big apps (WhatsApp, Telegram, Slack) do NOT load full data at once.
    They load only what is needed for that screen.


🧠 Core idea (simple)
Chat list tells you what type of chat it is
When user clicks a chat
If type === "group" → fetch group details
Else → fetch 1-to-1 chat messages




*/