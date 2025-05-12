import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function PaginaWrapper({
  children,

}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth?.isAuthenticated ?? false;

  const wrapperClass = isAuthenticated ? "pagina_wrapper_login" : "pagina_wrapper_sem_login";
  const containerCimaClass = isAuthenticated ? "" : "pagina_container_cima_sem_login";
  const containerClass = isAuthenticated ? "pagina_container_login" : "pagina_container_sem_login";

  return (
    <div className={wrapperClass}>
      {isAuthenticated && <Sidebar />}
      {!isAuthenticated && <Navbar />}
      <div className={containerCimaClass}>
        <div className={containerClass}>
            {children}
        </div>
      </div>
      <Footer autenticado={isAuthenticated}/>
    </div>
  );
}