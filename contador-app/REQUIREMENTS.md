# Requisitos y Tests del Juego "Adivina el Número"

## Requisitos Funcionales

### Funcionalidad Básica del Selector Numérico
1. El usuario debe poder ver un número mostrado en pantalla.
2. El usuario debe poder incrementar el valor mostrado mediante un botón dedicado.
3. El usuario debe poder decrementar el valor mostrado mediante un botón dedicado.
4. El contador debe estar limitado entre los valores 1 y 10.
5. La aplicación debe mostrar un título descriptivo en la parte superior.
6. El título de la aplicación debe ser personalizable.
7. El valor inicial del contador debe ser configurable.

### Interfaz y Experiencia de Usuario
8. Los botones de incremento y decremento deben ser perfectamente circulares.
9. El diseño debe mantener un ancho constante independientemente del contenido.
10. La aplicación debe ofrecer una retroalimentación visual clara sobre las acciones del usuario.
11. La aplicación debe mostrar inicialmente un mensaje informativo indicando que no se ha realizado ninguna selección.

### Mecánica del Juego
12. Al iniciar la aplicación, se debe generar un número aleatorio entre 1 y 10 que el usuario debe adivinar.
13. El usuario debe poder seleccionar un número usando los botones de incremento y decremento.
14. El usuario debe poder verificar su selección mediante un botón "Comprobar".
15. Si el número seleccionado no coincide con el número aleatorio, la aplicación debe mostrar un mensaje de error.
16. Si el número seleccionado coincide con el número aleatorio, la aplicación debe mostrar un mensaje de éxito.

### Interacciones Avanzadas
17. Una vez que el usuario verifica su selección, el botón "Comprobar" debe deshabilitarse.
18. Los mensajes de error deben mostrarse en color rojo para indicar claramente el fallo.
19. Los mensajes de éxito deben mostrarse en color verde para indicar claramente el acierto.
20. Después de verificar la selección, debe aparecer un botón "Reiniciar" que permita al usuario comenzar un nuevo juego.
21. Al reiniciar el juego, se debe generar un nuevo número aleatorio, restablecer el contador y limpiar los mensajes anteriores.

## Tests Funcionales

