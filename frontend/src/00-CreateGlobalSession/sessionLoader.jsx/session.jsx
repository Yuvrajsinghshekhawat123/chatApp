 import { queryClient } from "../../App";
import { LoginUserDetails } from "../api/02-userData";

export async function sessionLoader() {
  try {
    return await queryClient.fetchQuery({
      queryKey: ["userDetails"],
      queryFn: async () => {
        const res = await LoginUserDetails();
        return res.data;
      }
    });
  } catch {
    return null;
  }
}
