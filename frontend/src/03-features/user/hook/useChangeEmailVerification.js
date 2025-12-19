import { useMutation } from "@tanstack/react-query";
import { ChangeEmailVerification } from "../01-api/01-login";
 

export function useChangeEmailVerification(){
    return useMutation({
        mutationFn:ChangeEmailVerification
    })
}