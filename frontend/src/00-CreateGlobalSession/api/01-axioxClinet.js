import axios from "axios";
 const axiosClient=axios.create({
   baseURL: `${import.meta.env.VITE_API_URL}/auth`,

    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Important for cookies

});



 


 axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;

 


    // Do NOT redirect when calling userDetails on login/register pages
    const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/forgot-password"];

    if (publicPaths.includes(window.location.pathname)) {
      return Promise.reject(error);
    }

    // 401 → Unauthorized (only for PROTECTED routes)
    if (status === 401) {
      console.log("Unauthorized, redirecting to home");
      window.location.href = "/";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);



export default axiosClient;

