import axiosClient from "./00-axiosClient";

export async function LogutUser(data) {
    
    const response=await axiosClient.post("/logout",data);
    return response.data;
}
