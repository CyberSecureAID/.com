import { obtenerSesion } from '../modules/sesion.js'

export function mostrarBienvenida() {
  const { correo, rol } = obtenerSesion()
  const mensaje = document.getElementById('mensajeBienvenida')

  if (!mensaje) return

  if (rol === 'admin') {
    mensaje.textContent = `👑 Bienvenido, administrador: ${correo}`
  } else if (rol === 'usuario') {
    mensaje.textContent = `✨ Hola ${correo}, explorá tu panel personalizado`
  } else {
    mensaje.textContent = `🙋 Bienvenido a CyberSecureAID`
  }
}
