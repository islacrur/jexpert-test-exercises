export function validarTexto(texto: string, palabrasProhibidas: string[]): boolean {
  for (const palabra of palabrasProhibidas) {
    if (texto.toLowerCase().includes(palabra.toLowerCase())) {
      return false;
    }
  }
  return true;
}

export interface Usuario {
  id: number;
  nombre: string;
  edad: number;
}

export function filtrarUsuariosPorEdad(usuarios: Usuario[], edadMinima: number): Usuario[] {
  return usuarios.filter(usuario => usuario.edad >= edadMinima);
}

export function esPar(numero: number): boolean {
  return numero % 2 === 0;
}


import { describe, it, expect } from 'vitest';

describe('Aserciones negativas', () => {
  
  describe('validarTexto', () => {
    const palabrasProhibidas = ['spam', 'ofensivo', 'inapropiado'];
    
    it('debe aceptar texto sin palabras prohibidas', () => {
      const textoValido = 'Este es un texto normal y aceptable';
      expect(validarTexto(textoValido, palabrasProhibidas)).toBe(true);
    });
    
    it('debe rechazar texto con palabras prohibidas', () => {
      const textoInvalido = 'Este texto contiene spam y no es aceptable';
      // not.toBe: Aserción negativa - verifica que NO sea true
      expect(validarTexto(textoInvalido, palabrasProhibidas)).not.toBe(true);
    });
    
    it('debe ser insensible a mayúsculas/minúsculas', () => {
      const textoInvalido = 'Este texto es OFENSIVO';
      // not.toBeTruthy: Verifica que el resultado no sea truthy
      expect(validarTexto(textoInvalido, palabrasProhibidas)).not.toBeTruthy();
    });
    
    it('el texto válido no debe contener ninguna palabra prohibida', () => {
      const textoValido = 'Este es un texto normal y aceptable';
      
      // Verifica que ninguna palabra prohibida esté en el texto
      for (const palabra of palabrasProhibidas) {
        // not.toContain: Verifica que un string NO contenga una substring
        expect(textoValido.toLowerCase()).not.toContain(palabra.toLowerCase());
      }
    });
  });
  
  describe('filtrarUsuariosPorEdad', () => {
    const usuarios: Usuario[] = [
      { id: 1, nombre: 'Ana', edad: 25 },
      { id: 2, nombre: 'Luis', edad: 17 },
      { id: 3, nombre: 'Carlos', edad: 30 },
      { id: 4, nombre: 'María', edad: 16 }
    ];
    
    it('debe excluir usuarios menores de edad', () => {
      const usuariosFiltrados = filtrarUsuariosPorEdad(usuarios, 18);
      
      // Verifica que no haya usuarios menores de 18 años
      // not.toEqual: Verifica que el array NO sea igual a otro
      expect(usuariosFiltrados).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 2 }),
          expect.objectContaining({ id: 4 })
        ])
      );
      
      // Verifica que los IDs de los usuarios filtrados no incluyan los IDs de menores
      const idsFiltrados = usuariosFiltrados.map(u => u.id);
      // not.toContain: Verifica que un array NO contenga cierto elemento
      expect(idsFiltrados).not.toContain(2);
      expect(idsFiltrados).not.toContain(4);
    });
    
    it('la lista filtrada no debe tener la misma longitud que la original cuando hay menores', () => {
      const usuariosFiltrados = filtrarUsuariosPorEdad(usuarios, 18);
      // not.toHaveLength: Verifica que un array NO tenga cierta longitud
      expect(usuariosFiltrados).not.toHaveLength(usuarios.length);
    });
  });
  
  describe('esPar', () => {
    it('debe identificar números impares', () => {
      // not.toBe: Verifica que el resultado NO sea true para impares
      expect(esPar(1)).not.toBe(true);
      expect(esPar(3)).not.toBe(true);
      expect(esPar(25)).not.toBe(true);
    });
    
    it('los números impares no deben ser pares', () => {
      const numerosImpares = [1, 3, 5, 7, 9];
      
      for (const numero of numerosImpares) {
        // Múltiples formas de hacer la misma aserción negativa
        expect(esPar(numero)).not.toBeTruthy();
        expect(esPar(numero)).toBe(false);
        expect(esPar(numero)).not.toBe(true);
      }
    });
  });
}); 