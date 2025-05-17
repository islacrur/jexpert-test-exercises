import { fetchUsuarios, fetchUsuarioPorId } from './api.js'

// Servicio que utiliza el módulo de API
export class ServicioUsuarios {
  async obtenerTodosLosUsuarios() {
    try {
      const usuarios = await fetchUsuarios()
      return usuarios.map(usuario => ({
        id: usuario.id,
        nombre: usuario.name,
        email: usuario.email
      }))
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      return []
    }
  }
  
  async obtenerUsuario(id) {
    try {
      const usuario = await fetchUsuarioPorId(id)
      return {
        id: usuario.id,
        nombre: usuario.name,
        email: usuario.email,
        direccion: usuario.address ? usuario.address.city : 'Desconocida'
      }
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error)
      return null
    }
  }
} 