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
      contador.incrementar()
      expect(contador.getValor()).toBe(11)
    })

    it('debe decrementar correctamente', () => {
      contador.decrementar()
      expect(contador.getValor()).toBe(9)
    })

    it('debe iniciar con el valor correcto en cada test', () => {
      expect(contador.getValor()).toBe(10)
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
      db.insertar({ id: 1, dato: 'valor1' })
      expect(db.obtenerPorId(1)).toEqual({ id: 1, dato: 'valor1' })
    })

    it('debe obtener todos los datos', () => {
      db.insertar({ id: 2, dato: 'valor2' })
      expect(db.obtenerTodos()).toEqual([
        { id: 1, dato: 'valor1' },
        { id: 2, dato: 'valor2' }
      ])
    })
  })
}) 