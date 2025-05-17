import { describe, it, expect } from 'vitest'
import { esDiferente, noContiene } from './funciones.js'

describe('Aserciones negativas', () => {
  describe('Función esDiferente', () => {
    it('debe verificar que un valor no es igual a otro', () => {
      expect(esDiferente(5, 3)).toBe(true)
      expect(esDiferente('hola', 'mundo')).toBe(true)
      expect(esDiferente(true, false)).toBe(true)
      expect(esDiferente(null, undefined)).toBe(true)
    })
    
    it('debe verificar que el resultado de la función es verdadero para valores diferentes', () => {
      expect(esDiferente(5, 5)).toBe(false)
      expect(esDiferente('test', 'test')).toBe(false)
      expect(esDiferente(true, true)).toBe(false)
      expect(esDiferente(null, null)).toBe(false)
    })
  })
  
  describe('Función noContiene', () => {
    it('debe verificar que un array no contiene un elemento específico', () => {
      expect(noContiene([1, 2, 3], 4)).toBe(true)
      expect(noContiene(['a', 'b', 'c'], 'd')).toBe(true)
      expect(noContiene([true, false], null)).toBe(true)
      expect(noContiene([{ a: 1 }, { b: 2 }], { c: 3 })).toBe(true)
    })

    it('debe verificar que el array contiene un elemento específico', () => {
      expect(noContiene([1, 2, 3], 3)).toBe(false)
      expect(noContiene(['a', 'b', 'c'], 'b')).toBe(false)
      expect(noContiene([true, false], false)).toBe(false)
    })
  })
})