//📌 AuthRoute.jsx (hide auth pages for logged-in users)
import { Navigate, Outlet } from "react-router-dom";
import { useLoginUserDetails } from "../../00-CreateGlobalSession/hook/03-useData";
import { ClipLoader } from "react-spinners";
 

export function AuthRoute() {
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



  // If user is logged in → redirect to dashboard
  if (user) return <Navigate to="/user/dashboard" replace />;

  return <Outlet />;
}
