import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";

export default function CriarEditarEstacao() {
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
  });

  const handleInputChange = (tag: string, value: string) => {
    setEndereco((prev) => ({
      ...prev,
      [tag]: value,
    }));
  };

  const enderecoFormatado =
    endereco.rua && endereco.numero && endereco.bairro && endereco.cidade && endereco.cep
      ? `${endereco.rua} - ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.cep}`
      : "Preencha todos os campos de endereço para gerar a formatação.";

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <h2 className="pagina_titulo">Criar Estação</h2>

          <form>
            <Input label="Nome" tag="nome" width={50} />

            <p className="subtitulo">Endereço</p>

            <div className="secao_input cima">
              <Input
                label="Rua"
                tag="rua"
                width={33}
                value={endereco.rua}
                onChange={(e) => handleInputChange("rua", e.target.value)}
              />
              <Input
                label="Bairro"
                tag="bairro"
                width={33}
                value={endereco.bairro}
                onChange={(e) => handleInputChange("bairro", e.target.value)}
              />
              <Input
                label="Cidade"
                tag="cidade"
                width={33}
                value={endereco.cidade}
                onChange={(e) => handleInputChange("cidade", e.target.value)}
              />
            </div>

            <div className="secao_input cima">
              <Input
                label="CEP"
                tag="cep"
                width={25}
                value={endereco.cep}
                onChange={(e) => handleInputChange("cep", e.target.value)}
              />
              <Input
                label="Número"
                tag="numero"
                width={25}
                value={endereco.numero}
                onChange={(e) => handleInputChange("numero", e.target.value)}
              />
              <Input label="Latitude" tag="latitude" width={33} />
              <Input label="Longitude" tag="longitude" width={33} />
            </div>

            <div className="cees_card_endereco">
              <h4>Endereço Formatado:</h4>
              <p>{enderecoFormatado}</p>
            </div>
            <div className="cima80">
              <BotaoCTA aparencia={"primario"} cor="cor_primario" escrito="Cadastrar Estação" img={<IconPlus stroke="2" />}/>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}