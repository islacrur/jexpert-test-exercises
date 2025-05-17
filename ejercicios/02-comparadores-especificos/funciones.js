// Función para verificar si un número es mayor que un valor mínimo
export function esMayorQue(numero, minimo) {
  return numero > minimo
}

// Función para filtrar un array y obtener sólo los elementos mayores que un valor
export function filtrarMayores(array, minimo) {
  return array.filter(item => item > minimo)
}

// Función para verificar si un string contiene una substring
export function contieneTexto(texto, busqueda) {
  return texto.includes(busqueda)
}

// Función para obtener la longitud de un array o string
export function obtenerLongitud(valor) {
  return valor.length
}
