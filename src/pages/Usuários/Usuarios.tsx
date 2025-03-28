import "./styles.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardUsuario from "../../components/CardUsuario/CardUsuario";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  nivel_acesso: string;
  data_criacao: string;
}

export default function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Função para buscar os usuários do backend
  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const data: Usuario[] = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (usuario: Usuario) => {
    navigate(`/usuarios/editar/${usuario.id}`, { state: usuario });
  };

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Usuários" tipo="usuario" />

          <h4 className="num_cadastros">{`${usuarios.length} usuário${
            usuarios.length !== 1 ? "s" : ""
          } cadastrado${usuarios.length !== 1 ? "s" : ""}`}</h4>

          <div className="usu_lista">
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <CardUsuario
                  key={usuario.id}
                  id={usuario.id}
                  admin={usuario.nivel_acesso === "ADMINISTRADOR"}
                  nome={usuario.nome}
                  email={usuario.email}
                  senha={usuario.senha}
                  data_criacao={new Date(usuario.data_criacao).toLocaleDateString()}
                  onEdit={() => handleEdit(usuario)}
                />
              ))
            ) : (
              <p className="card_nenhum">Nenhum usuário cadastrado.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}