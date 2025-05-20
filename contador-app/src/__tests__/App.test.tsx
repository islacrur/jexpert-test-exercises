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

describe('Mínimo Valor - Funcionalidad Básica', () => {
  test('Comprueba que el mínimo valor es 1', async () => {
    render(<App initialCount={1}/>);
    const counterValue = screen.getByText('1'); // Valor inicial por defecto
    const button = screen.getByText('-')
    await userEvent.click(button);   
    await userEvent.click(button);   
   expect(counterValue).toHaveTextContent("1");
  });
});


describe('Máximo valor - Funcionalidad Básica', () => {
  test('Comprueba que el máximo valor es 10', async () => {
    render(<App initialCount={10}/>);
    const counterValue = screen.getByText('10'); // Valor inicial por defecto
    const button = screen.getByText('+')
    await userEvent.click(button);   
    await userEvent.click(button);   
   expect(counterValue).toHaveTextContent("10");
  });
});

describe('Selector Numérico - Funcionalidad Básica', () => {
  test('El título de la aplicación debe ser personalizable', () => {
    render(<App title='Holakjhdkas'/>);
    const counterValue = screen.getByRole('heading', {level:1}); // Valor inicial por defecto   
    expect(counterValue).toHaveTextContent("Holakjhdkas");
  });
});

