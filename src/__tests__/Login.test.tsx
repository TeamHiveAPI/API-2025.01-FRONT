/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login/Login';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Mock do hook useNavigate apenas para verificar a navegação
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    BrowserRouter: actual.BrowserRouter
  };
});

import api from '../services/api';

describe('Login e Criação de Estação Integration Test', () => {
  it('realiza login com sucesso e cria uma estação', async () => {
    render(
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // Login
    const emailInput = screen.getAllByPlaceholderText('Digite aqui...')[0];
    const passwordInput = screen.getAllByPlaceholderText('Digite aqui...')[1];
    const submitButton = screen.getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: 'teste' } });

    fireEvent.click(submitButton);

    // Aguarda o redirecionamento após o login
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });

    // Cria uma nova estação
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
    
    // Faz a requisição para criar a estação
    const response = await api.post('/estacoes/', novaEstacao);

    // Verifica se a estação foi criada corretamente
    expect(response.status).toBe(200);
    expect(response.data.nome).toBe(novaEstacao.nome);
    expect(response.data.cep).toBe(novaEstacao.cep);
    expect(response.data.rua).toBe(novaEstacao.rua);
    expect(response.data.bairro).toBe(novaEstacao.bairro);
    expect(response.data.cidade).toBe(novaEstacao.cidade);
    expect(response.data.numero).toBe(novaEstacao.numero);
    expect(response.data.latitude).toBe(novaEstacao.latitude);
    expect(response.data.longitude).toBe(novaEstacao.longitude);
    expect(response.data.data_instalacao).toBe(novaEstacao.data_instalacao);
    expect(response.data.status).toBe(novaEstacao.status);

// Verifica se foi redirecionado após o login
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
   });
});