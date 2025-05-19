
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export function obtenerUsuario(id: string): Promise<Usuario> {
  return new Promise((resolve, reject) => {
    // Simulamos un retardo de red
    setTimeout(() => {
      // Simulamos una base de datos de usuarios
      const usuarios: Record<string, Usuario> = {
        '1': { id: '1', nombre: 'Ana', email: 'ana@ejemplo.com' },
        '2': { id: '2', nombre: 'Juan', email: 'juan@ejemplo.com' },
        '3': { id: '3', nombre: 'María', email: 'maria@ejemplo.com' }
      };

      if (usuarios[id]) {
        resolve(usuarios[id]);
      } else {
        reject(new Error(`Usuario con ID ${id} no encontrado`));
      }
    }, 100);
  });
}

export interface DatosRegistro {
  nombre: string;
  email: string;
}

export interface UsuarioRegistrado extends DatosRegistro {
  id: string;
  fechaRegistro: Date;
}

export function registrarUsuario(datos: DatosRegistro): Promise<UsuarioRegistrado> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validación básica
      if (!datos.nombre || !datos.email) {
        reject(new Error('Faltan datos obligatorios'));
        return;
      }
      
      // Simulamos registro exitoso asignando un ID
      const nuevoUsuario: UsuarioRegistrado = {
        id: Date.now().toString(),
        ...datos,
        fechaRegistro: new Date()
      };
      
      resolve(nuevoUsuario);
    }, 150);
  });
}

export type CallbackFn = (error: Error | null, resultado?: number) => void;

export function procesarConCallback(valor: unknown, callback: CallbackFn): void {
  setTimeout(() => {
    if (typeof valor !== 'number') {
      callback(new Error('El valor debe ser un número'));
      return;
    }
    
    const resultado = valor * 2;
    callback(null, resultado);
  }, 50);
}

export interface DatosConTimestamp {
  id: string;
  timestamp: number;
}

/**
 * Función que devuelve una Promesa que se resuelve con un valor async/await
 */
export async function obtenerDatosConAwait(id: string): Promise<DatosConTimestamp> {
  // Simulamos una operación asíncrona
  await new Promise(resolve => setTimeout(resolve, 50));
  
  if (!id) {
    throw new Error('ID es requerido');
  }
  
  return {
    id,
    timestamp: Date.now()
  };
}


import { describe, it, expect, vi } from 'vitest';

