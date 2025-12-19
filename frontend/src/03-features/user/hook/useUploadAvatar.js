import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../01-api/01-login";
 
export function useUploadAvatar(){
    return useMutation({
        mutationFn:uploadAvatar
    })
}