import { useMutation } from "@tanstack/react-query";
import { ResendCode } from "../01-api/02-register";

export function useResendCode() {
  return useMutation({
    mutationFn: ResendCode,
  });
}
