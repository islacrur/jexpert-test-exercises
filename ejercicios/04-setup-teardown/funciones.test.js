import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { Contador, DB } from './funciones.js'

describe('Setup y Teardown', () => {
  describe('Contador con beforeEach y afterEach', () => {
    // Declarar la variable contador que se usará en los tests
    let contador

    // beforeEach se ejecuta antes de cada test
    beforeEach(() => {
      contador = new Contador(10)
    })

    // afterEach se ejecuta después de cada test
    afterEach(() => {
      contador.reiniciar()
    })

    it('debe incrementar correctamente', () => {
      
    })

    it('debe decrementar correctamente', () => {
      
    })

    it('debe iniciar con el valor correcto en cada test', () => {
      
    })
  })

  describe('DB con beforeAll y afterAll', () => {
    // Declarar la variable db que se usará en los tests
    let db

    // beforeAll se ejecuta una vez antes de todos los tests
    beforeAll(() => {
      db = new DB()
      db.conectar()
    })

    // afterAll se ejecuta una vez después de todos los tests
    afterAll(() => {
      db.desconectar()
      db = null
    })

    it('debe insertar datos correctamente', () => {
      
    })

    it('debe obtener todos los datos', () => {
      
    })
  })
}) 