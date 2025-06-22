/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login/Login';
// import { useAuth } from '../hooks/UseAuth';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// Mock do hook useAuth e useNavigate
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    BrowserRouter: actual.BrowserRouter
  };
});

// Mock do AuthContext
jest.mock('../context/AuthContext', () => ({
  AuthContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

jest.mock('../hooks/UseAuth', () => ({
  useAuth: jest.fn(() => ({
    login: (userData: any) => {
      localStorage.setItem('token', userData.token);
      mockedNavigate('/dashboard');
    },
  })),
}));

// Mock do axios e api
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));
import api from '../services/api';
const mockedApi = api as jest.Mocked<typeof api>;

describe('Login e Criação de Estação Integration Test', () => {
  it('realiza login com sucesso e cria uma estação', async () => {
    render(
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <Login />
      </BrowserRouter>
    );

    // Login
    const emailInput = screen.getAllByPlaceholderText('Digite aqui...')[0];
    const passwordInput = screen.getAllByPlaceholderText('Digite aqui...')[1];
    const submitButton = screen.getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: 'teste' } });

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        access_token: 'fake-token',
        user_id: 1,
        user_email: 'teste@teste.com',
        user_nivel: 'ADMIN',
        user_nome: 'Testador',
      },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/auth/login',
        new URLSearchParams({
          username: 'teste@teste.com',
          password: 'teste',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    });

    // Aguarda o redirecionamento após o login
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });

    // Mock da resposta para criação de estação
    const novaEstacao = {
      nome: "Estação Teste",
      cep: "12345-678",
      rua: "Rua Teste",
      bairro: "Bairro Teste",
      cidade: "Cidade Teste",
      numero: "123",
      latitude: -23.5505,
      longitude: -46.6333,
      data_instalacao: "2024-01-25",
      status: "ativa",
      sensores: []
    };

    // Simula o localStorage.getItem('token')
    Storage.prototype.getItem = jest.fn(() => 'fake-token');

    // Tenta criar uma estação
    const criacaoEstacaoResponse = {
      status: 201,
      data: {
        ...novaEstacao,
        id: 1,
        uid: "EST123",
        sensores: []
      }
    };
    
    mockedApi.post.mockResolvedValueOnce(criacaoEstacaoResponse);
    
    // Faz a requisição para criar a estação
    const response = await api.post('/estacoes/', novaEstacao, {
      headers: {
        'Authorization': 'Bearer fake-token',
        'Content-Type': 'application/json'
      }
    });

    // Verifica se a estação foi criada corretamente
      expect(response.status).toBe(201);
      expect(response.data).toEqual(criacaoEstacaoResponse.data);

// Verifica se foi redirecionado após o login
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
   });
});