import { JSX } from "react";
import { useAuth } from "../../hooks/UseAuth";
import AcessoNegado from "../../pages/AcessoNegado/AcessoNegado";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AcessoNegado />;
  }

  return children;
}
