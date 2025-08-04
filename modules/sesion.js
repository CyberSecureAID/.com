// modules/sesion.js

export function guardarSesion({ correo, rol }) {
  localStorage.setItem('correoUsuario', correo)
  localStorage.setItem('rolUsuario', rol)
}

export function obtenerSesion() {
  return {
    correo: localStorage.getItem('correoUsuario'),
    rol: localStorage.getItem('rolUsuario')
  }
}

export function cerrarSesion() {
  localStorage.removeItem('correoUsuario')
  localStorage.removeItem('rolUsuario')
}
