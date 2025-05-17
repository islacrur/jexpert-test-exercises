// Función que devuelve una promesa que se resuelve después de un tiempo
export function esperarTiempo(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Esperado ${ms} ms`)
    }, ms)
  })
}

// Función que simula una petición a una API
export async function obtenerDatos(id) {
  await esperarTiempo(50)
  
  if (!id) {
    throw new Error('ID no proporcionado')
  }
  
  return {
    id,
    nombre: `Dato ${id}`,
    timestamp: Date.now()
  }
}

// Función que utiliza async/await para procesar datos
export async function procesarDatos(ids) {
  const resultados = []
  
  for (const id of ids) {
    try {
      const dato = await obtenerDatos(id)
      resultados.push(dato)
    } catch (error) {
      resultados.push({ error: error.message, id })
    }
  }
  
  return resultados
} 