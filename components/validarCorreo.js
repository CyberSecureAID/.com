// components/validarCorreo.js

export function validarCorreo(correo) {
  const correoTrim = correo?.trim().toLowerCase()
  const regexFormato = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!correoTrim) {
    return { esValido: false, mensaje: '⚠️ El campo de correo está vacío.' }
  }

  if (!regexFormato.test(correoTrim)) {
    return { esValido: false, mensaje: '❌ El formato del correo no es válido.' }
  }

  const dominiosPermitidos = ['tudominio.org', 'institucional.net']
  const dominioExtraído = correoTrim.split('@')[1]

  if (!dominiosPermitidos.includes(dominioExtraído)) {
    return {
      esValido: false,
      mensaje: `🚫 Dominio no autorizado: ${dominioExtraído}`
    }
  }

  return { esValido: true, mensaje: '✅ Correo válido y autorizado.' }
}
