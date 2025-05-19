
export interface BaseDatos {
  datos: Map<string, any>;
  conectado: boolean;
  conectar: () => Promise<boolean>;
  desconectar: () => Promise<boolean>;
  guardar: (clave: string, valor: any) => boolean;
  obtener: (clave: string) => any;
}

export interface GestorUsuarios {
  db: BaseDatos;
  crearUsuario: (id: string, datos: Record<string, any>) => boolean;
  obtenerUsuario: (id: string) => Record<string, any> | undefined;
}

/**
 * Crea una instancia de la base de datos en memoria
 */
export function crearBaseDatos(): BaseDatos {
  const datos = new Map<string, any>();
  let conectado = false;

  return {
    datos,
    conectado,
    
    async conectar() {
      // Simulamos una conexión con un pequeño retraso
      return new Promise<boolean>(resolve => {
        setTimeout(() => {
          this.conectado = true;
          resolve(true);
        }, 10);
      });
    },
    
    async desconectar() {
      return new Promise<boolean>(resolve => {
        setTimeout(() => {
          this.conectado = false;
          this.datos.clear();
          resolve(true);
        }, 10);
      });
    },
    
    guardar(clave: string, valor: any) {
      if (!this.conectado) {
        throw new Error('No se puede guardar: base de datos no conectada');
      }
      this.datos.set(clave, valor);
      return true;
    },
    
    obtener(clave: string) {
      if (!this.conectado) {
        throw new Error('No se puede obtener: base de datos no conectada');
      }
      return this.datos.get(clave);
    }
  };
}

/**
 * Crea un gestor de usuarios para la base de datos
 */
export function crearGestorUsuarios(baseDatos: BaseDatos): GestorUsuarios {
  return {
    db: baseDatos,
    
    crearUsuario(id: string, datos: Record<string, any>) {
      return this.db.guardar(`usuario_${id}`, datos);
    },
    
    obtenerUsuario(id: string) {
      return this.db.obtener(`usuario_${id}`);
    }
  };
}


import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

describe('Setup y Teardown', () => {
  
  // Variables a nivel de suite para usar en múltiples pruebas
  let db: BaseDatos;
  let gestorUsuarios: GestorUsuarios;
  
  /**
   * beforeAll:
   * Se ejecuta una vez antes de todas las pruebas en este bloque
   * Ideal para inicializar recursos que se compartirán entre pruebas
   */
  beforeAll(async () => {
    console.log('✨ Inicializando base de datos para todas las pruebas');
    db = crearBaseDatos();
    await db.conectar();
    gestorUsuarios = crearGestorUsuarios(db);
  });
  
  /**
   * afterAll:
   * Se ejecuta una vez después de todas las pruebas en este bloque
   * Ideal para limpiar recursos globales
   */
  afterAll(async () => {
    console.log('🧹 Limpiando recursos después de todas las pruebas');
    await db.desconectar();
    db = null as any;
    gestorUsuarios = null as any;
  });
  
  describe('Gestión de usuarios individuales', () => {
    // Datos de prueba para cada test
    const datosUsuarioPrueba = { nombre: 'Usuario Prueba', email: 'test@ejemplo.com' };
    let idUsuarioPrueba: string;
    
    /**
     * beforeEach:
     * Se ejecuta antes de cada prueba dentro de este describe
     * Ideal para preparar el estado inicial que cada prueba necesita
     */
    beforeEach(() => {
      console.log('🔄 Preparando datos para la siguiente prueba');
      // Creamos un ID único para cada prueba para evitar interferencias
      idUsuarioPrueba = `test_${Date.now()}`;
    });
    
    /**
     * afterEach:
     * Se ejecuta después de cada prueba dentro de este describe
     * Ideal para limpiar cambios hechos durante la prueba
     */
    afterEach(() => {
      console.log('🧼 Limpiando después de la prueba');
      // Aquí podríamos eliminar datos específicos si fuera necesario
    });
    
    it('debe crear un usuario correctamente', () => {
      // Fase de Act
      const resultado = gestorUsuarios.crearUsuario(idUsuarioPrueba, datosUsuarioPrueba);
      
      // Fase de Assert
      expect(resultado).toBe(true);
    });
    
    it('debe recuperar un usuario creado', () => {
      // Fase de Arrange (ya hecho por beforeEach)
      // Primero creamos el usuario
      gestorUsuarios.crearUsuario(idUsuarioPrueba, datosUsuarioPrueba);
      
      // Fase de Act
      const usuarioRecuperado = gestorUsuarios.obtenerUsuario(idUsuarioPrueba);
      
      // Fase de Assert
      // Aseguramos que el usuario exista
      expect(usuarioRecuperado).toBeDefined();
      // Ahora podemos verificar los valores confiando que no es undefined
      if (usuarioRecuperado) {
        expect(usuarioRecuperado).toEqual(datosUsuarioPrueba);
        expect(usuarioRecuperado.nombre).toBe(datosUsuarioPrueba.nombre);
      }
    });
  });
  
  describe('Múltiples usuarios', () => {
    // Configuración específica para este grupo de pruebas
    type UsuarioTest = {
      id: string;
      datos: {
        nombre: string;
        email: string;
      };
    };
    
    const usuarios: UsuarioTest[] = [
      { id: 'user1', datos: { nombre: 'Usuario 1', email: 'user1@ejemplo.com' } },
      { id: 'user2', datos: { nombre: 'Usuario 2', email: 'user2@ejemplo.com' } }
    ];
    
    beforeEach(() => {
      console.log('📥 Cargando múltiples usuarios de prueba');
      // Cargamos varios usuarios para pruebas que necesitan múltiples registros
      usuarios.forEach(u => gestorUsuarios.crearUsuario(u.id, u.datos));
    });
    
    it('debe obtener usuarios distintos con IDs diferentes', () => {
      const usuario1 = gestorUsuarios.obtenerUsuario('user1');
      const usuario2 = gestorUsuarios.obtenerUsuario('user2');
      
      // Aseguramos que ambos usuarios existan
      expect(usuario1).toBeDefined();
      expect(usuario2).toBeDefined();
      
      // Solo realizamos las comparaciones si ambos usuarios existen
      if (usuario1 && usuario2) {
        expect(usuario1).not.toEqual(usuario2);
        expect(usuario1.nombre).toBe('Usuario 1');
        expect(usuario2.nombre).toBe('Usuario 2');
      }
    });
  });
}); 