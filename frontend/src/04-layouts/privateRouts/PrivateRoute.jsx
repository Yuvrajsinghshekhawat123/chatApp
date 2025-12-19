 import { Navigate, Outlet } from "react-router-dom";
import { useLoginUserDetails } from "../../00-CreateGlobalSession/hook/03-useData";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";

export function PrivateRoute() {

  const { data: user, isLoading} = useLoginUserDetails();

   
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <ClipLoader color="#2563eb" loading size={50} />
        </div>
      </div>
    );
  }

  // If user NOT logged in → redirect to login
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}
