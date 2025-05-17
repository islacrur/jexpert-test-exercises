import { describe, it, expect } from 'vitest'
import { dividir } from './funciones.js'

describe('Testing de Excepciones', () => {
  describe('Función dividir', () => {
    it('debe lanzar una excepción al dividir por cero', () => {
      expect(() => dividir(10, 0)).toThrow('No se puede dividir por cero')
    })
    
    it('debe realizar la división correctamente con valores válidos', () => {
      expect(dividir(10, 2)).toBe(5)
      expect(dividir(15, 3)).toBe(5)
      expect(dividir(7, 2)).toBe(3.5)
    })
  })
})