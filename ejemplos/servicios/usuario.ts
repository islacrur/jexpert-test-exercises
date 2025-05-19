// Servicio simple para obtener usuarios
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export async function obtenerUsuario(id: string): Promise<Usuario> {
  const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
  if (!respuesta.ok) {
    throw new Error('Error al obtener datos del usuario');
  }
  return await respuesta.json();
} 