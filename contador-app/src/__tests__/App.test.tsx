import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Selector Numérico - Funcionalidad Básica', () => {
  test('Muestra un contador con valor inicial configurable', () => {
    render(<App />);
    const counterValue = screen.getByText('5'); // Valor inicial por defecto
    expect(counterValue).toBeInTheDocument();
  });
});

describe('Botón incremento - Funcionalidad Básica', () => {
  test('Comprueba incremento mostrado mediante un botón', async () => {
    render(<App />);
    const counterValue = screen.getByText('5'); // Valor inicial por defecto
    const button = screen.getByText('+')
    await userEvent.click(button);
    expect(counterValue).toHaveTextContent("6");
  });
});

describe('Botón decremento - Funcionalidad Básica', () => {
  test('Comprueba que se decrementa valor mostrado mediante un botón', async () => {
    render(<App />);
    const counterValue = screen.getByText('5'); // Valor inicial por defecto
    const button = screen.getByText('-')
    await userEvent.click(button);
    expect(counterValue).toHaveTextContent("4");
  });
});