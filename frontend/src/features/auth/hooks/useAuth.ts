import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../api/authService";
import { useAuthContext } from "../../../app/providers/AuthProvider";
import { LoginRequest } from "../types/authTypes";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { setUser } = useAuthContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // ✅ ADD THIS

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),

        onSuccess: (data) => {
            console.log("SUCCESS");

            // ✅ store token FIRST
            localStorage.setItem("accessToken", data.accessToken);

            // ✅ set user in context
            setUser(data.user);

            // ✅ VERY IMPORTANT → refresh user-related queries
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });

            // ✅ redirect based on role
            if (data.user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (data.user.role === "COORDINATOR") {
                navigate("/coordinator/dashboard");
            } else if (data.user.role === "STUDENT") {
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

        // ✅ remove token
        localStorage.removeItem("accessToken");

        // ✅ clear React Query cache (VERY IMPORTANT)
        queryClient.clear();

        // ✅ clear context
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