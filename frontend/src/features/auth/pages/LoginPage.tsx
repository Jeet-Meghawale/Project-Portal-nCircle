import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        color:"black"
      }}
    >
      <LoginForm onSubmit={login} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;