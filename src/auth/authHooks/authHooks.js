import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/server/endPoint"
import { toast } from "sonner"
import useAuthStore from "@/store";
import { useNavigate } from "react-router";
export const useSignUp = () => {
    const queryClient = useQueryClient()
    let navigate = useNavigate();
    return useMutation({
        mutationFn: async (params) => {
            try {
                const response = await api?.authsignup?.create(params);
                return response?.data;
            } catch (error) {
                // Re-throw the error to be caught by the component
                throw error?.response?.data;
            }
        },
        onSuccess: (data) => {
            console.log(typeof data?.message, 'data?.message')
            toast.success(data?.message);
            navigate("/signin");
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}
export const useSignIn = () => {
    const login = useAuthStore((state) => state.login);
    let navigate = useNavigate();
    return useMutation({
        mutationFn: async (params) => {
            try {
                const response = await api?.authsignin?.create(params);
                const isAuth = await response?.data?.isAuth;
                login(isAuth);
                return response?.data
            } catch (error) {
                // Re-throw the error to be caught by the component
                throw error?.response?.data;
            }
        },
        onSuccess: (data) => {
            if (data !== undefined) {
                toast.success(data?.message);
            }
            navigate("/dashboard");
        },
        onError: (error) => {
            if (error !== undefined) {
            toast.error(error?.message)
            }
        }
    })
}
export const useLogout = () => {
    let navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            try {
                const response = await api?.authlogout?.create();
                return response?.data
            } catch (error) {
                // Re-throw the error to be caught by the component
                throw error?.response?.data;
            }
        },
        onSuccess: (data) => {
            if (data !== undefined) {
                toast.success(data?.message);
            }
            navigate("/signin");
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}