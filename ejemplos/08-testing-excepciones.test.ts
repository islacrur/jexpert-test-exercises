
export function dividir(dividendo: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return dividendo / divisor;
}


export interface UsuarioAValidar {
  nombre?: string;
  email?: string;
}

export function validarUsuario(usuario: UsuarioAValidar): boolean {
  if (!usuario) {
    throw new Error('El usuario es requerido');
  }

  if (!usuario.nombre) {
    throw new Error('El nombre es requerido');
  }

  if (!usuario.email) {
    throw new Error('El email es requerido');
  }

  if (!usuario.email.includes('@')) {
    throw new Error('Email inválido');
  }

  return true;
}

// ========= TESTS =========

import { describe, it, expect } from 'vitest';

describe('Testing de Excepciones', () => {
  
  describe('Función dividir', () => {
    it('debe lanzar error al dividir por cero', () => {
      expect(() => dividir(10, 0)).toThrow('No se puede dividir por cero');
    });
    
    it('debe dividir correctamente con divisor válido', () => {
      expect(dividir(10, 2)).toBe(5);
    });
  });

  describe('Validación de usuario', () => {
    it('debe validar campos requeridos', () => {
      const usuarioSinNombre = {
        email: 'test@ejemplo.com'
      };
      expect(() => validarUsuario(usuarioSinNombre)).toThrow('El nombre es requerido');
      
      const usuarioEmailInvalido = {
        nombre: 'Test',
        email: 'invalido'
      };
      expect(() => validarUsuario(usuarioEmailInvalido)).toThrow('Email inválido');
    });
    
    it('debe aceptar usuario válido', () => {
      const usuarioValido = {
        nombre: 'Usuario Test',
        email: 'test@ejemplo.com'
      };
      expect(validarUsuario(usuarioValido)).toBe(true);
    });
  });
});