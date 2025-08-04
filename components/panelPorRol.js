// components/panelPorRol.js

import { obtenerSesion } from '../modules/sesion.js'

export function alternarPanel() {
  const { rol } = obtenerSesion()

  const adminPanel = document.getElementById('panel-admin')
  const userPanel = document.getElementById('panel-usuario')

  if (!adminPanel || !userPanel) return

  if (rol === 'admin') {
    adminPanel.style.display = 'block'
    userPanel.style.display = 'none'
  } else if (rol === 'usuario') {
    adminPanel.style.display = 'none'
    userPanel.style.display = 'block'
  } else {
    adminPanel.style.display = 'none'
    userPanel.style.display = 'none'
  }
}
