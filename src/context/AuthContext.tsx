import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  token: string;
  user_id: number;
  user_email: string;
  user_nivel: string;
  user_nome : string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // carregar usuário do localStorage ao iniciar
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const user_email = localStorage.getItem("user_email");
    const user_nivel = localStorage.getItem("user_nivel");
    const user_nome = localStorage.getItem("user_nome");

    if (token && user_id && user_email && user_nivel && user_nome) {
      setUser({
        token,
        user_id: parseInt(user_id),
        user_email,
        user_nivel,
        user_nome,
      });
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user_id", userData.user_id.toString());
    localStorage.setItem("user_email", userData.user_email);
    localStorage.setItem("user_nivel", userData.user_nivel);
    localStorage.setItem("user_nome", userData.user_nome);

    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
