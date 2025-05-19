export function calcularPrecioConImpuestos(precio: number, impuesto: number): number {
  return precio + (precio * impuesto / 100);
}

export function formatearNombre(nombre: string, apellido: string): string {
  return `${nombre} ${apellido}`;
}

export interface Producto {
  nombre: string;
  precio: number;
  disponible: boolean;
  fechaCreacion: Date;
}

export function crearProducto(nombre: string, precio: number): Producto {
  return {
    nombre,
    precio,
    disponible: true,
    fechaCreacion: new Date()
  };
}

// ========= TESTS =========

import { describe, it, expect } from 'vitest';

describe('Aserciones básicas', () => {
  
  describe('calcularPrecioConImpuestos', () => {
    it('debe calcular correctamente el precio con impuestos', () => {
      // Aserciones con toBe (igualdad exacta)
      expect(calcularPrecioConImpuestos(100, 21)).toBe(121);
      expect(calcularPrecioConImpuestos(200, 10)).toBe(220);
    });

    it('debe retornar un número', () => {
      // Aserción verificando tipo
      expect(typeof calcularPrecioConImpuestos(100, 21)).toBe('number');
    });
  });

  describe('formatearNombre', () => {
    it('debe formatear correctamente el nombre completo', () => {
      // Aserciones con toBe para strings
      expect(formatearNombre('Juan', 'Pérez')).toBe('Juan Pérez');
      expect(formatearNombre('Ana', 'García')).toBe('Ana García');
    });

    it('debe retornar un string', () => {
      // Verificación de tipo
      expect(typeof formatearNombre('Juan', 'Pérez')).toBe('string');
    });
  });

  describe('crearProducto', () => {
    const producto: Producto = crearProducto('Laptop', 1000);

    it('debe tener las propiedades correctas', () => {
      // Verifica si el objeto tiene ciertas propiedades
      expect(producto).toHaveProperty('nombre');
      expect(producto).toHaveProperty('precio');
      expect(producto).toHaveProperty('disponible');
      expect(producto).toHaveProperty('fechaCreacion');
    });

    it('debe asignar valores correctamente', () => {
      // Verifica valores específicos
      expect(producto.nombre).toBe('Laptop');
      expect(producto.precio).toBe(1000);
      expect(producto.disponible).toBe(true);
    });

    it('debe tener una fecha válida', () => {
      // Verifica que el valor es una instancia de la clase Date
      expect(producto.fechaCreacion).toBeInstanceOf(Date);
    });
  });
}); 