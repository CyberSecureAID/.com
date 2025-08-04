import { loginUsuario, registrarUsuario } from "./authSupabase.js";

// login
document.getElementById("login-form").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  const session = await loginUsuario(email, pass);
  if (session) {
    console.log("✅ Acceso permitido");
    await obtenerRolDelUsuario(); // ➕ Decisión visual por rol
  }
});

// registro
document.getElementById("register-form").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("new-email").value;
  const pass = document.getElementById("new-pass").value;

  const result = await registrarUsuario(email, pass);
  if (result) {
    // 🧬 Obtener usuario recién creado
    const { data: userData } = await supabase.auth.getUser();

    if (userData?.user?.id) {
      await supabase.from("profiles").insert({
        id: userData.user.id,
        email: email,
        rol: "usuario" // ⚖️ Podés modular esto con una función extra
      });
      console.log("🆕 Perfil institucional creado");
    }

    alert("✅ Registro exitoso. Podés iniciar sesión ahora.");
    toggleForm("login");
  }
});

// alternar formularios reversibles
document.getElementById("toggle-to-register").onclick = () => toggleForm("register");
document.getElementById("toggle-to-login").onclick = () => toggleForm("login");

function toggleForm(mode) {
  const loginForm = document.getElementById("login-form");
  const regForm = document.getElementById("register-form");
  const title = document.getElementById("login-title");

  if (mode === "register") {
    loginForm.style.display = "none";
    regForm.style.display = "block";
    title.textContent = "📝 Registro CSID";
  } else {
    regForm.style.display = "none";
    loginForm.style.display = "block";
    title.textContent = "🔐 Iniciar sesión CSID";
  }
}

// 🧠 Rol y vistas dinámicas
async function obtenerRolDelUsuario() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user?.id) {
    console.error("No se pudo obtener el usuario.");
    return;
  }

  const { data: perfil, error } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", userData.user.id)
    .single();

  if (error) {
    console.error("Error al obtener el rol:", error.message);
    return;
  }

  const rol = perfil.rol;

  // ↔️ Mostrar vista según rol
  if (rol === "admin") mostrarPanelAdmin();
  else mostrarPanelUsuario();
}

// 👁️ Control visual reversible
function mostrarPanelAdmin() {
  document.getElementById("panel-admin").style.display = "block";
  document.getElementById("panel-usuario").style.display = "none";
}

function mostrarPanelUsuario() {
  document.getElementById("panel-usuario").style.display = "block";
  document.getElementById("panel-admin").style.display = "none";
}
