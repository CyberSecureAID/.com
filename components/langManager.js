import translations from '../translations.json'

export function aplicarTraduccion(idioma = "es") {
  const elementos = document.querySelectorAll("[data-key]")
  const clavesUsadas = new Set()

  elementos.forEach(el => {
    const clave = el.getAttribute("data-key")

    if (!clave) {
      console.warn("⚠️ Elemento sin data-key:", el)
      return
    }

    if (clavesUsadas.has(clave)) {
      console.warn(`⚠️ Clave duplicada: "${clave}"`)
    } else {
      clavesUsadas.add(clave)
    }

    const textoTraducido = translations[idioma]?.[clave]
    if (textoTraducido) {
      el.textContent = textoTraducido
    } else {
      console.warn(`🕵️ Traducción faltante: "${clave}" en idioma "${idioma}"`)
    }
  })
}
