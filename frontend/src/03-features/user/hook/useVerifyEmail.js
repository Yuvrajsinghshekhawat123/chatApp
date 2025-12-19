import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../01-api/02-register";
 

export function useVerifyEmail() {
    return useMutation({
        mutationFn:verifyEmail,
    });
}