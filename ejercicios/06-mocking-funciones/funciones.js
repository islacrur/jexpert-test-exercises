// Función que realiza una operación con un callback
export function ejecutarConCallback(operacion, a, b, callback) {
  const resultado = operacion(a, b)
  callback(resultado)
  return resultado
}

// Servicio para simular operaciones externas
export class ServicioExterno {
  llamarAPI(endpoint, datos) {
    // En un caso real, esto haría una petición HTTP
    console.log(`Llamando a ${endpoint} con datos:`, datos)
    return { status: 200, data: { resultado: 'ok', ...datos } }
  }
  
  procesarResultado(datos) {
    return `Procesado: ${JSON.stringify(datos)}`
  }
}

// Cliente que utiliza el servicio externo
export class Cliente {
  constructor(servicio) {
    this.servicio = servicio
  }
  
  enviarDatos(datos) {
    const respuesta = this.servicio.llamarAPI('/api/datos', datos)
    return this.servicio.procesarResultado(respuesta.data)
  }
} 