// Módulo de API que será mockeado en los tests
export async function fetchUsuarios() {
  // En un caso real, esto haría una petición HTTP
  const respuesta = await fetch('https://api.ejemplo.com/usuarios')
  const datos = await respuesta.json()
  return datos
}

export async function fetchUsuarioPorId(id) {
  // En un caso real, esto haría una petición HTTP
  const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`)
  const datos = await respuesta.json()
  return datos
} 