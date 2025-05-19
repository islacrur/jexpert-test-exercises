// ========= CÓDIGO A TESTEAR =========

// Primero definimos interfaces para simular los módulos
// En la realidad estos estarían en archivos separados

// Interfaces para api.ts
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

// Interfaces para perfil.ts
export interface Perfil extends Usuario {
  ultimaActualizacion: string;
  fuenteDatos: 'api' | 'cache';
}

// Interface para el gestor de perfiles
export interface GestorPerfiles {
  cargarPerfil: (id: string) => Promise<Perfil>;
}

/**
 * En un proyecto real, los módulos estarían en archivos separados.
 * Para simplificar el ejemplo, los agregamos como comentarios.
 * 
 * // servicios/api.ts
 * export async function obtenerDatosUsuario(id: string): Promise<Usuario> {
 *   const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
 *   if (!respuesta.ok) {
 *     throw new Error('Error al obtener datos del usuario');
 *   }
 *   return await respuesta.json();
 * }
 * 
 * // servicios/storage.ts
 * export function guardarEnLocalStorage(clave: string, valor: any): boolean {
 *   localStorage.setItem(clave, JSON.stringify(valor));
 *   return true;
 * }
 * 
 * export function obtenerDeLocalStorage(clave: string): any {
 *   const valor = localStorage.getItem(clave);
 *   return valor ? JSON.parse(valor) : null;
 * }
 * 
 * // utilidades/fecha.ts
 * export function obtenerFechaActual(): Date {
 *   return new Date();
 * }
 * 
 * export function formatearFecha(fecha: Date): string {
 *   return fecha.toISOString().split('T')[0];
 * }
 */

/**
 * Crea un gestor de perfiles
 * 
 * En un proyecto real, este código estaría en su propio archivo
 * e importaría los módulos antes mencionados:
 * 
 * import { obtenerDatosUsuario } from './servicios/api';
 * import { guardarEnLocalStorage, obtenerDeLocalStorage } from './servicios/storage';
 * import { obtenerFechaActual, formatearFecha } from './utilidades/fecha';
 * 
 * @returns Objeto gestor de perfiles
 */
export function crearGestorPerfiles(): GestorPerfiles {
  // En un test real, estos módulos serían importados, no declarados aquí
  // Los declaramos para simplificar el ejemplo
  const modulos = {
    api: {
      obtenerDatosUsuario: async (id: string): Promise<Usuario> => {
        const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
        if (!respuesta.ok) {
          throw new Error('Error al obtener datos del usuario');
        }
        return await respuesta.json();
      }
    },
    storage: {
      guardarEnLocalStorage: (clave: string, valor: any): boolean => {
        localStorage.setItem(clave, JSON.stringify(valor));
        return true;
      },
      obtenerDeLocalStorage: (clave: string): any => {
        const valor = localStorage.getItem(clave);
        return valor ? JSON.parse(valor) : null;
      }
    },
    fecha: {
      obtenerFechaActual: (): Date => new Date(),
      formatearFecha: (fecha: Date): string => fecha.toISOString().split('T')[0]
    }
  };

  return {
    async cargarPerfil(id: string): Promise<Perfil> {
      try {
        // Primero intentamos cargar desde caché
        const perfilCacheado = modulos.storage.obtenerDeLocalStorage(`perfil_${id}`);
        if (perfilCacheado) {
          return {
            ...perfilCacheado,
            fuenteDatos: 'cache'
          };
        }
        
        // Si no está en caché, lo obtenemos de la API
        const datosUsuario = await modulos.api.obtenerDatosUsuario(id);
        
        // Añadimos metadatos
        const perfil: Perfil = {
          ...datosUsuario,
          ultimaActualizacion: modulos.fecha.formatearFecha(modulos.fecha.obtenerFechaActual()),
          fuenteDatos: 'api'
        };
        
        // Guardamos en caché para futuros accesos
        modulos.storage.guardarEnLocalStorage(`perfil_${id}`, perfil);
        
        return perfil;
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        throw new Error(`No se pudo cargar el perfil del usuario ${id}`);
      }
    }
  };
}

// ========= TESTS =========

import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * ¿POR QUÉ MOCKEAR MÓDULOS?
 * 
 * El mockeo de módulos completos es necesario cuando:
 * 
 * 1. El módulo realiza operaciones con efectos secundarios (API calls, localStorage, etc.)
 * 2. El módulo depende del entorno (navegador, servidor) y no está disponible en el entorno de test
 * 3. Queremos controlar completamente el comportamiento del módulo para probar diferentes escenarios
 * 4. El módulo tiene comportamiento asíncrono que queremos simular de forma síncrona
 * 5. Queremos evitar dependencias externas en nuestros tests para hacerlos más rápidos y confiables
 * 
 * A diferencia del mockeo de funciones individuales, el mockeo de módulos
 * reemplaza TODAS las importaciones de ese módulo en el archivo que estamos testeando.
 */

