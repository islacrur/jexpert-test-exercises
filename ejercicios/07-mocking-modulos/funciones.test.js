import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ServicioUsuarios } from './funciones.js'

// vi.mock debe estar a nivel de módulo, fuera de cualquier bloque describe o it
vi.mock('./api.js', () => {
  return {
    fetchUsuarios: vi.fn(),
    fetchUsuarioPorId: vi.fn()
  }
})

// Importamos después de llamar a vi.mock
import { fetchUsuarios, fetchUsuarioPorId } from './api.js'

describe('Mocking de Módulos', () => {
  // Limpiamos los mocks antes y después de cada test
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Servicio que usa el módulo mockeado', () => {
    it('debe obtener y formatear usuarios correctamente', async () => {
      
    })
    
    it('debe manejar errores de la API correctamente', async () => {
      
    })
  })
  
  describe('Mock de función específica del módulo', () => {
    it('debe obtener un solo usuario con formato correcto', async () => {
      
    })
  })
}) 