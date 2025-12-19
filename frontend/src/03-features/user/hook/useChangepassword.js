import { useMutation } from "@tanstack/react-query";
import { ChangeUserPassword } from "../01-api/login";

export function     useChangepassword(){
    return useMutation({
        mutationFn:ChangeUserPassword
    })
}