```jsx
// src/__tests__/App.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import { RandomNumberService } from '../services/randomNumber';

// Mockear la función específica del servicio
vi.spyOn(RandomNumberService, 'getRandomNumber');

describe('Selector Numérico - Funcionalidad Básica', () => {
  test('Muestra un contador con valor inicial configurable', () => {
    render(<App />);
    const counterValue = screen.getByText('5'); // Valor inicial por defecto
    expect(counterValue).toBeInTheDocument();
  });

  test('Muestra un título en la aplicación', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  test('Contiene botones de incremento, decremento y verificación', () => {
    render(<App />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    const checkButton = screen.getByText('Comprobar');
    
    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(checkButton).toBeInTheDocument();
  });

  test('Permite personalizar el título y valor inicial', () => {
    render(<App title="Test Title" initialCount={8} />);
    
    const title = screen.getByText('Test Title');
    const counterValue = screen.getByText('8');
    
    expect(title).toBeInTheDocument();
    expect(counterValue).toBeInTheDocument();
  });
});

describe('Selector Numérico - Operaciones Básicas', () => {
  test('Incrementa el contador al pulsar el botón correspondiente', () => {
    render(<App initialCount={5} />);
    
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    
    const counterValue = screen.getByText('6');
    expect(counterValue).toBeInTheDocument();
  });

  test('Decrementa el contador al pulsar el botón correspondiente', () => {
    render(<App initialCount={5} />);
    
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    
    const counterValue = screen.getByText('4');
    expect(counterValue).toBeInTheDocument();
  });

  test('No permite incrementar por encima del valor máximo (10)', () => {
    render(<App initialCount={10} />);
    
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    
    const counterValue = screen.getByText('10');
    expect(counterValue).toBeInTheDocument();
  });

  test('No permite decrementar por debajo del valor mínimo (1)', () => {
    render(<App initialCount={1} />);
    
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    
    const counterValue = screen.getByText('1');
    expect(counterValue).toBeInTheDocument();
  });
});

describe('Juego de Adivinanza - Mecánica Básica', () => {
  beforeEach(() => {
    // Resetear todos los mocks entre tests
    vi.resetAllMocks();
    // Fijar el número aleatorio en 7 para los tests
    vi.mocked(RandomNumberService.getRandomNumber).mockReturnValue(7);
  });

  test('Genera un número aleatorio al iniciar el juego', () => {
    render(<App />);
    
    // Comprobar que se ha llamado al servicio
    expect(RandomNumberService.getRandomNumber).toHaveBeenCalled();
    
    // Comprobar que aparece el mensaje inicial
    const initialMessage = screen.getByText('Intenta adivinar un número entre 1 y 10');
    expect(initialMessage).toBeInTheDocument();
  });

  test('Muestra mensaje de error cuando la selección es incorrecta', () => {
    render(<App initialCount={5} />);
    
    const checkButton = screen.getByText('Comprobar');
    fireEvent.click(checkButton);
    
    const errorMessage = screen.getByText('Vaya, no era ese :( Sigue intentando.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Muestra mensaje de éxito cuando la selección es correcta', () => {
    render(<App initialCount={7} />);
    
    const checkButton = screen.getByText('Comprobar');
    fireEvent.click(checkButton);
    
    const successMessage = screen.getByText(/¡Felicidades! Has acertado el número 7!/);
    expect(successMessage).toBeInTheDocument();
  });
});

describe('Juego de Adivinanza - Interacciones Avanzadas', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(RandomNumberService.getRandomNumber).mockReturnValue(7);
  });

  test('Deshabilita el botón de verificación después de comprobar', () => {
    render(<App />);
    
    const checkButton = screen.getByText('Comprobar');
    fireEvent.click(checkButton);
    
    expect(checkButton).toBeDisabled();
  });

  test('Aplica color adecuado según el resultado (error en rojo, éxito en verde)', () => {
    render(<App initialCount={5} />);
    
    const checkButton = screen.getByText('Comprobar');
    fireEvent.click(checkButton);
    
    const messageElement = screen.getByText('Vaya, no era ese :( Sigue intentando.');
    expect(messageElement).toHaveClass('error');

    // Reiniciar para probar el mensaje de éxito
    const resetButton = screen.getByText('Reiniciar');
    fireEvent.click(resetButton);
    
    // Cambiar al número correcto y comprobar
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    const checkButtonAgain = screen.getByText('Comprobar');
    fireEvent.click(checkButtonAgain);
    
    const successMessage = screen.getByText(/¡Felicidades! Has acertado el número 7!/);
    expect(successMessage).toHaveClass('success');
  });

  test('Muestra el botón de reinicio después de verificar la selección', () => {
    render(<App />);
    
    // Antes de comprobar, el botón no debe existir
    expect(screen.queryByText('Reiniciar')).not.toBeInTheDocument();
    
    const checkButton = screen.getByText('Comprobar');
    fireEvent.click(checkButton);
    
    // Después de comprobar, el botón debe aparecer
    const resetButton = screen.getByText('Reiniciar');
    expect(resetButton).toBeInTheDocument();
  });

  test('Reinicia correctamente el juego al pulsar el botón correspondiente', () => {
    render(<App initialCount={5} />);
    
    const checkButton = screen.getByText('Comprobar');
    fireEvent.click(checkButton);
    
    const resetButton = screen.getByText('Reiniciar');
    fireEvent.click(resetButton);
    
    // Comprobar que se ha reiniciado el juego
    expect(screen.getByText('Intenta adivinar un número entre 1 y 10')).toBeInTheDocument();
    expect(screen.getByText('Comprobar')).not.toBeDisabled();
    expect(RandomNumberService.getRandomNumber).toHaveBeenCalledTimes(2);
  });
});
``` 