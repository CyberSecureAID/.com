// scripts/scripts-index.js

import { mostrarBienvenida } from '../components/bienvenida.js'
import { alternarPanel } from '../components/panelPorRol.js'
import { obtenerSesion, cerrarSesion } from '../modules/sesion.js'
import { iniciarEstrellas } from "../components/starsCanvas.js";

// 🔐 Inicializar sesión y vista del usuario
document.addEventListener('DOMContentLoaded', () => {
  const sesion = obtenerSesion()
  const btnSesion = document.getElementById('session-btn')

  if (sesion && sesion.correo) {
    mostrarBienvenida()
    alternarPanel()
    inicializarIdioma()

    if (btnSesion) {
      btnSesion.textContent = '🔓 Cerrar sesión'
      btnSesion.onclick = () => {
        cerrarSesion()
        window.location.href = 'login.html'
      }
    }
  } else {
    console.warn('No hay sesión activa. Se requiere login para mostrar contenido.')

    if (btnSesion) {
      btnSesion.textContent = '🔐 Acceder al sistema'
      btnSesion.onclick = () => {
        window.location.href = 'login.html'
      }
    }
  }
})

// 🌐 Inicialización del selector de idioma
function inicializarIdioma() {
  const selector = document.getElementById('languageSelector')
  const bandera = document.getElementById('languageFlag')
  if (!selector || !bandera) return

  // Aplicar idioma guardado
  const idiomaInicial = recuperarIdioma()
  traducir(idiomaInicial)
  bandera.setAttribute('data-lang', idiomaInicial)
  bandera.src = `assets/flags/${idiomaInicial}.svg`

  bandera.addEventListener('click', () => {
    const actual = bandera.getAttribute('data-lang')
    const nuevo = actual === 'es' ? 'us' : 'es'
    bandera.src = `assets/flags/${nuevo}.svg`
    bandera.setAttribute('data-lang', nuevo)
    guardarIdioma(nuevo)
    animarBandera(bandera)
    traducir(nuevo)
  })
}

// 📌 Traducción de textos dinámicos
async function traducir(idioma) {
  try {
    const res = await fetch('/translations.json')
    const data = await res.json()
    const elementos = document.querySelectorAll('[data-key]')

    const claves = new Set()
    elementos.forEach(el => {
      const clave = el.getAttribute('data-key')

      if (!clave || claves.has(clave)) {
        console.warn(`⚠️ Clave duplicada o vacía: "${clave}"`)
        return
      }

      claves.add(clave)
      if (data[idioma][clave]) el.textContent = data[idioma][clave]
    })
  } catch (error) {
    console.error('Error cargando traducciones:', error)
  }
}

// 💾 Persistencia de idioma
function guardarIdioma(idioma) {
  localStorage.setItem('idiomaPreferido', idioma)
}

function recuperarIdioma() {
  return localStorage.getItem('idiomaPreferido') || 'es'
}

// ✨ Animación reversible de bandera
function animarBandera(elemento) {
  elemento.classList.add('giro-bandera')
  setTimeout(() => {
    elemento.classList.remove('giro-bandera')
  }, 300)
}

// Estrellas
  iniciarEstrellas("stars");
