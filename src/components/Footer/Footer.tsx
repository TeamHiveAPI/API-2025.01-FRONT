import "./styles.scss";
import { IconBrandGithubFilled } from "@tabler/icons-react";

export default function Footer() {

    return (
        <footer className="footer_container">
            <div className="footer_cima">
                <div className="footer_esq">
                    <h4>API 2025.01</h4>
                    <p>Fatec São José dos Campos - Prof. Jessen Vidal</p>
                </div>
                <div className="footer_dir">
                    <img src="../../public/logo_hive.svg" />
                    <a className="footer_botao" href="https://github.com/TeamHiveAPI/API-2025.01" target="_blank">
                    <IconBrandGithubFilled color="white"/> 
                    GitHub </a>
                </div>
            </div>
            <div className="footer_baixo">
                <p>Tecsus © Todos os direitos Reservados. 2025 - Desenvolvido por Team HIVE 2.0</p>
                <p>Política de Privacidade</p>
            </div>
        </footer>
    )
}