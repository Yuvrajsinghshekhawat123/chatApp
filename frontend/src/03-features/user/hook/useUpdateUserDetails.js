import { useMutation } from "@tanstack/react-query";
import { UpdateUserDetails } from "../01-api/01-login";


export function useUpdateUserDetails(){
    return useMutation({
        mutationFn:UpdateUserDetails
    });
}