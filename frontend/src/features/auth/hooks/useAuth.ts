import { useMutation } from "@tanstack/react-query";
import authService from "../api/authService";
import { useAuthContext } from "../../../app/providers/AuthProvider";
import { LoginRequest } from "../types/authTypes";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),

        onSuccess: (data) => {
            // store user in context
            console.log("SUCCESS");
            setUser(data.user);

            // store access token only
            localStorage.setItem("accessToken", data.accessToken);

            if(data.user.role === "ADMIN"){
                navigate("/admin/dashboard");
            }else if(data.user.role === "COORDINATOR"){
                navigate("/coordinator/dashboard");
            }else if(data.user.role === "STUDENT"){
                navigate("/student/dashboard");
            }
        },

        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    const logout = async () => {
        try {
            await authService.logout();
        } catch (e) {
            console.log("Logout error", e);
        }

        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/login");
    };

    const login = (email: string, password: string) => {
        loginMutation.mutate({ email, password });
    };

    return {
        login,
        logout,
        isLoading: loginMutation.isPending,
    };
};