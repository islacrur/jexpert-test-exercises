# Adivina el Número

Un juego simple creado con React y Vite donde debes adivinar un número entre 1 y 10.

## Características

- Interfaz sencilla e intuitiva
- Selecciona números entre 1 y 10 usando botones + y -
- Feedback instantáneo sobre tus intentos
- Generación de un nuevo número cuando aciertas

## Cómo jugar

1. Un número aleatorio entre 1 y 10 se genera al inicio
2. Utiliza los botones + y - para seleccionar un número
3. Haz clic en "Comprobar" para ver si has acertado
4. Si aciertas, se te felicitará y se generará un nuevo número
5. Si fallas, puedes seguir intentándolo

## Cómo ejecutar

1. Clona este repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Ejecuta la aplicación en modo desarrollo:
   ```
   npm run dev
   ```
4. Abre tu navegador en `http://localhost:5173`

## Personalización

Puedes personalizar la aplicación modificando las props en el archivo `src/main.tsx`:

```tsx
<App 
  title="Adivina el Número" 
  initialCount={5} 
/>
```

- `title`: El título del juego (por defecto: "Adivina el Número")
- `initialCount`: El valor inicial del selector (por defecto: 5)
