const URL = "https://kirzvpcqtmrpmwsrutsi.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpcnp2cGNxdG1ycG13c3J1dHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjM5MjcsImV4cCI6MjA2OTMzOTkyN30.sGiBi5YdFGCdHVqVFO3RnfubLsww3v-8E5W07AUJQwA"; // Clave pública real

// 🔍 Validación sintáctica de correo
function esCorreoValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 💾 Persistencia institucional
function guardarSesion(email, token) {
  localStorage.setItem("user_email", email);
  console.log(`🔐 Sesión iniciada: ${email} | Token: ${token}`);
}

// 🚀 Redirección visual coherente
function redireccionarDashboard() {
  window.location.href = "index.html";
}

// 🔐 LOGIN
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

    if (!res.ok) {
      console.warn("⚠️ Fallo HTTP:", res.status);
      alert("❌ Credenciales inválidas o red caída");
      return null;
    }

    const data = await res.json();
    if (data?.access_token) {
      guardarSesion(email, data.access_token);
      redireccionarDashboard();
      return data;
    } else {
      console.warn("⚠️ Token ausente:", data);
      alert("❌ Login fallido. Revisá permisos o formato.");
      return null;
    }
  } catch (error) {
    console.error("🚫 Error en login:", error.message);
    alert("⛔ Fallo de conexión con Supabase.");
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

// 🆕 REGISTRO
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

     // 🧩 Paso adicional: Crear su perfil
     const perfilRes = await fetch(`${URL}/rest/v1/profiles`, {
        method: "POST",
        headers: {
          "apikey": API_KEY,
          "Authorization": `Bearer ${data.access_token}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          id: data.user.id,
          rol: "usuario" // Rol inicial, puedes cambiarlo
        })
      });

      if (perfilRes.ok) {
        console.log("👤 Perfil creado correctamente");
      } else {
        console.warn("⚠️ Falló la creación del perfil");
      }

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