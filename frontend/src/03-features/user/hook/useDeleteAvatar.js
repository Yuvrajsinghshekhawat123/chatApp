import { useMutation } from "@tanstack/react-query";
import { DeleteAvatar } from "../01-api/01-login";


export function useDeleteAvatar(){
    return useMutation({
        mutationFn:DeleteAvatar
    })
}