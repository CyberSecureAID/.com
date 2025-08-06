// 🔁 Alternar formularios institucionales con control visual modular

/**
 * Alterna visibilidad entre dos formularios y actualiza el título principal.
 * @param {Object} opciones - Configuración visual.
 * @param {string} opciones.idLogin - ID del formulario de login.
 * @param {string} opciones.idRegister - ID del formulario de registro.
 * @param {string} opciones.idTitle - ID del elemento de título institucional.
 * @param {string} opciones.modo - "login" o "register".
 */
export function alternarFormularios({ idLogin, idRegister, idTitle, modo }) {
  const loginForm = document.getElementById(idLogin);
  const regForm = document.getElementById(idRegister);
  const title = document.getElementById(idTitle);

  if (!loginForm || !regForm || !title) {
    console.warn("❌ IDs inválidos en alternancia de formularios.");
    return;
  }

  const textos = {
    login: "Iniciar sesión CSID",
    register: "Registro CSID"
  };

  if (modo === "register") {
    loginForm.style.display = "none";
    regForm.style.display = "block";
    title.textContent = textos.register;
  } else {
    regForm.style.display = "none";
    loginForm.style.display = "block";
    title.textContent = textos.login;
  }
}
