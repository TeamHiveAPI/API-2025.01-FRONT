import "./styles.scss";
import { IconBrandGithubFilled } from "@tabler/icons-react";

export default function Footer({ autenticado = true }: { autenticado?: boolean }) {
    
    const footerClass = autenticado ? "footer_container" : "footer_container sem_login";

    return (
        <footer className={footerClass}>
            <div className="footer_cima">
                <div className="footer_esq">
                    <h4>API 2025.01</h4>
                    <p>Fatec São José dos Campos - Prof. Jessen Vidal</p>
                </div>
                <div className="footer_dir">
                    <img src="../../logo_hive.svg" />
                    <a className="footer_botao" href="https://github.com/TeamHiveAPI/API-2025.01" 
                    target="_blank" 
                    rel="noopener noreferrer">
                        <IconBrandGithubFilled color="white" />
                        GitHub
                    </a>
                </div>
            </div>
            <div className="footer_baixo">
                <p>Tecsus © Todos os direitos Reservados. 2025 - Desenvolvido por Team HIVE 2.0</p>
                <p>Política de Privacidade</p>
            </div>
        </footer>
    );
}