// Clase Contador para demostrar beforeEach y afterEach
export class Contador {
  constructor(valorInicial = 0) {
    this.valor = valorInicial
  }

  incrementar() {
    this.valor += 1
    return this.valor
  }

  decrementar() {
    this.valor -= 1
    return this.valor
  }

  reiniciar() {
    this.valor = 0
    return this.valor
  }

  getValor() {
    return this.valor
  }
}

// Base de datos simple para demostrar beforeAll y afterAll
export class DB {
  constructor() {
    this.conectado = false
    this.datos = []
  }

  conectar() {
    this.conectado = true
    return this.conectado
  }

  desconectar() {
    this.conectado = false
    return this.conectado
  }

  insertar(dato) {
    if (!this.conectado) throw new Error('DB no conectada')
    this.datos.push(dato)
    return this.datos.length
  }

  obtenerTodos() {
    if (!this.conectado) throw new Error('DB no conectada')
    return [...this.datos]
  }
} 