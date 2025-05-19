
export interface Usuario {
  id: number;
  nombre: string;
  edad: number;
  email: string;
  roles: string[];
  creado: Date;
  metadata: {
    ultimoAcceso: null | Date;
    preferencias: Record<string, unknown>;
  };
}

export function crearUsuario(nombre: string, edad: number): Usuario {
  return {
    id: Math.floor(Math.random() * 1000),
    nombre,
    edad,
    email: `${nombre.toLowerCase().replace(' ', '.')}@ejemplo.com`,
    roles: ['usuario'],
    creado: new Date(),
    metadata: {
      ultimoAcceso: null,
      preferencias: {}
    }
  };
}

export function generarNumerosImpares(cantidad: number): number[] {
  const numeros: number[] = [];
  let numero = 1;
  
  for (let i = 0; i < cantidad; i++) {
    numeros.push(numero);
    numero += 2;
  }
  
  return numeros;
}

export function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}

// ========= TESTS =========

import { describe, it, expect } from 'vitest';

describe('Comparadores específicos', () => {
  
  describe('crearUsuario', () => {
    const usuario = crearUsuario('Ana Lopez', 28);
    
    it('debe contener todas las propiedades requeridas', () => {
      // toMatchObject: Verifica que el objeto tenga al menos las propiedades especificadas
      expect(usuario).toMatchObject({
        nombre: 'Ana Lopez',
        edad: 28,
        roles: ['usuario']
      });
    });
    
    it('debe tener un ID numérico', () => {
      // toBeGreaterThan/toBeLessThan: Comparaciones numéricas
      expect(usuario.id).toBeGreaterThanOrEqual(0);
      expect(usuario.id).toBeLessThan(1000);
    });
    
    it('debe tener un email que contiene el nombre', () => {
      // toContain: Verifica que un string contenga cierta substring
      expect(usuario.email).toContain('ana.lopez');
      // toMatch: Verifica contra una expresión regular
      expect(usuario.email).toMatch(/^[a-z\.]+@ejemplo\.com$/);
    });
    
    it('debe tener un campo creado que es una fecha reciente', () => {
      const ahora = new Date();
      // toBeInstanceOf: Verifica el tipo de objeto
      expect(usuario.creado).toBeInstanceOf(Date);
      // Verifica que la fecha creada no sea del futuro
      expect(usuario.creado.getTime()).toBeLessThanOrEqual(ahora.getTime());
      // Verifica que la fecha no sea más antigua que 1 minuto
      expect(ahora.getTime() - usuario.creado.getTime()).toBeLessThan(60000);
    });
    
    it('debe tener un campo de ultimoAcceso nulo', () => {
      // toBeNull: Verifica que un valor sea null específicamente
      expect(usuario.metadata.ultimoAcceso).toBeNull();
    });
  });
  
  describe('generarNumerosImpares', () => {
    it('debe generar un array con la cantidad correcta de números', () => {
      const numeros = generarNumerosImpares(5);
      // toHaveLength: Verifica la longitud exacta de un array
      expect(numeros).toHaveLength(5);
    });
    
    it('debe generar solo números impares', () => {
      const numeros = generarNumerosImpares(10);
      // every con expect().toBeTruthy(): Verifica una condición para todos los elementos
      expect(numeros.every(n => n % 2 === 1)).toBeTruthy();
    });
    
    it('debe iniciar con el número 1', () => {
      const numeros = generarNumerosImpares(3);
      // Comprueba el primer elemento
      expect(numeros[0]).toBe(1);
      // toEqual: Comparación profunda, útil para arrays
      expect(numeros).toEqual([1, 3, 5]);
    });
  });
  
  describe('lanzarError', () => {
    it('debe lanzar un error con el mensaje correcto', () => {
      const mensaje = 'Error de prueba';
      // toThrow: Verifica que una función lanza un error
      expect(() => lanzarError(mensaje)).toThrow();
      // toThrow con argumento: Verifica el mensaje del error
      expect(() => lanzarError(mensaje)).toThrow(mensaje);
    });
  });
}); 