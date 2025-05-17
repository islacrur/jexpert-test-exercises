import { describe, it, expect } from 'vitest'
import { esDiferente, noContiene } from './funciones.js'

describe('Aserciones negativas', () => {
  describe('Función esDiferente', () => {
    it('debe verificar que un valor no es igual a otro', () => {
      expect(esDiferente(5, 3)).not.toBe(false)
    })
    
    it('debe verificar que el resultado de la función es verdadero para valores diferentes', () => {
      expect(esDiferente(5, 5)).not.toBe(true)
    })
  })
  
  describe('Función noContiene', () => {
    it('debe verificar que un array no contiene un elemento específico', () => {
      expect(noContiene([1, 2, 3], 4)).not.toBe(false)
    })

    it('debe verificar que el array contiene un elemento específico', () => {
      expect(noContiene([1, 2, 3], 3)).not.toBe(true)
    })
  })
})