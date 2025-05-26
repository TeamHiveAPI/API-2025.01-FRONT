import "./styles.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import BarraCima from "../../components/BarraCima/BarraCima";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import InputPesquisa from "../../components/InputPesquisa/InputPesquisa";
import { useDebounce } from "../../hooks/useDebounce";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

export interface Usuario {
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
  
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
    usuario.email.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (usuario: Usuario) => {
    navigate(`/usuarios/editar/${usuario.id}`, { state: usuario });
  };

  return (
    <PaginaWrapper>
      <BarraCima nome="Usuários" tipo="usuario" />
  
      <h4 className="num_cadastros">{`${usuarios.length} usuários cadastrados`}</h4>
  
      <InputPesquisa value={searchText} onChange={setSearchText} />
  
      <div className="usu_lista">
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((usuario) => (
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
          <p className="card_nenhum">Nenhum usuário encontrado.</p>
        )}
      </div>
    </PaginaWrapper>
  );
}