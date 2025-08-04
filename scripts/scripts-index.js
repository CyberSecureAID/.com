// scripts/scripts-index.js

import { mostrarBienvenida } from '../components/bienvenida.js'
import { alternarPanel } from '../components/panelPorRol.js'
import { obtenerSesion } from '../modules/sesion.js'

// 🔐 Inicializar sesión y vista del usuario
document.addEventListener('DOMContentLoaded', () => {
  const sesion = obtenerSesion()

  if (sesion && sesion.correo) {
    mostrarBienvenida()
    alternarPanel()
    inicializarIdioma()
  } else {
    console.warn('No hay sesión activa. Se requiere login para mostrar contenido.')
  }
})

// 🌐 Inicialización del selector de idioma
function inicializarIdioma() {
  const selector = document.getElementById('languageSelector')
  const bandera = document.getElementById('languageFlag')

  if (!selector || !bandera) return

  bandera.addEventListener('click', () => {
    const actual = bandera.getAttribute('data-lang')
    const nuevo = actual === 'es' ? 'us' : 'es'
    bandera.src = `assets/flags/${nuevo}.svg`
    bandera.setAttribute('data-lang', nuevo)
    traducir(nuevo)
  })
}

// 📌 Traducción de textos dinámicos (si usás translations.json)
async function traducir(idioma) {
  try {
    const res = await fetch('/translations.json')
    const data = await res.json()

    const elementos = document.querySelectorAll('[data-key]')
    elementos.forEach(el => {
      const clave = el.getAttribute('data-key')
      if (data[idioma][clave]) el.textContent = data[idioma][clave]
    })
  } catch (error) {
    console.error('Error cargando traducciones:', error)
  }
}
