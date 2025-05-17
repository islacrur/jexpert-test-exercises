// Ejercicio 1: Función para sumar dos números
export function suma(a, b) {
  return a + b
}

// Ejercicio 2: Función para obtener un objeto con información de usuario
export function crearUsuario(nombre, edad) {
  return {
    nombre,
    edad,
    activo: true,
    fecha: new Date()
  }
}

// Ejercicio 3: Función para obtener el tipo de dato
export function obtenerTipo(valor) {
  return typeof valor
} 