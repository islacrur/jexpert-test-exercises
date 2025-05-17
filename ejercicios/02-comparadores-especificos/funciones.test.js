import { describe, it, expect } from 'vitest'
import { esMayorQue, filtrarMayores, contieneTexto, obtenerLongitud } from './funciones.js'

describe('Comparadores específicos', () => {
  describe('Función esMayorQue', () => {
    it('debe retornar true si el número es mayor que el mínimo', () => {
      expect(esMayorQue(5, 3)).toBe(true)
    })
    
    it('debe retornar false si el número es igual al mínimo', () => {
      expect(esMayorQue(3, 3)).toBe(false)
    })
    
    it('debe retornar false si el número es menor que el mínimo', () => {
      expect(esMayorQue(1, 3)).toBe(false)
    })
  })
  
  describe('Función filtrarMayores', () => {
    it('debe retornar un array con elementos mayores que el mínimo', () => {
      expect(filtrarMayores([1, 2, 3, 4, 5], 3)).toEqual([4, 5])
    })
    
    it('debe retornar un array vacío si ningún elemento es mayor que el mínimo', () => {
      expect(filtrarMayores([1, 2, 3], 3)).toEqual([])
    })
    
    it('debe verificar que el array resultante tenga la longitud correcta', () => {
      expect(filtrarMayores([1, 2, 3, 4, 5], 2).length).toBe(3)
    })
  })
  
  describe('Función contieneTexto', () => {
    it('debe retornar true si el texto contiene la búsqueda', () => {
      expect(contieneTexto('Hola mundo', 'mundo')).toBe(true)
    })
    
    it('debe retornar false si el texto no contiene la búsqueda', () => {
      expect(contieneTexto('Hola mundo', 'perro')).toBe(false)
    })
    
    it('debe ser sensible a mayúsculas/minúsculas', () => {
      expect(contieneTexto('Hola mundo', 'Mundo')).toBe(false)
    })
  })
  
  describe('Función obtenerLongitud', () => {
    it('debe retornar la longitud correcta de un string', () => {
      expect(obtenerLongitud('Hola')).toBe(4)
    })
    
    it('debe retornar la longitud correcta de un array', () => {
      expect(obtenerLongitud([1, 2, 3])).toBe(3)
    })
    
    it('debe retornar 0 para un string vacío', () => {
      expect(obtenerLongitud('')).toBe(0)
    })
    
    it('debe retornar 0 para un array vacío', () => {
      expect(obtenerLongitud([])).toBe(0)
    })
  })
  
})