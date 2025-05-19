export function validarTexto(texto: string, palabrasProhibidas: string[]): boolean {
  for (const palabra of palabrasProhibidas) {
    if (texto.toLowerCase().includes(palabra.toLowerCase())) {
      return false;
    }
  }
  return true;
}

export function esPar(numero: number): boolean {
  return numero % 2 === 0;
}


import { describe, it, expect } from 'vitest';

describe('Aserciones negativas', () => {
  
  describe('validarTexto', () => {
    const palabrasProhibidas = ['spam', 'ofensivo', 'inapropiado'];
    
    it('debe rechazar texto con palabras prohibidas usando not.toBe', () => {
      const textoInvalido = 'Este texto contiene spam y no es aceptable';
      // not.toBe: Aserción negativa - verifica que NO sea true
      expect(validarTexto(textoInvalido, palabrasProhibidas)).not.toBe(true);
    });
    
    it('el texto válido no debe contener ninguna palabra prohibida usando not.toContain', () => {
      const textoValido = 'Este es un texto normal y aceptable';
      
      // Verifica que ninguna palabra prohibida esté en el texto
      for (const palabra of palabrasProhibidas) {
        // not.toContain: Verifica que un string NO contenga una substring
        expect(textoValido.toLowerCase()).not.toContain(palabra.toLowerCase());
      }
    });
  });
  
  describe('esPar', () => {
    it('debe identificar números impares usando not.toBe(true)', () => {
      // not.toBe: Verifica que el resultado NO sea true para impares
      expect(esPar(1)).not.toBe(true);
      expect(esPar(3)).not.toBe(true);
      expect(esPar(25)).not.toBe(true);
    });

    it('los números impares no deben ser pares usando not.toBeTruthy y toBe(false)', () => {
      const numerosImpares = [1, 3, 5, 7, 9];
      
      for (const numero of numerosImpares) {
        // Múltiples formas de hacer la misma aserción negativa
        expect(esPar(numero)).not.toBeTruthy(); // Verifica que no sea truthy
        expect(esPar(numero)).toBe(false); // Verifica que sea explícitamente false
      }
    });
  });
});