import { describe, it, expect } from 'vitest'
import { esperarTiempo, obtenerDatos, procesarDatos } from './funciones.js'

describe('Testing Asíncrono', () => {
  describe('Función esperarTiempo (Promesas)', () => {
    it('debe resolver la promesa después del tiempo especificado', async () => {
      const tiempoEspera = 1000
      const inicio = Date.now()
      await esperarTiempo(tiempoEspera)
      const fin = Date.now()
      const tiempoTranscurrido = fin - inicio
      expect(tiempoTranscurrido).toBeGreaterThanOrEqual(tiempoEspera)
    })
  })

  describe('Función obtenerDatos (async/await)', () => {
    it('debe obtener datos correctamente', async () => {
      const id = 1
      const datos = await obtenerDatos(id)
      expect(datos).toBeDefined()
      expect(datos.id).toBe(id)
    })
    
    it('debe lanzar un error si no se proporciona un ID', async () => {
      await expect(obtenerDatos()).rejects.toThrow('ID no proporcionado')
    })
  })

  describe('Función procesarDatos (múltiples promesas)', () => {
    it('debe procesar múltiples IDs correctamente', async () => {
      const ids = [1, 2, 3]
      const resultados = await procesarDatos(ids)
      expect(resultados).toBeDefined()
      expect(resultados.length).toBe(ids.length)
      resultados.forEach((resultado, index) => {
        expect(resultado.id).toBe(ids[index])
      })
    })
  })
})