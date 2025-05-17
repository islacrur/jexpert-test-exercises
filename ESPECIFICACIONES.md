# Especificaciones del Proyecto: Ejercicios de Testing con Vitest

## Objetivo General
Crear una serie de ejercicios prácticos para enseñar testing con Vitest a personas sin experiencia previa en testing. Los ejercicios deben introducir los conceptos de forma incremental, centrándose en los aspectos más relevantes del testing.

## Estructura del Proyecto
- Los ejercicios se organizan en carpetas dentro de un directorio principal llamado `ejercicios`
- Cada ejercicio se coloca en una carpeta independiente con un número al inicio para mantener un orden correcto
- Cada carpeta de ejercicio contiene:
  - Un archivo con las funciones a testear (`funciones.js`)
  - Un archivo con los tests sin implementar (`funciones.test.js`)

## Especificaciones Recibidas

1. **No crear README para cada tipo de ejercicios**
2. **No escribir comentarios en el código ni en los tests**
3. **Los tests no deben estar implementados, solo sus enunciados**
4. **Cada test debe tener una función vacía ya preparada** para que los alumnos solo tengan que rellenar el contenido
5. **Enfoque incremental** en la introducción de conceptos de testing
6. **No incluir ejercicios para testear DOM**

## Secciones Implementadas

1. **Aserciones Básicas** - Introducción a expect, toBe, toEqual
   - Funciones creadas: suma, crearUsuario, obtenerTipo
   - Tests preparados para: igualdad exacta y comparación por referencia

2. **Comparadores Específicos** - toBeGreaterThan, toContain, toHaveLength
   - Funciones creadas: esMayorQue, filtrarMayores, contieneTexto, obtenerLongitud, estaCerca
   - Tests preparados para: comparaciones numéricas, contenido en arrays/strings y longitud

3. **Aserciones Negativas** - not.toBe, not.toContain
   - Funciones creadas: esDiferente, noContiene
   - Tests preparados para: comprobar desigualdad y ausencia en arrays

4. **Setup y Teardown** - beforeEach, afterEach, beforeAll, afterAll
   - Clases creadas: Contador (para beforeEach/afterEach), DB (para beforeAll/afterAll)
   - Tests preparados para: inicialización y limpieza de estado

5. **Testing Asíncrono** - Promises, async/await
   - Funciones creadas: esperarTiempo, obtenerDatos, procesarDatos
   - Tests preparados para: manejo de promesas y async/await

6. **Mocking de Funciones** - vi.fn(), vi.spyOn()
   - Funciones/Clases creadas: ejecutarConCallback, ServicioExterno, Cliente
   - Tests preparados para: uso de mocks y espías

7. **Mocking de Módulos** - vi.mock()
   - Módulos creados: api.js, servicio que utiliza el módulo
   - Tests preparados para: mockear módulos completos

8. **Testing de Excepciones** - toThrow, try/catch
   - Funciones creadas: dividir, Validador
   - Tests preparados para: verificar errores específicos

9. **Snapshots** - toMatchSnapshot
   - Funciones creadas: generarUsuario, generarListaHTML, generarMensajeError
   - Tests preparados para: comparación con snapshots

## Configuración Técnica

- Vitest configurado con el archivo `vitest.config.js`
- Scripts en package.json:
  - `test`: para ejecutar los tests
  - `test:ui`: para ejecutar los tests con interfaz visual 