// Función que lanza una excepción cuando recibe un valor inválido
export function dividir(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir por cero')
  }
  return a / b
}
