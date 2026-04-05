import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import authService from "../../features/auth/api/authService";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Auto login (restore session)
  useEffect(() => {
  const fetchUser = async () => {
    try {
      // 1️⃣ Try normal request
      const user = await authService.getCurrentUser();
      setUser(user);

    } catch (error) {
      console.log("Access token failed → trying refresh");

      try {
        // 2️⃣ Try refresh
        const res = await authService.refreshToken();

        // 3️⃣ Save new access token
        localStorage.setItem("accessToken", res.accessToken);

        // 4️⃣ Retry /auth/me
        const user = await authService.getCurrentUser();
        setUser(user);

      } catch (err) {
        console.log("Refresh failed → logout");

        // 5️⃣ Logout if refresh fails
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};