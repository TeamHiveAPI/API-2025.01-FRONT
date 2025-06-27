import '@testing-library/jest-dom';

// Mock do window.alert
window.alert = jest.fn();

// Removido mock do localStorage para não interferir com testes E2E

// Configuração do ambiente de teste
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:5173',
    origin: 'http://localhost:5173'
  }
});