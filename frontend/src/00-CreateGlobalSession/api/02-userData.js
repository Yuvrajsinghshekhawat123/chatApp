import axiosClient from "./01-axioxClinet";



export async function LoginUserDetails() {
    const res=await axiosClient.get("/userDetails");
    return res.data;
}