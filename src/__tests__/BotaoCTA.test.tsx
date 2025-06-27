import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BotaoCTA from '../components/BotaoCTA/BotaoCTA'; 

describe('BotaoCTA', () => {
  const renderWithRouter = (ui: React.ReactNode) => render(<BrowserRouter>{ui}</BrowserRouter>);

  test('renderiza botão primário com texto e sem link', () => {
    render(<BotaoCTA aparencia="primario" escrito="Clique Aqui" />);
    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toHaveClass('botao_cta_primario');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  test('renderiza botão secundário com link e imagem string', () => {
    renderWithRouter(
      <BotaoCTA
        aparencia="secundario"
        link="/teste"
        escrito="Ir para Teste"
        img="/icone.png"
      />
    );
    const link = screen.getByRole('link', { name: /ir para teste/i });
    expect(link).toHaveClass('botao_cta_secundario');
    expect(link).toHaveAttribute('href', '/teste');
    expect(screen.getByAltText('Ícone')).toHaveAttribute('src', '/icone.png');
  });

  test('renderiza botão com cor, pequeno e desativado', () => {
    render(
      <BotaoCTA
        aparencia="primario"
        cor="verde"
        pequeno
        desativado
        escrito="Desativado"
      />
    );
    const button = screen.getByRole('button', { name: /desativado/i });
    expect(button).toHaveClass(
      'botao_cta_primario',
      'botao_cta_verde',
      'botao_cta_pequeno',
      'botao_cta_desativado'
    );
    expect(button).toBeDisabled();
  });

  test('renderiza botão sem escrito e com ReactNode como imagem', () => {
    const customImg = <span data-testid="custom-img">Icone</span>;
    render(<BotaoCTA aparencia="secundario" img={customImg} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('botao_cta_secundario', 'botao_cta_sem_escrito');
    expect(screen.getByTestId('custom-img')).toBeInTheDocument();
  });

  test('chama onClick quando botão é clicado', () => {
    const handleClick = jest.fn();
    render(
      <BotaoCTA aparencia="primario" escrito="Clique" onClick={handleClick} />
    );
    const button = screen.getByRole('button', { name: /clique/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renderiza botão com type submit', () => {
    render(<BotaoCTA aparencia="primario" type="submit" escrito="Enviar" />);
    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('renderiza link com cor vermelha e sem escrito', () => {
    renderWithRouter(
      <BotaoCTA aparencia="secundario" link="/vermelho" cor="vermelho" />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'botao_cta_secundario',
      'botao_cta_vermelho',
      'botao_cta_sem_escrito'
    );
  });
});