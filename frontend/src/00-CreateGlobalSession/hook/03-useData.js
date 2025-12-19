 import { useQuery } from "@tanstack/react-query";
import { LoginUserDetails } from "../api/02-userData";

 export function useLoginUserDetails() {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      try {
        const response = await LoginUserDetails();

        // If no user → return null
        return response?.data?.id ? response.data : null;
      } catch {
        return null;
      }
    },

    // 🔥 ENSURE no old user is shown
    initialData: null,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    retry: false,

    // 🔥 Prevent back/forward history from restoring old data
    networkMode: "always",
  });
}

