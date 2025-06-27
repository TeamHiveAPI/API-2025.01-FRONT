import '@testing-library/jest-dom';

// Mock do window.alert
window.alert = jest.fn();

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Configuração do ambiente de teste
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:5173',
    origin: 'http://localhost:5173'
  },
  writable: true
});

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.clear.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.key.mockClear();
});