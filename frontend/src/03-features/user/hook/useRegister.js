import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../01-api/02-register";

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}
