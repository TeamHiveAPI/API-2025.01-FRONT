import { IconHelpCircle, IconX } from "@tabler/icons-react";
import "./styles.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalHelp({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal_mapa">
      <div className="modal_overlay" onClick={onClose} />
        <div className="modal_content menor">
            <div className="modal_mapa_cima modal_divisoria">
              <div>
                <IconHelpCircle stroke={2} color={"#5751D5"} width={32} height={32} />
                <p>Parâmetros de Busca Semântica</p>
              </div>
                <IconX width={32} height={32} color={"#404040"} onClick={onClose} />
            </div>
          <div className="modal_conteudo">
            <p className="modal_descricao">Adicione uma palavra-chave na sua pesquisa para filtrar os resultados. Por exemplo, ao pesquisar por
            "Estação Fatec" a pesquisa será feita apenas para estações, melhorando o desempenho da consulta. Use apenas uma palavra-chave por pesquisa.</p>
            <div className="modal_conteudo_container">
              <div className="modal_esq">
                <h4>Estação</h4>
                <div className="modal_tags">
                  <p>est</p>
                  <p>estacoes</p>
                  <p>estações</p>
                  <p>estação</p>
                  <p>estacao</p>
                </div>

                <h4 className="modal_mtop">Sensor</h4>
                <div className="modal_tags">
                  <p>sen</p>
                  <p>sensor</p>
                  <p>sensores</p>
                  <p>parâmetro</p>
                  <p>parâmetros</p>
                </div>

                <h4 className="modal_mtop">Tipo de Sensor</h4>
                <div className="modal_tags">
                  <p>ts</p>
                  <p>tipo</p>
                  <p>tipo sensor</p>
                  <p>tipo de sensor</p>
                </div>
              </div>

              <div className="modal_dir">
                <h4>Usuário</h4>
                <div className="modal_tags">
                  <p>usu</p>
                  <p>usuario</p>
                  <p>usuários</p>
                  <p>usuarios</p>
                </div>

                <h4 className="modal_mtop">Alerta Definido</h4>
                <div className="modal_tags">
                  <p>adef</p>
                  <p>def</p>
                  <p>alerta definido</p>
                  <p>alertas definidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}