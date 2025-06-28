let allTranslations = {};
let currentLang = localStorage.getItem("language") || "es";

document.addEventListener("DOMContentLoaded", function () {
  const termsBtn = document.querySelector(".floating-terms");

  // 🌐 BOTÓN FLOTANTE DE TÉRMINOS: visibilidad por scroll + touch optimizado
  if (termsBtn) {
    window.addEventListener("scroll", () => {
      const visible = window.scrollY > 300;
      termsBtn.style.opacity = visible ? "1" : "0";
      termsBtn.style.visibility = visible ? "visible" : "hidden";
    });

    termsBtn.style.transition = "opacity 0.3s, visibility 0.3s";
    termsBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
    termsBtn.style.visibility = window.scrollY > 300 ? "visible" : "hidden";

    if ("ontouchstart" in window) {
      termsBtn.style.cursor = "pointer";
      termsBtn.addEventListener("touchstart", () => termsBtn.classList.add("touching"));
      termsBtn.addEventListener("touchend", () => termsBtn.classList.remove("touching"));
    }
  }

  // 🌐 CARGAR TRADUCCIONES
  fetch("translations.json")
    .then((response) => response.json())
    .then((translations) => {
      allTranslations = translations;
      updateLanguage(currentLang);

      const langFlag = document.getElementById("languageFlag");
      if (langFlag) {
        langFlag.addEventListener("click", function () {
          const current = this.getAttribute("data-lang");
          const newLang = current === "es" ? "us" : "es";
          const flagPath = `assets/flags/${newLang}.svg`;
          this.setAttribute("data-lang", newLang);
          this.setAttribute("src", flagPath);
          localStorage.setItem("language", newLang);
          updateLanguage(newLang);
        });
      }
    });

  // 🌐 TRADUCCIÓN POR data-key Y ELEMENTOS ESPECIALES
  window.updateLanguage = function (lang) {
    currentLang = lang;
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (allTranslations[lang] && allTranslations[lang][key]) {
        el.textContent = allTranslations[lang][key];
      }
    });

    const specialElements = {
      description: "Servicios Profesionales de Investigación Digital y Seguridad Informática",
      "telegram-link": "Contáctanos en Telegram",
    };

    for (const [id, key] of Object.entries(specialElements)) {
      const el = document.getElementById(id);
      if (el && allTranslations[lang] && allTranslations[lang][key]) {
        el.textContent = allTranslations[lang][key];
      }
    }
  };

  // 🌐 FUNCIÓN DE ALERTA MULTIIDIOMA PARA BOTÓN "Más información"
  window.showPlanAlert = function (key) {
    const lang = localStorage.getItem("language") || "es";
    const message = allTranslations[lang]?.[key];
    if (message) alert(message);
  };

  // 🌐 BÚSQUEDA DINÁMICA EN FAQ
  const faqInput = document.getElementById("faqSearch");
  if (faqInput) {
    faqInput.addEventListener("input", triggerSearch);
  }
});

