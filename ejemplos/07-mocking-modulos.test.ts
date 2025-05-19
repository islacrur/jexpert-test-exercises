import { describe, it, expect, vi, beforeEach } from 'vitest';
import { obtenerUsuario } from './servicios/usuario';
import type { Usuario } from './servicios/usuario';

/**
 * Ejemplo simple de mocking de módulos con Vitest
 * 
 * Este ejemplo muestra cómo mockear un módulo externo
 * para controlar su comportamiento durante los tests
 */

// Mockeamos el módulo completo
vi.mock('./servicios/usuario', () => ({
  obtenerUsuario: vi.fn()
}));

describe('Mocking de Módulos', () => {
  // Datos de prueba
  const usuarioMock: Usuario = {
    id: '123',
    nombre: 'Ana López',
    email: 'ana@ejemplo.com'
  };

  // Restauramos los mocks antes de cada test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('debe mockear correctamente la función obtenerUsuario', async () => {
    // Configuramos el mock para que devuelva nuestro usuario de prueba
    vi.mocked(obtenerUsuario).mockResolvedValue(usuarioMock);

    // Llamamos a la función mockeada
    const usuario = await obtenerUsuario('123');

    // Verificamos que la función ha sido llamada correctamente
    expect(obtenerUsuario).toHaveBeenCalledWith('123');
    expect(obtenerUsuario).toHaveBeenCalledTimes(1);

    // checkeamos que devuelve los datos del mock
    expect(usuario).toEqual(usuarioMock);
    expect(usuario.nombre).toBe('Ana López');
  });

  it('debe permitir simular un error en la API', async () => {
    // Configuramos el mock para que lance un error
    vi.mocked(obtenerUsuario).mockRejectedValue(
      new Error('Error al obtener datos del usuario')
    );

    // Verificamos que la promesa se rechaza con el error correcto
    await expect(obtenerUsuario('456'))
      .rejects
      .toThrow('Error al obtener datos del usuario');

    expect(obtenerUsuario).toHaveBeenCalledWith('456');
  });

  it('debe permitir cambiar el comportamiento entre llamadas', async () => {
    // Primera llamada devuelve un usuario
    vi.mocked(obtenerUsuario).mockResolvedValueOnce(usuarioMock);
    
    // Segunda llamada lanza un error
    vi.mocked(obtenerUsuario).mockRejectedValueOnce(
      new Error('Usuario no encontrado')
    );

    // Primera llamada exitosa
    const usuario = await obtenerUsuario('123');
    expect(usuario).toEqual(usuarioMock);

    // Segunda llamada genera error
    await expect(obtenerUsuario('999'))
      .rejects
      .toThrow('Usuario no encontrado');
  });
}); 