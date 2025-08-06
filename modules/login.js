// modules/login.js
import {
  loginUsuario,
  registrarUsuario,
  crearPerfilInstitucional
} from './authSupabase.js'
import { alternarFormularios } from './alternancia.js'

// 🔐 LOGIN
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const pass = document.getElementById('password').value

  try {
    const session = await loginUsuario(email, pass)
    if (session) console.log('✅ Sesión iniciada', session)
  } catch (err) {
    console.error('Error en login:', err)
  }
})

// 📝 REGISTRO + CREAR PERFIL
document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.getElementById('new-email').value
  const pass = document.getElementById('new-pass').value

  try {
    const user = await registrarUsuario(email, pass)
    if (!user) return

    const ok = await crearPerfilInstitucional(user.id, user.email)
    if (ok) {
      alert('✅ Registro y perfil creados correctamente')
      alternarFormularios({
        idLogin: 'login-form',
        idRegister: 'register-form',
        idTitle: 'login-title',
        modo: 'login'
      })
    }
  } catch (err) {
    console.error('Error en registro:', err)
    alert('⚠️ ' + err.message)
  }
})

// 🔁 Alternancia entre formularios
document.getElementById('toggle-to-register').onclick = () =>
  alternarFormularios({
    idLogin: 'login-form',
    idRegister: 'register-form',
    idTitle: 'login-title',
    modo: 'register'
  })

document.getElementById('toggle-to-login').onclick = () =>
  alternarFormularios({
    idLogin: 'login-form',
    idRegister: 'register-form',
    idTitle: 'login-title',
    modo: 'login'
  })
