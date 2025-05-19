# Cheatsheet de Testing Library

## Conceptos básicos

Testing Library es una librería para tests que te permite probar componentes de React como lo haría un usuario real. Se enfoca en probar el comportamiento en lugar de los detalles de implementación.

## Funciones Principales

### Renderizado

```jsx
import { render, screen } from '@testing-library/react';
import MiComponente from './MiComponente';

test('ejemplo básico', () => {
  render(<MiComponente />);
  // ahora puedes buscar elementos en el DOM virtual
});
```

- `render`: Monta tu componente en un DOM virtual para poder testearlo. Es como si lo pusieras en una página web de mentira.

### Selección de elementos

```jsx
// Por texto
const elemento = screen.getByText('Hola mundo');

// Por rol (muy útil para accesibilidad)
const boton = screen.getByRole('button', { name: 'Enviar' });

// Por etiqueta
const input = screen.getByLabelText('Email');

// Por placeholder
const input = screen.getByPlaceholderText('Escribe tu nombre');

// Por test id (último recurso)
const elemento = screen.getByTestId('mi-elemento');
```

- `screen`: Es como una ventana hacia el DOM virtual. Te permite encontrar cosas dentro.
- `getByText`: Busca un elemento que tenga ese texto exacto. Es lo que un usuario vería.
- `getByRole`: Busca por rol de accesibilidad (button, link, etc). La mejor forma de encontrar elementos.
- `getByLabelText`: Encuentra campos de formulario por su etiqueta.
- `getByTestId`: Útil cuando no hay otra forma de seleccionar un elemento.

### Variantes de búsqueda

```jsx
// Obtener un elemento (falla si no existe o hay varios)
const boton = screen.getByText('Enviar');

// Encontrar todos los elementos (devuelve array)
const botones = screen.getAllByRole('button');

// Consultar si existe (no falla si no existe)
const elemento = screen.queryByText('Opcional');

// Esperar a que aparezca (útil para cosas asíncronas)
const mensaje = await screen.findByText('Cargando completado', {}, { timeout: 2000 });
```

- `getBy...`: Obtiene UN elemento que existe ahora mismo. Da error si no lo encuentra o hay varios.
- `getAllBy...`: Obtiene TODOS los elementos que coincidan. Da error si no encuentra ninguno.
- `queryBy...`: Igual que getBy pero no da error si no encuentra nada. Bueno para comprobar que algo NO existe.
- `findBy...`: Espera a que aparezca algo. Útil para cosas que tardan un poco en cargarse.

### Eventos de usuario

```jsx
import { fireEvent } from '@testing-library/react';

// Clic
fireEvent.click(boton);

// Escribir en un input
fireEvent.change(input, { target: { value: 'Hola' } });

// Enviar un formulario
fireEvent.submit(formulario);
```

- `fireEvent`: Te permite simular acciones del usuario como clics o escribir en campos.
- `userEvent`: La versión moderna y más completa (se importa de `@testing-library/user-event`).

### Aserciones

```jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ¡Importante para tener más matchers!

// Comprobar que existe
expect(elemento).toBeInTheDocument();

// Comprobar texto
expect(elemento).toHaveTextContent('Hola');

// Comprobar clase CSS
expect(boton).toHaveClass('boton-primario');

// Comprobar atributos
expect(input).toBeDisabled();
expect(checkbox).toBeChecked();

// Comprobar que NO existe
expect(screen.queryByText('Error')).not.toBeInTheDocument();
```

- `expect`: Es parte de Jest, sirve para decir "espero que esto sea así".
- `toBeInTheDocument`: Comprueba que un elemento existe en la página.
- `toHaveTextContent`: Comprueba si un elemento tiene cierto texto.
- `toHaveClass`: Comprueba si un elemento tiene cierta clase CSS.

## Ejemplo Completo

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contador from './Contador';

test('el contador incrementa cuando se hace clic en el botón', () => {
  // 1. PREPARAR: Renderizar el componente
  render(<Contador valorInicial={5} />);
  
  // 2. ACTUAR: Hacer clic en el botón
  const botonIncrementar = screen.getByText('+');
  fireEvent.click(botonIncrementar);
  
  // 3. COMPROBAR: Verificar que el contador ha aumentado
  expect(screen.getByText('6')).toBeInTheDocument();
});
```

## Tips para tests buenos

1. **Piensa como usuario**: No pruebes detalles de implementación, prueba lo que el usuario ve y hace.
2. **Usa roles y texto**: Selecciona elementos por su rol (botón, enlace) o por texto visible.
3. **Evita testIds**: Úsalos solo cuando no hay otra forma de seleccionar un elemento.
4. **Tests sencillos**: Mejor muchos tests pequeños que pocos grandes.
5. **No te preocupes por estilos**: Testing Library no es para probar CSS, sino comportamiento.

## Comandos para ejecutar tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch (se actualizan al guardar)
npm run test:watch

# Ejecutar tests con nombre específico
npm run test -- -t "nombre del test"

# Ejecutar tests con Vitest UI (interfaz gráfica)
npx vitest --ui
``` 