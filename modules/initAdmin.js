// modules/initAdmin.js

import { obtenerSesion, cerrarSesion } from './sesion.js'
import { redirigirSegunRol } from './panelPorRol.js'
import { cargarMetricas } from './metricas.js'
import { cargarUsuarios } from './usuarios.js'
import { cargarPanelRoles } from './roles.js'

document.addEventListener('DOMContentLoaded', async () => {
  const sesion = obtenerSesion()

  // 🧭 Validar sesión activa y rol correcto
  if (!sesion || sesion.rol !== 'administrador') {
    console.warn('🚫 Acceso no autorizado. Redirigiendo según rol...')
    redirigirSegunRol(sesion?.rol)
    return
  }

  // 👋 Mostrar saludo institucional personalizado
  const saludo = document.getElementById('saludoAdmin')
  if (saludo) {
    saludo.textContent = `👋 Hola, ${sesion.correo}`
  }

  // 📊 Cargar métricas institucionales
  cargarMetricas()

  // 👥 Cargar vista de usuarios si corresponde
  document.getElementById('btnVerUsuarios')?.addEventListener('click', cargarUsuarios)

  // 🔐 Panel reversible de configuración de roles
  document.getElementById('btnGestionarRoles')?.addEventListener('click', cargarPanelRoles)

  // 🔓 Botón para cerrar sesión
  document.getElementById('btnCerrarSesion')?.addEventListener('click', () => {
    cerrarSesion()
    window.location.href = 'login.html'
  })
})
