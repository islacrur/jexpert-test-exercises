// Definición de un servicio API simple (es solo un objeto, no una clase)
export interface Usuario {
  id: number;
  nombre: string;
}

// Servicio API como objeto simple
export const apiServicio = {
  obtenerUsuario(id: number): Usuario {
    // En una aplicación real, esto haría una llamada HTTP
    console.log(`Llamada real a la API para obtener usuario ${id}`);
    return { id, nombre: 'Usuario ' + id };
  },
  
  guardarUsuario(usuario: Usuario): boolean {
    // En una aplicación real, esto enviaría datos al servidor
    console.log(`Guardando usuario ${usuario.id} en la API`);
    return true;
  }
};

// Función que usa el servicio
export function mostrarDatosUsuario(id: number, api: typeof apiServicio): string {
  const usuario = api.obtenerUsuario(id);
  return `Usuario: ${usuario.nombre} (ID: ${usuario.id})`;
}

// ========= TESTS =========

import { describe, it, expect, vi } from 'vitest';

describe('Mocking de Servicios API', () => {
  
  // Ejemplo 1: Usando vi.fn() para crear un mock completo
  it('debe crear un mock completo del servicio API', () => {
    // MOCK: Creamos un mock completo del servicio
    const apiMock = {
      obtenerUsuario: vi.fn().mockReturnValue({ id: 1, nombre: 'Usuario Mock' }),
      guardarUsuario: vi.fn().mockReturnValue(true)
    };
    
    // Usamos la función con el mock
    const resultado = mostrarDatosUsuario(1, apiMock);
    
    // Verificamos el resultado
    expect(resultado).toBe('Usuario: Usuario Mock (ID: 1)');
    
    // Verificamos que se llamó al método correcto
    expect(apiMock.obtenerUsuario).toHaveBeenCalledTimes(1);
    expect(apiMock.obtenerUsuario).toHaveBeenCalledWith(1);
  });
  
  // Ejemplo 2: Usando vi.spyOn para espiar un método real
  it('debe espiar un método real con spyOn', () => {
    // Creamos una copia del servicio real
    const apiCopia = { ...apiServicio };
    
    // MOCK: Espiamos el método real
    const obtenerUsuarioSpy = vi.spyOn(apiCopia, 'obtenerUsuario');
    
    // Usamos la función con el servicio espiado
    mostrarDatosUsuario(2, apiCopia);
    
    // Verificamos que se llamó al método
    expect(obtenerUsuarioSpy).toHaveBeenCalledTimes(1);
    expect(obtenerUsuarioSpy).toHaveBeenCalledWith(2);
  });
  
  // Ejemplo 3: Usando mockImplementation para cambiar el comportamiento
  it('debe cambiar la implementación con mockImplementation', () => {
    // Creamos una copia del servicio real
    const apiCopia = { ...apiServicio };
    
    // MOCK: Reemplazamos la implementación del método
    vi.spyOn(apiCopia, 'obtenerUsuario').mockImplementation((id) => {
      return { id, nombre: 'Nombre Modificado' };
    });
    
    // Usamos la función con el servicio modificado
    const resultado = mostrarDatosUsuario(3, apiCopia);
    
    // Verificamos que está usando la nueva implementación
    expect(resultado).toBe('Usuario: Nombre Modificado (ID: 3)');
  });
}); 