describe('Testing Asíncrono', () => {
  
  describe('Promesas con then/catch', () => {
    it('debe resolver con datos de usuario cuando el ID existe', () => {
      // Usando return con promesas - importante para que Vitest espere la resolución
      return obtenerUsuario('1')
        .then(usuario => {
          expect(usuario).toHaveProperty('id', '1');
          expect(usuario).toHaveProperty('nombre', 'Ana');
        });
    });
    
    it('debe rechazar la promesa cuando el ID no existe', () => {
      // Usando return con promesas - la prueba fallará si la promesa se resuelve
      return obtenerUsuario('999')
        .then(() => {
          // Si llegamos aquí, la prueba debería fallar porque esperamos un rechazo
          throw new Error('La promesa debería haberse rechazado');
        })
        .catch(error => {
          // La prueba pasa si capturamos el error
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toContain('no encontrado');
        });
    });
    
    it('debe rechazar con error específico (con resolves/rejects)', () => {
      // Usando expect().rejects para verificar promesas rechazadas
      return expect(obtenerUsuario('999')).rejects.toThrow('no encontrado');
    });
    
    it('debe resolver con datos específicos (con resolves/rejects)', () => {
      // Usando expect().resolves para verificar promesas resueltas
      return expect(obtenerUsuario('2')).resolves.toMatchObject({
        id: '2',
        nombre: 'Juan'
      });
    });
  });
  
  describe('Async/Await', () => {
    it('debe obtener usuario correctamente (usando async/await)', async () => {
      // Usando async/await para manejo más limpio de promesas
      const usuario = await obtenerUsuario('3');
      
      expect(usuario).toHaveProperty('id', '3');
      expect(usuario).toHaveProperty('nombre', 'María');
    });
    
    it('debe capturar errores con try/catch', async () => {
      // Manejando rechazos de promesas con try/catch
      try {
        await obtenerUsuario('999');
        // Si llegamos aquí, forzamos error porque esperamos una excepción
        expect(true).toBe(false); // Esto no debería ejecutarse
      } catch (error) {
        // La prueba pasa si capturamos el error
        if (error instanceof Error) {
          expect(error.message).toContain('no encontrado');
        }
      }
    });
    
    it('debe registrar un usuario correctamente', async () => {
      const datos: DatosRegistro = { nombre: 'Luis', email: 'luis@ejemplo.com' };
      
      const usuario = await registrarUsuario(datos);
      
      expect(usuario).toHaveProperty('id');
      expect(usuario.nombre).toBe(datos.nombre);
      expect(usuario.email).toBe(datos.email);
      expect(usuario).toHaveProperty('fechaRegistro');
    });
    
    it('debe rechazar con datos inválidos', async () => {
      const datosIncompletos = { nombre: 'Luis' } as DatosRegistro; // Falta email
      
      await expect(registrarUsuario(datosIncompletos))
        .rejects
        .toThrow('Faltan datos obligatorios');
    });
  });
  
  describe('Callbacks', () => {
    // En lugar de usar el parámetro done, vamos a convertir todo a promesas 
    // que es la forma moderna y recomendada de manejar código asíncrono en tests
    
    it('debe procesar el valor correctamente', async () => {
      // Convertimos la función de callback a una promesa
      const procesarPromesa = (valor: number) => {
        return new Promise<number>((resolve, reject) => {
          procesarConCallback(valor, (error, resultado) => {
            if (error) reject(error);
            else resolve(resultado as number);
          });
        });
      };
      
      const resultado = await procesarPromesa(5);
      expect(resultado).toBe(10);
    });
    
    it('debe manejar errores correctamente', async () => {
      // Convertimos la función de callback a una promesa
      const procesarPromesa = (valor: unknown) => {
        return new Promise<number>((resolve, reject) => {
          procesarConCallback(valor, (error, resultado) => {
            if (error) reject(error);
            else resolve(resultado as number);
          });
        });
      };
      
      await expect(procesarPromesa('no-numero')).rejects.toThrow('debe ser un número');
    });
    
    it('debe permitir múltiples llamadas', async () => {
      // Convertimos la función de callback a una promesa para tests más limpios
      const procesarPromesa = (valor: number) => {
        return new Promise<number>((resolve, reject) => {
          procesarConCallback(valor, (error, resultado) => {
            if (error) reject(error);
            else resolve(resultado as number);
          });
        });
      };
      
      // Podemos hacer múltiples llamadas en un mismo test
      const resultado1 = await procesarPromesa(8);
      expect(resultado1).toBe(16);
      
      const resultado2 = await procesarPromesa(10);
      expect(resultado2).toBe(20);
    });
  });
  
  describe('Async/Await avanzado', () => {
    it('debe obtener datos con ID válido', async () => {
      const datos = await obtenerDatosConAwait('abc123');
      
      expect(datos).toHaveProperty('id', 'abc123');
      expect(datos).toHaveProperty('timestamp');
    });
    
    it('debe lanzar error con ID inválido', async () => {
      await expect(obtenerDatosConAwait('')).rejects.toThrow('ID es requerido');
    });
    
    it('debe tener timestamp reciente', async () => {
      const antes = Date.now();
      const datos = await obtenerDatosConAwait('test');
      const despues = Date.now();
      
      expect(datos.timestamp).toBeGreaterThanOrEqual(antes);
      expect(datos.timestamp).toBeLessThanOrEqual(despues);
    });
  });
}); 