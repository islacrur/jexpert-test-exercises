import { describe, it, expect } from 'vitest'
import { suma, crearUsuario, obtenerTipo } from './funciones.js'

describe('Aserciones básicas', () => {
  describe('Función suma', () => {
    it('debe sumar dos números correctamente', () => {
      expect(suma(1, 2)).toBe(3)
      expect(suma(0, 0)).toBe(0)
      expect(suma(100, 200)).toBe(300)
    })

    it('debe retornar un número', () => {
      expect(typeof suma(1, 2)).toBe('number')
    })

    it('debe manejar números negativos', () => {
      expect(suma(-1, -2)).toBe(-3)
      expect(suma(-5, 5)).toBe(0)
      expect(suma(10, -5)).toBe(5)
    })
  })

  describe('Función crearUsuario', () => {
    const nombre = 'Juan Perez'
    const edad = 30
    const usuario = crearUsuario(nombre, edad)

    it('debe crear un objeto con las propiedades correctas', () => {
      expect(usuario).toHaveProperty('nombre')
      expect(usuario).toHaveProperty('edad')
      expect(usuario).toHaveProperty('activo')
      expect(usuario).toHaveProperty('fecha')
    })

    it('debe asignar el nombre correctamente', () => {
      expect(usuario.nombre).toBe(nombre)
    })

    it('debe asignar la edad correctamente', () => {
      expect(usuario.edad).toBe(edad)
    })

    it('debe tener la propiedad activo como true', () => {
      expect(usuario.activo).toBe(true)
    })

    it('debe incluir una propiedad fecha con una instancia de Date', () => {
      expect(usuario.fecha).toBeInstanceOf(Date)
    })
  })

  describe('Función obtenerTipo', () => {
    it('debe retornar "number" para números', () => {
      expect(obtenerTipo(123)).toBe('number')
      expect(obtenerTipo(0)).toBe('number')
      expect(obtenerTipo(-45.67)).toBe('number')
    })

    it('debe retornar "string" para cadenas de texto', () => {
      expect(obtenerTipo('hola')).toBe('string')
      expect(obtenerTipo('')).toBe('string')
      expect(obtenerTipo('123')).toBe('string')
    })

    it('debe retornar "boolean" para valores booleanos', () => {
      expect(obtenerTipo(true)).toBe('boolean')
      expect(obtenerTipo(false)).toBe('boolean')
    })

    it('debe retornar "object" para objetos', () => {
      expect(obtenerTipo({})).toBe('object')
      expect(obtenerTipo({ a: 1 })).toBe('object')
      expect(obtenerTipo(null)).toBe('object') // typeof null es 'object'
    })

    it('debe retornar "undefined" para undefined', () => {
      expect(obtenerTipo(undefined)).toBe('undefined')
    })

    it('debe retornar "function" para funciones', () => {
      expect(obtenerTipo(() => {})).toBe('function')
    })
  })
})