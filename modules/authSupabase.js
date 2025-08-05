import { guardarSesion } from '../modules/sesion.js'

const URL = "https://kirzvpcqtmrpmwsrutsi.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpcnp2cGNxdG1ycG13c3J1dHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjM5MjcsImV4cCI6MjA2OTMzOTkyN30.sGiBi5YdFGCdHVqVFO3RnfubLsww3v-8E5W07AUJQwA"; 

// 📌 Validación sintáctica de correo
export function esCorreoValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 🚀 Redirección coherente al dashboard principal
function redireccionarDashboard() {
  window.location.href = "index.html";
}

// 🔐 LOGIN de usuario
export async function loginUsuario(email, password) {
  try {
    if (!esCorreoValido(email)) {
      alert("❌ Correo inválido");
      return null;
    }

    const res = await fetch(`${URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "apikey": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data?.access_token) {
      guardarSesion({ correo: email, rol: 'usuario' }); // ✅ Uso modular
      redireccionarDashboard();
      return data;
    } else {
      console.warn("⚠️ Error en token:", data);
      alert("❌ Login fallido");
      return null;
    }
  } catch (error) {
    console.error("🚫 Error en login:", error.message);
    alert("⛔ Fallo técnico al iniciar sesión.");
    return null;
  }
}

// 👋 LOGOUT
export function logoutUsuario() {
  const email = localStorage.getItem("user_email");
  console.log(`[LOGOUT] ${email} | ${new Date().toISOString()}`);
  localStorage.removeItem("user_email");
  window.location.href = "login.html";
}

// 📥 Registro institucional de usuario
export async function registrarUsuario(email, password) {
  try {
    if (!esCorreoValido(email)) {
      alert("❌ Correo inválido");
      return null;
    }

    const res = await fetch(`${URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "apikey": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.user) {
      console.log("✅ Registro exitoso:", data.user.email);
      return data;
    } else {
      alert("⚠️ Registro fallido");
      console.warn("❌ Detalles:", data);
      return null;
    }
  } catch (error) {
    console.error("🚫 Error en registro:", error.message);
    alert("⛔ No se pudo registrar.");
    return null;
  }
}

// 🧱 Crear perfil institucional con rol
export async function crearPerfilInstitucional(id, email, rol = "usuario") {
  if (!id || !email) {
    console.warn("⚠️ Datos insuficientes para perfil.");
    return null;
  }

  const res = await fetch(`${URL}/rest/v1/profiles`, {
    method: "POST",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({ id, email, rol })
  });

  if (res.ok) {
    console.log(`✅ Perfil institucional creado con rol "${rol}"`);
    return true;
  } else {
    console.warn("❌ Error al crear perfil institucional");
    return null;
  }
}