// Datos de la FAQ (puedes ampliar estos objetos según necesites)
const faqData = [{"id": "q-2964564747354922108", "q": "¿Qué es OSINT?", "a": "OSINT significa Open Source Intelligence Es la recolección de información desde fuentes públicas <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> <a href='#q-2007645668303520150' style='color:#00ffff; text-decoration:underline;'>análisis</a> e <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>investigación</a>"}, {"id": "q-2231274629891274545", "q": "¿Qué es hacking ético?", "a": "Es el uso legal de <a href='#q-8456947827633632272' style='color:#00ffff; text-decoration:underline;'>técnicas</a> de <a href='#q-7591942893917500313' style='color:#00ffff; text-decoration:underline;'>hacking</a> <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> evaluar la seguridad de sistemas y protegerlos"}, {"id": "q-4485753957604846189", "q": "¿Cómo proteger mi celular de hackers?", "a": "Actualiza tu sistema usa contraseñas seguras activa el bloqueo de pantalla y evita <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes</a> WiFi públicas no confiables"}, {"id": "q-8279225694700856870", "q": "¿Qué es una fuga de datos?", "a": "Es la exposición no autorizada de información sensible desde una organización o dispositivo"}, {"id": "q-8590280346887068144", "q": "¿Qué es malware?", "a": "<a href='#q-8015514078441376813' style='color:#00ffff; text-decoration:underline;'>Malware</a> es un software malicioso diseñado <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> dañar <a href='#q-8589517360036044919' style='color:#00ffff; text-decoration:underline;'>acceder</a> o interferir con un sistema o red"}, {"id": "q-8456947827633632272", "q": "¿Qué técnicas usan los ciberdelincuentes?", "a": "<a href='#q-862499652136409979' style='color:#00ffff; text-decoration:underline;'>Phishing</a> <a href='#q-8233434738304298282' style='color:#00ffff; text-decoration:underline;'>ingeniería</a> <a href='#q-8233434738304298282' style='color:#00ffff; text-decoration:underline;'>social</a> <a href='#q-8590280346887068144' style='color:#00ffff; text-decoration:underline;'>malware</a> <a href='#q-1292205693234162050' style='color:#00ffff; text-decoration:underline;'>ransomware</a> keyloggers entre otras"}, {"id": "q-8391852985864097648", "q": "¿Qué hacer si creo que me hackearon?", "a": "Desconecta tu equipo de internet cambia tus contraseñas desde un dispositivo <a href='#q-8589517360036044919' style='color:#00ffff; text-decoration:underline;'>seguro</a> y consulta a expertos en seguridad <a href='#q-2007645668303520150' style='color:#00ffff; text-decoration:underline;'>digital</a>"}, {"id": "q-2007645668303520150", "q": "¿Qué es un análisis forense digital?", "a": "Es el proceso de investigar dispositivos electrónicos <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> recuperar evidencia útil en casos legales o cibernéticos"}, {"id": "q-2129997189731606473", "q": "¿Cómo saber si alguien me espía el teléfono?", "a": "Batería agotándose rápido apps extrañas comportamientos inusuales y sobrecalentamiento son señales comunes"}, {"id": "q-4059332456480750476", "q": "¿Qué herramientas se usan para investigación digital?", "a": "Maltego Wireshark Shodan Recon ng Metasploit entre muchas otras"}, {"id": "q-8414906317756437252", "q": "¿Qué es rastreo digital?", "a": "Es el proceso de seguir y recolectar información sobre una persona o entidad usando <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>herramientas</a> tecnológicas y <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> disponibles en línea"}, {"id": "q-9193731845820806461", "q": "¿Cómo rastrean los ciberdetectives?", "a": "Utilizan <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes</a> <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>sociales</a> geolocalización <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>metadatos</a> búsquedas <a href='#q-2964564747354922108' style='color:#00ffff; text-decoration:underline;'>OSINT</a> y software especializado"}, {"id": "q-4614958949692010654", "q": "¿Cuáles son los tipos de virus informáticos?", "a": "Troyanos gusanos <a href='#q-1292205693234162050' style='color:#00ffff; text-decoration:underline;'>ransomware</a> spyware adware keyloggers rootkits bootkits entre otros"}, {"id": "q-1440163174099525368", "q": "¿Qué es un troyano?", "a": "Es un programa que se oculta dentro de software legítimo <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> permitir acceso remoto a un atacante"}, {"id": "q-1292205693234162050", "q": "¿Qué es ransomware?", "a": "Es un software malicioso que cifra tus <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>archivos</a> y pide un rescate económico <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> recuperarlos"}, {"id": "q-8015514078441376813", "q": "¿Cómo evitar un ataque de malware?", "a": "Usar antivirus actualizado no abrir enlaces sospechosos no descargar <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>archivos</a> de fuentes no confiables"}, {"id": "q-7591942893917500313", "q": "¿Cuáles son los tipos de hacking?", "a": "<a href='#q-2231274629891274545' style='color:#00ffff; text-decoration:underline;'>Hacking</a> <a href='#q-2231274629891274545' style='color:#00ffff; text-decoration:underline;'>ético</a> <a href='#q-2231274629891274545' style='color:#00ffff; text-decoration:underline;'>hacking</a> de <a href='#q-7873225618381999899' style='color:#00ffff; text-decoration:underline;'>sombrero</a> <a href='#q-7873225618381999899' style='color:#00ffff; text-decoration:underline;'>negro</a> <a href='#q-7873225618381999899' style='color:#00ffff; text-decoration:underline;'>sombrero</a> gris <a href='#q-7873225618381999899' style='color:#00ffff; text-decoration:underline;'>sombrero</a> <a href='#q-513369496863214638' style='color:#00ffff; text-decoration:underline;'>blanco</a> y hacktivismo"}, {"id": "q-7873225618381999899", "q": "¿Qué es un hacker de sombrero negro?", "a": "Es un <a href='#q-513369496863214638' style='color:#00ffff; text-decoration:underline;'>hacker</a> malicioso que viola la seguridad con fines ilegales o destructivos"}, {"id": "q-513369496863214638", "q": "¿Qué es un hacker de sombrero blanco?", "a": "Es un profesional que evalúa y mejora la seguridad de sistemas con permiso del dueño"}, {"id": "q-7550125872899746830", "q": "¿Cómo prevenir un ataque de hackers?", "a": "Tener firewalls activos sistemas actualizados autenticación en dos pasos y vigilancia constante"}, {"id": "q-4765719186679080094", "q": "¿Qué es la deep web?", "a": "Es la parte de internet que no está indexada por los buscadores tradicionales Incluye bases de <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> correos privados <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes</a> cerradas"}, {"id": "q-5044141537245971769", "q": "¿Qué es la dark web?", "a": "Una porción de la <a href='#q-4765719186679080094' style='color:#00ffff; text-decoration:underline;'>deep</a> web accesible solo por software especializado como Tor que se asocia con anonimato y actividades no reguladas"}, {"id": "q-8589517360036044919", "q": "¿Es seguro acceder a la deep web?", "a": "No es recomendable sin conocimientos técnicos Si se hace debe usarse Tor VPNs y precaución extrema Nunca compartir <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> reales"}, {"id": "q-4635235634519972226", "q": "¿Qué es el navegador Tor?", "a": "Es un <a href='#q-7859546897014456448' style='color:#00ffff; text-decoration:underline;'>navegador</a> diseñado <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> <a href='#q-4485753957604846189' style='color:#00ffff; text-decoration:underline;'>proteger</a> el anonimato del usuario y <a href='#q-8589517360036044919' style='color:#00ffff; text-decoration:underline;'>acceder</a> a la red Tor de forma cifrada"}, {"id": "q-8533622816161003878", "q": "¿Qué es fingerprinting?", "a": "Es la recolección de características <a href='#q-8456947827633632272' style='color:#00ffff; text-decoration:underline;'>técnicas</a> únicas de un dispositivo <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> rastrear su actividad"}, {"id": "q-8233434738304298282", "q": "¿Qué es ingeniería social?", "a": "Manipulación psicológica <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> obtener acceso o información sensible común en ataques <a href='#q-862499652136409979' style='color:#00ffff; text-decoration:underline;'>phishing</a> y suplantación"}, {"id": "q-1201364095824022115", "q": "¿Cómo proteger mis redes sociales?", "a": "Activar autenticación en dos pasos revisar permisos de apps <a href='#q-8015514078441376813' style='color:#00ffff; text-decoration:underline;'>evitar</a> enlaces sospechosos y cambiar contraseñas regularmente"}, {"id": "q-3511935188217013369", "q": "¿Qué es un exploit?", "a": "Es una vulnerabilidad que puede ser utilizada por atacantes <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> tomar control o dañar un sistema"}, {"id": "q-7824139206636122653", "q": "¿Qué es spoofing?", "a": "Es una técnica de suplantación donde un atacante se hace pasar por una fuente confiable"}, {"id": "q-5310660183629573592", "q": "¿Cómo proteger tus cuentas contra el SIM swapping?", "a": "El SIM swapping es un <a href='#q-8015514078441376813' style='color:#00ffff; text-decoration:underline;'>ataque</a> donde el <a href='#q-7873225618381999899' style='color:#00ffff; text-decoration:underline;'>hacker</a> toma control de tu número telefónico <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>Para</a> protegerte evita compartir tu número usa PIN en tu SIM y activa la verificación en dos pasos sin SMS"}, {"id": "q-2998082696920381238", "q": "¿Qué es un honeypot en ciberseguridad?", "a": "Es un sistema trampa que simula ser un objetivo vulnerable <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> atraer a atacantes y estudiar su comportamiento"}, {"id": "q-516076136974994945", "q": "¿Qué es un ataque de fuerza bruta?", "a": "Es un método <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> descubrir contraseñas o claves probando todas las combinaciones posibles hasta encontrar la correcta"}, {"id": "q-2437107973888132945", "q": "¿Cómo identificar un perfil falso en redes sociales?", "a": "Observa la fecha de creación falta de actividad uso de imágenes robadas seguidores sospechosos y comportamiento incoherente"}, {"id": "q-3444056128172425089", "q": "¿Qué es un ataque de intermediario (MITM)?", "a": "Es cuando un atacante intercepta la comunicación entre dos partes sin que estas lo sepan <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> robar o modificar <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a>"}, {"id": "q-5502350227542754391", "q": "¿Cómo funciona el rastreo por dirección MAC?", "a": "Cada dispositivo tiene una dirección MAC única Con <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>herramientas</a> adecuadas puede rastrearse su presencia en una red"}, {"id": "q-5492763758575250060", "q": "¿Qué es geofencing en rastreo digital?", "a": "Es una tecnología que crea un perímetro virtual Cuando un dispositivo entra o sale de esa zona se genera una alerta"}, {"id": "q-4765788978686433739", "q": "¿Qué es un keylogger?", "a": "Es un programa o dispositivo que registra las teclas que se pulsan en un teclado <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> robar contraseñas o información"}, {"id": "q-6938921834642957637", "q": "¿Qué tipo de huellas digitales dejas al navegar?", "a": "Tu IP sistema operativo <a href='#q-4635235634519972226' style='color:#00ffff; text-decoration:underline;'>navegador</a> resolución de pantalla cookies y patrones de comportamiento son rastreables"}, {"id": "q-862499652136409979", "q": "¿Cómo identificar un ataque por phishing visual?", "a": "Observa URL falsas errores ortográficos logos pixelados o páginas que se parecen demasiado a las originales"}, {"id": "q-6344581941272206635", "q": "¿Qué es una botnet?", "a": "Es una red de dispositivos infectados controlados remotamente por un atacante <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> lanzar ataques masivos o extraer <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a>"}, {"id": "q-5749617219092171667", "q": "¿Qué es un ataque zero-day?", "a": "Es un <a href='#q-8015514078441376813' style='color:#00ffff; text-decoration:underline;'>ataque</a> que explota una vulnerabilidad desconocida por el fabricante del software Son difíciles de detectar y muy peligrosos"}, {"id": "q-3128814109906663663", "q": "¿Cómo se analizan metadatos en archivos?", "a": "<a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>Herramientas</a> como ExifTool permiten extraer información oculta como ubicación dispositivo autor fecha etc"}, {"id": "q-4454302896786796420", "q": "¿Qué es el doxing y cómo evitarlo?", "a": "El doxing es la exposición de <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> personales en línea con fines maliciosos No compartas información sensible ni en <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes</a> <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>sociales</a>"}, {"id": "q-9203429902435384803", "q": "¿Cómo proteger tus fotos de ser rastreadas?", "a": "Desactiva la geolocalización de tu cámara elimina <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>metadatos</a> antes de compartir y evita subirlas a plataformas públicas sin revisión"}, {"id": "q-7859546897014456448", "q": "¿Qué es fingerprinting del navegador?", "a": "Es una técnica que identifica tu dispositivo por detalles únicos del <a href='#q-4635235634519972226' style='color:#00ffff; text-decoration:underline;'>navegador</a> Usa extensiones como NoScript o Tor <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> reducirlo"}, {"id": "q-55309545210496065", "q": "¿Qué son las dark patterns y cómo detectarlas?", "a": "Son trucos de diseño web <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> manipular al usuario Botones engañosos textos confusos o suscripciones ocultas son ejemplos comunes"}, {"id": "q-2002362658445808971", "q": "¿Qué es un ataque de ingeniería inversa?", "a": "Es el proceso de analizar un software o sistema <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> descubrir <a href='#q-4485753957604846189' style='color:#00ffff; text-decoration:underline;'>cómo</a> <a href='#q-5502350227542754391' style='color:#00ffff; text-decoration:underline;'>funciona</a> o encontrar vulnerabilidades"}, {"id": "q-7918638888860719491", "q": "¿Cómo evitar caer en fraudes sentimentales digitales?", "a": "Desconfía de relaciones apresuradas evita enviar dinero investiga las imágenes con búsqueda <a href='#q-2002362658445808971' style='color:#00ffff; text-decoration:underline;'>inversa</a> y busca patrones sospechosos"}, {"id": "q-3000239502520699213", "q": "¿Qué herramientas ayudan a investigadores digitales?", "a": "Shodan Maltego Spiderfoot ExifTool FOCA WHOIS y OSINTgram son algunas de las más utilizadas en el entorno profesional"}];

