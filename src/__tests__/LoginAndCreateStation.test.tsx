import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import CriarEditarEstacao from "../pages/CriarEditarEstacao/CriarEditarEstacao";
import Login from "../pages/Login/Login";
import { AuthProvider } from "../context/AuthContext";
import api from "../services/api";

// Mock da API
jest.mock("../services/api");

const mockApi = api as jest.Mocked<typeof api>;

describe("Login e Criação de Estação Integration Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock do login
    mockApi.post.mockImplementation((url) => {
      if (url === "/auth/login") {
        return Promise.resolve({
          status: 200,
          data: {
            access_token: "fake-token",
            user_id: 1,
            user_email: "teste@teste.com",
            user_nivel: "ADMINISTRADOR",
            user_nome: "Usuário de Teste",
          },
        });
      }

      if (url === "/estacoes/") {
        return Promise.resolve({ status: 201 });
      }

      return Promise.reject(new Error("Unknown POST"));
    });

    // Mock dos sensores
    mockApi.get.mockImplementation((url) => {
      if (url === "/parametros") {
        return Promise.resolve({
          data: [
            { id: 1, nome: "Sensor 1" },
            { id: 2, nome: "Sensor 2" },
          ],
        });
      }

      return Promise.reject(new Error("Unknown GET"));
    });
  });

  test("realiza login e cria uma estação com sucesso", async () => {
    console.log("🔍 Teste iniciado");

    const { unmount } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Preenche login
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "teste@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "teste" },
    });

    // Submete login
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Espera o login ser enviado
    await waitFor(() =>
      expect(mockApi.post).toHaveBeenCalledWith("/auth/login", {
        username: "teste@teste.com",
        password: "teste",
      })
    );

    unmount(); // desmonta Login antes de montar CriarEditarEstacao

    // Monta o CriarEditarEstacao
    render(
      <MemoryRouter>
        <AuthProvider>
          <CriarEditarEstacao />
        </AuthProvider>
      </MemoryRouter>
    );

    console.log("✅ CriarEditarEstacao renderizado");

    // Preenche os campos obrigatórios
    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Estação Teste" },
    });
    fireEvent.change(screen.getByLabelText(/UID/i), {
      target: { value: "EST001" },
    });
    fireEvent.change(screen.getByLabelText(/Latitude/i), {
      target: { value: "-23.123" },
    });
    fireEvent.change(screen.getByLabelText(/Longitude/i), {
      target: { value: "-46.123" },
    });
    fireEvent.change(screen.getByLabelText(/Rua/i), {
      target: { value: "Rua Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Número/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/Bairro/i), {
      target: { value: "Bairro Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Cidade/i), {
      target: { value: "Cidade Teste" },
    });
    fireEvent.change(screen.getByLabelText(/CEP/i), {
      target: { value: "12345-678" },
    });

    // Submete o formulário
    fireEvent.click(screen.getByRole("button", { name: /cadastrar estação/i }));

    console.log("🚀 Formulário submetido");

    // Verifica se o POST de criação foi chamado corretamente
    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalledWith("/estacoes/", expect.objectContaining({
        nome: "Estação Teste",
        uid: "EST001",
        latitude: -23.123,
        longitude: -46.123,
        rua: "Rua Teste",
        numero: "123",
        bairro: "Bairro Teste",
        cidade: "Cidade Teste",
        cep: "12345-678",
        status: "ativa",
        sensores: [],
      }));
    });

    console.log("✅ Estação criada com sucesso");
  });
});
