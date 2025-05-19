export interface User {
  id: number;
  name: string;
}

export const apiService = {
  getUser(id: number): User {
    // En una aplicación real, esto haría una llamada HTTP
    console.log(`Llamada real a la API para obtener usuario ${id}`);
    return { id, name: 'Usuario ' + id };
  },
  
  saveUser(user: User): boolean {
    // En una aplicación real, esto enviaría datos al servidor
    console.log(`Guardando usuario ${user.id} en la API`);
    return true;
  }
};

// Función que usa el servicio
export function displayUserData(id: number, api: typeof apiService): string {
  const user = api.getUser(id);
  return `Usuario: ${user.name} (ID: ${user.id})`;
}

// ========= TESTS =========

import { describe, it, expect, vi } from 'vitest';

describe('Mocking de Servicios API', () => {
  
  // Ejemplo 1: Usando vi.fn() para crear un mock completo
  it('debe crear un mock completo del servicio API', () => {
    // MOCK: Creamos un mock completo del servicio
    const apiMock = {
      getUser: vi.fn().mockReturnValue({ id: 1, name: 'Usuario Mock' }),
      saveUser: vi.fn().mockReturnValue(true)
    };
    
    // Usamos la función con el mock
    const result = displayUserData(1, apiMock);
    
    // Verificamos el resultado
    expect(result).toBe('Usuario: Usuario Mock (ID: 1)');
    
    // Verificamos que se llamó al método correcto
    expect(apiMock.getUser).toHaveBeenCalledTimes(1);
    expect(apiMock.getUser).toHaveBeenCalledWith(1);
  });
  
  // Ejemplo 2: Usando vi.spyOn para espiar un método real
  it('debe espiar un método real con spyOn', () => {
    // Creamos una copia del servicio real
    const apiCopy = { ...apiService };
    
    // MOCK: Espiamos el método real
    const getUserSpy = vi.spyOn(apiCopy, 'getUser');
    
    // Usamos la función con el servicio espiado
    displayUserData(2, apiCopy);
    
    // Verificamos que se ha llamado a la función
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    expect(getUserSpy).toHaveBeenCalledWith(2);
  });
  
  // Ejemplo 3: Usando mockImplementation para cambiar el comportamiento
  it('debe cambiar la implementación con mockImplementation', () => {
    // Creamos una copia del servicio real
    const apiCopy = { ...apiService };
    
    // MOCK: Reemplazamos la implementación de la función
    vi.spyOn(apiCopy, 'getUser').mockImplementation((id) => {
      return { id, name: 'Nombre Modificado' };
    });
    
    // Usamos la función con el servicio modificado
    const result = displayUserData(3, apiCopy);
    
    // Verificamos que está usando la nueva implementación
    expect(result).toBe('Usuario: Nombre Modificado (ID: 3)');
  });
}); 