function triggerSearch() {
  const input = document.getElementById("faqSearch").value.toLowerCase().trim();
  const resultsContainer = document.getElementById("faqResults");
  resultsContainer.innerHTML = "";

  if (input === "") return;

  const terms = input.split(/\s+/);
  let matches = faqData.filter(item =>
    terms.some(term => item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term))
  );

  if (matches.length === 0) {
    const similar = faqData.find(item =>
      item.q.toLowerCase().split(/\s+/).some(word => terms.some(term => word.includes(term)))
    );
    if (similar) {
      resultsContainer.innerHTML = `<p style='color:#aaa;'>No se encontraron coincidencias exactas.<br>¿Quizás quisiste decir: <strong>${similar.q}</strong>?</p>`;
    } else {
      resultsContainer.innerHTML = "<p style='color:#aaa;'>No se encontraron resultados.</p>";
    }
    return;
  }

  matches.forEach(item => {
  const card = document.createElement("div");
  card.className = "faq-result-card result-item-animated";
  card.innerHTML = `
    <div class="faq-question">${item.q}</div>
    <div class="faq-answer">${item.a}</div>
  `;
  resultsContainer.appendChild(card);
});

// Asigna el comportamiento al hacer clic en la pregunta
document.querySelectorAll('.faq-result-card .faq-question').forEach(question => {
  question.addEventListener('click', function () {
    this.classList.toggle('open');                   // Para rotar el triángulo
    const answer = this.nextElementSibling;
    answer.classList.toggle('open');                  // Para expandir/ocultar la respuesta
    answer.classList.toggle('typing-effect');         // Para activar la animación de escritura
  });
});

}

function toggleLegalMenu() {
  const menu = document.getElementById("termsMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Opcional: cerrar si haces clic fuera
document.addEventListener("click", function (e) {
  const btn = document.querySelector(".terms-btn");
  const menu = document.getElementById("termsMenu");

  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
  }
});

// Control del submenú de Términos y Condiciones
  const termsButton = document.querySelector('.terms-btn');
  const termsMenu = document.getElementById('termsMenu');

  if (termsButton && termsMenu) {
    termsButton.addEventListener('click', function (e) {
      e.stopPropagation(); // evita cierre inmediato si clicas el botón
      termsMenu.style.display = termsMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (e) {
      if (!termsMenu.contains(e.target)) {
        termsMenu.style.display = 'none';
      }
    });
  }
function flipCard(button) {
  const card = button.closest(".plan-card");
  if (card) {
    card.classList.toggle("flipped");
  }
}

const starsCanvas = document.getElementById("stars");
if (starsCanvas) {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  const ctx = starsCanvas.getContext("2d");
  const stars = [];

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }

  function animateStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.speed;
      if (star.y > starsCanvas.height) star.y = 0;
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();

  window.addEventListener("resize", () => {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  });
}