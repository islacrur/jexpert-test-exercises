import { describe, it, expect, vi } from 'vitest'
import { ejecutarConCallback, ServicioExterno, Cliente } from './funciones.js'

describe('Mocking de Funciones', () => {
  describe('vi.fn() - Mockear funciones', () => {
    it('debe llamar al callback con el resultado correcto', () => {
      const mockOperacion = vi.fn((a, b) => a + b)
      const mockCallback = vi.fn()
      const a = 5
      const b = 10
      ejecutarConCallback(mockOperacion, a, b, mockCallback)
      expect(mockOperacion).toHaveBeenCalledWith(a, b)
      expect(mockCallback).toHaveBeenCalledWith(mockOperacion(a,b))
    })

    it('debe llamar al callback con los argumentos correctos', () => {
      const mockOperacion = vi.fn((str, num) => `String: ${str}, Numero: ${num}`)
      const mockCallback = vi.fn()
      const argStr = 'test'
      const argNum = 123
      ejecutarConCallback(mockOperacion, argStr, argNum, mockCallback)
      expect(mockOperacion).toHaveBeenCalledWith(argStr, argNum)
      expect(mockCallback).toHaveBeenCalledWith(mockOperacion(argStr, argNum))
    })
  })

  describe('vi.spyOn() - Espiar métodos', () => {
    it('debe espiar el método llamarAPI del servicio', () => {
      const servicio = new ServicioExterno()
      const spyLlamarAPI = vi.spyOn(servicio, 'llamarAPI')
      const cliente = new Cliente(servicio)
      const testData = { id: 1, payload: 'datos de prueba' }
      cliente.enviarDatos(testData)
      expect(spyLlamarAPI).toHaveBeenCalled()
      expect(spyLlamarAPI).toHaveBeenCalledWith('/api/datos', testData)
    })
    
    it('debe mockear el método procesarResultado para devolver un valor personalizado', () => {
      const servicio = new ServicioExterno()
      const mockReturnValue = 'Resultado mockeado'
      const spyProcesarResultado = vi.spyOn(servicio, 'procesarResultado').mockReturnValue(mockReturnValue)

      const cliente = new Cliente(servicio)
      const testData = { info: 'alguna data' }
      const resultado = cliente.enviarDatos(testData)
      
      expect(spyProcesarResultado).toHaveBeenCalled()
      expect(resultado).toBe(mockReturnValue)
    })
  })
})