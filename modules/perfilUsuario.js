// modules/perfilUsuario.js

import { supabase } from '../modules/authSupabase.js'
import { guardarSesion } from './sesion.js'

export async function obtenerPerfilUsuario() {
  try {
    // ⛓️ Obtener usuario autenticado desde Supabase
    const { data: userData, error: errorUser } = await supabase.auth.getUser()
    if (errorUser || !userData?.user?.id) {
      console.warn('⚠️ No se pudo obtener el usuario autenticado.')
      return null
    }

    const idUsuario = userData.user.id
    const correo = userData.user.email

    // 📦 Consulta institucional del perfil
    const { data: perfil, error: errorPerfil } = await supabase
      .from('profiles')
      .select('rol')
      .eq('id', idUsuario)
      .single()

    if (errorPerfil || !perfil) {
      console.warn('❌ No se encontró perfil institucional para:', correo)
      return null
    }

    // 🔐 Guardar sesión limpia con rol auditado
    guardarSesion({ correo, rol: perfil.rol })

    console.log(`✅ Perfil cargado: ${correo} | Rol: ${perfil.rol}`)
    return perfil.rol
  } catch (error) {
    console.error('🚫 Error al obtener el perfil institucional:', error.message)
    return null
  }
}
