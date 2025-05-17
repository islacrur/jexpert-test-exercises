import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ServicioUsuarios } from './funciones.js'

vi.mock('./api.js', () => {
  return {
    fetchUsuarios: vi.fn(),
    fetchUsuarioPorId: vi.fn()
  }
})

import { fetchUsuarios, fetchUsuarioPorId } from './api.js'

describe('Mocking de Módulos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ServicioUsuarios.obtenerTodosLosUsuarios', () => {
    it('debe obtener y formatear usuarios correctamente', async () => {
      const mockUsuarios = [
        { id: 1, name: 'Juan', email: 'juan@example.com' },
        { id: 2, name: 'Maria', email: 'maria@example.com' }
      ]
      fetchUsuarios.mockResolvedValue(mockUsuarios)

      const servicioUsuarios = new ServicioUsuarios()
      const usuarios = await servicioUsuarios.obtenerTodosLosUsuarios()

      expect(fetchUsuarios).toHaveBeenCalledTimes(1)
      expect(usuarios).toEqual([
        { id: 1, nombre: 'Juan', email: 'juan@example.com' },
        { id: 2, nombre: 'Maria', email: 'maria@example.com' }
      ])
    })

    it('debe manejar errores de la API y devolver un array vacío', async () => {
      fetchUsuarios.mockRejectedValue(new Error('API Error'))

      const servicioUsuarios = new ServicioUsuarios()
      const usuarios = await servicioUsuarios.obtenerTodosLosUsuarios()

      expect(fetchUsuarios).toHaveBeenCalledTimes(1)
      expect(usuarios).toEqual([])
    })
  })

  describe('ServicioUsuarios.obtenerUsuario', () => {
    it('debe obtener un solo usuario con formato correcto incluyendo dirección', async () => {
      const mockUsuario = { id: 1, name: 'Juan', email: 'juan@example.com', address: { city: 'Madrid' } }
      fetchUsuarioPorId.mockResolvedValue(mockUsuario)

      const servicioUsuarios = new ServicioUsuarios()
      const usuario = await servicioUsuarios.obtenerUsuario(1)

      expect(fetchUsuarioPorId).toHaveBeenCalledWith(1)
      expect(usuario).toEqual({
        id: 1,
        nombre: 'Juan',
        email: 'juan@example.com',
        direccion: 'Madrid'
      })
    })

    it('debe obtener un solo usuario con dirección "Desconocida" si no se provee', async () => {
      const mockUsuario = { id: 2, name: 'Ana', email: 'ana@example.com' } // Sin address
      fetchUsuarioPorId.mockResolvedValue(mockUsuario)

      const servicioUsuarios = new ServicioUsuarios()
      const usuario = await servicioUsuarios.obtenerUsuario(2)

      expect(fetchUsuarioPorId).toHaveBeenCalledWith(2)
      expect(usuario).toEqual({
        id: 2,
        nombre: 'Ana',
        email: 'ana@example.com',
        direccion: 'Desconocida'
      })
    })

    it('debe manejar errores de la API y devolver null', async () => {
      fetchUsuarioPorId.mockRejectedValue(new Error('API Error al buscar usuario'))

      const servicioUsuarios = new ServicioUsuarios()
      const usuario = await servicioUsuarios.obtenerUsuario(1)

      expect(fetchUsuarioPorId).toHaveBeenCalledWith(1)
      expect(usuario).toBeNull()
    })
  })
})