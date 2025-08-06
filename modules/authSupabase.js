// modules/authSupabase.js
import { guardarSesion } from './sesion.js'

// Tomamos el cliente global instanciado en login.html
const supabase = window.supabase

// Validación rápida de email
export function esCorreoValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Función auxiliar para redirigir tras login correcto
function redireccionarDashboard() {
  window.location.href = 'index.html'
}

// LOGIN unificado con SDK
export async function loginUsuario(email, password) {
  if (!esCorreoValido(email)) {
    alert('❌ Correo inválido')
    return null
  }

  const { data: authData, error: authError } = 
    await supabase.auth.signInWithPassword({ email, password })

  if (authError || !authData.session) {
    alert('❌ Login fallido: ' + (authError.message || ''))
    return null
  }

  const user = authData.user

  // Obtener rol desde profiles
  const { data: perfil, error: perfilError } = await supabase
    .from('profiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  if (perfilError || !perfil) {
    alert('⚠️ Rol no encontrado en perfil')
    return null
  }

  // Guardamos en localStorage/email+rol
  guardarSesion({ correo: user.email, rol: perfil.rol })
  redireccionarDashboard()
  return authData.session
}

// LOGOUT
export function logoutUsuario() {
  const email = localStorage.getItem('user_email')
  console.log(`[LOGOUT] ${email} | ${new Date().toISOString()}`)
  localStorage.removeItem('user_email')
  window.location.href = 'login.html'
}

// REGISTRO con SDK, crea sesión automáticamente
export async function registrarUsuario(email, password) {
  if (!esCorreoValido(email)) {
    alert('❌ Correo inválido')
    return null
  }

  const { data: signUpData, error: signUpError } = 
    await supabase.auth.signUp({ email, password })

  if (signUpError || !signUpData.user?.id) {
    alert('⚠️ Registro fallido: ' + (signUpError.message || ''))
    return null
  }

  return signUpData.user
}

// CREAR PERFIL INSTITUCIONAL
export async function crearPerfilInstitucional(id, email, rol = 'usuario') {
  if (!id || !email) {
    console.warn('⚠️ Datos insuficientes para perfil.')
    return null
  }

  const { error } = await supabase
    .from('profiles')
    .insert({ id, email, rol })

  if (error) {
    console.warn('❌ Error al crear perfil:', error.message)
    return null
  }
  return true
}