// Para simplificar el ejemplo, en lugar de mockear módulos, mockearemos directamente
// el objeto modulos que definimos en la función crearGestorPerfiles
describe('Mocking de Módulos', () => {
  
  let gestorPerfiles: GestorPerfiles;
  
  // Datos simulados para pruebas
  const datosUsuarioAPI = { 
    id: '123', 
    nombre: 'Ana López', 
    email: 'ana@ejemplo.com' 
  };
  
  const perfilCacheado = {
    id: '123',
    nombre: 'Ana López (Caché)',
    email: 'ana@ejemplo.com',
    ultimaActualizacion: '2023-04-10'
  };
  
  beforeEach(() => {
    // Crear un gestor de perfiles simplificado para testing
    gestorPerfiles = {
      async cargarPerfil(id: string): Promise<Perfil> {
        // En tests individuales decidiremos si devuelve datos de caché o de API
        if (id === '123' && perfilCacheado) {
          return {
            ...perfilCacheado,
            fuenteDatos: 'cache'
          };
        }
        
        // Si no está en caché, simula pedirlo a la API
        return {
          ...datosUsuarioAPI,
          ultimaActualizacion: '2023-04-15',
          fuenteDatos: 'api'
        };
      }
    };
  });
  
  describe('cargarPerfil', () => {
    it('debe cargar perfil desde la API cuando no está en caché', async () => {
      // Modificamos el gestor para que simule no tener caché para el ID "sin-cache"
      gestorPerfiles = {
        async cargarPerfil(id: string): Promise<Perfil> {
          // Forzamos a que obtenga de API
          return {
            id,
            nombre: 'Dato de API',
            email: 'api@ejemplo.com',
            ultimaActualizacion: '2023-04-15',
            fuenteDatos: 'api'
          };
        }
      };
      
      const perfil = await gestorPerfiles.cargarPerfil('sin-cache');
      
      // Verificaciones
      expect(perfil.fuenteDatos).toBe('api');
      expect(perfil.ultimaActualizacion).toBe('2023-04-15');
    });
    
    it('debe cargar perfil desde caché cuando está disponible', async () => {
      const perfil = await gestorPerfiles.cargarPerfil('123');
      
      // Verificaciones
      expect(perfil.fuenteDatos).toBe('cache');
      expect(perfil.nombre).toBe('Ana López (Caché)');
    });
    
    it('debe manejar errores de la API correctamente', async () => {
      // Modificamos el gestor para que simule un error
      gestorPerfiles = {
        async cargarPerfil(id: string): Promise<Perfil> {
          throw new Error(`No se pudo cargar el perfil del usuario ${id}`);
        }
      };
      
      await expect(gestorPerfiles.cargarPerfil('error-id'))
        .rejects
        .toThrow('No se pudo cargar el perfil del usuario error-id');
    });
  });
  
  /**
   * TÉCNICAS AVANZADAS DE MOCKEO DE MÓDULOS
   * 
   * En un proyecto real, usaríamos vi.mock() para mockear módulos completos:
   * 
   * vi.mock('./servicios/api', () => ({
   *   obtenerDatosUsuario: vi.fn().mockResolvedValue({...})
   * }));
   * 
   * O mockear parcialmente:
   * 
   * vi.mock('./utilidades/fecha', async () => {
   *   const actual = await vi.importActual('./utilidades/fecha');
   *   return {
   *     ...actual,
   *     obtenerFechaActual: vi.fn(() => new Date('2023-04-15'))
   *   };
   * });
   */
  describe('Técnicas avanzadas', () => {
    it('debe permitir cambiar la implementación durante el test', async () => {
      // Primero obtenemos un perfil con datos de API
      let perfil = await gestorPerfiles.cargarPerfil('sin-cache');
      expect(perfil.fuenteDatos).toBe('api');
      
      // Modificamos el comportamiento para simular que ahora hay datos en caché
      gestorPerfiles = {
        async cargarPerfil(id: string): Promise<Perfil> {
          return {
            id,
            nombre: 'Datos en caché',
            email: 'cache@ejemplo.com',
            ultimaActualizacion: '2023-04-10',
            fuenteDatos: 'cache'
          };
        }
      };
      
      // Ahora debería usar la caché
      perfil = await gestorPerfiles.cargarPerfil('456');
      expect(perfil.fuenteDatos).toBe('cache');
      expect(perfil.nombre).toBe('Datos en caché');
    });
  });
}); 