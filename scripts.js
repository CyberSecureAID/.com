let allTranslations = {};
let currentLang = localStorage.getItem("language") || "es";

// 📦 CONFIG: Modos de búsqueda visuales
const searchModes = {
  cyberpedia: {
    icon: "🕵️‍♂️",
    placeholder: "Ej: phishing, OSINT, término…",
    spinner: "🕵️‍♂️ Buscando…"
  },
  wiki: {
    icon: "🧠",
    placeholder: "Ej: autor, incidente digital, perfil…",
    spinner: "🧠 Consultando IA…"
  },
  telf: {
    icon: "📞",
    placeholder: "Ej: nombre, número, dirección…",
    spinner: "📞 Buscando en directorio…"
  }
};

// 🧠 FUNCIÓN: Actualiza ícono, placeholder y texto de carga
function updateSearchUI(mode) {
  const config = searchModes[mode] || searchModes["cyberpedia"];
  document.getElementById("searchIcon").textContent = config.icon;
  document.getElementById("faqSearch").placeholder = config.placeholder;
  document.getElementById("loadingSpinner").textContent = config.spinner;
}

// 1) Datos de la FAQ
const faqData = [
  {
    "id": "q-2964564747354922108",
    "q": "¿Qué es OSINT?",
    "a": "OSINT significa Open Source Intelligence. Es la recolección de información desde fuentes públicas <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> <a href='#q-2007645668303520150' style='color:#00ffff; text-decoration:underline;'>análisis</a> e <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>investigación</a>."
  },
  {
    "id": "q-2231274629891274545",
    "q": "¿Qué es hacking ético?",
    "a": "Es el uso legal de <a href='#q-8456947827633632272' style='color:#00ffff; text-decoration:underline;'>técnicas</a> de <a href='#q-7591942893917500313' style='color:#00ffff; text-decoration:underline;'>hacking</a> <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> evaluar la seguridad de sistemas y protegerlos."
  },
  {
    "id": "q-4485753957604846189",
    "q": "¿Cómo proteger mi celular de hackers?",
    "a": "Actualiza tu sistema, usa contraseñas seguras, activa el bloqueo de pantalla y evita <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes WiFi públicas</a> no confiables."
  },
  {
    "id": "q-8279225694700856870",
    "q": "¿Qué es una fuga de datos?",
    "a": "Es la exposición no autorizada de información sensible desde una organización o dispositivo."
  },
  {
    "id": "q-8590280346887068144",
    "q": "¿Qué es malware?",
    "a": "Es un software malicioso diseñado <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> dañar, <a href='#q-8589517360036044919' style='color:#00ffff; text-decoration:underline;'>acceder</a> o interferir con un sistema o red. Incluye <a href='#q-8015514078441376813' style='color:#00ffff; text-decoration:underline;'>virus, troyanos, ransomware</a> y más."
  },
  {
    "id": "q-8456947827633632272",
    "q": "¿Qué técnicas usan los ciberdelincuentes?",
    "a": "<a href='#q-862499652136409979' style='color:#00ffff; text-decoration:underline;'>Phishing</a>, <a href='#q-8233434738304298282' style='color:#00ffff; text-decoration:underline;'>ingeniería social</a>, <a href='#q-8590280346887068144' style='color:#00ffff; text-decoration:underline;'>malware</a>, <a href='#q-1292205693234162050' style='color:#00ffff; text-decoration:underline;'>ransomware</a>, keyloggers y ataques <a href='#q-5749617219092171667' style='color:#00ffff; text-decoration:underline;'>zero-day</a>."
  },
  {
    "id": "q-8391852985864097648",
    "q": "¿Qué hacer si creo que me hackearon?",
    "a": "Desconecta tu equipo de internet, cambia tus contraseñas desde un dispositivo <a href='#q-8589517360036044919' style='color:#00ffff; text-decoration:underline;'>seguro</a> y consulta a expertos en <a href='#q-2007645668303520150' style='color:#00ffff; text-decoration:underline;'>forensia digital</a>."
  },
  {
    "id": "q-2007645668303520150",
    "q": "¿Qué es un análisis forense digital?",
    "a": "Es el proceso de investigar dispositivos electrónicos <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> recuperar evidencia útil en casos legales o cibernéticos."
  },
  {
    "id": "q-2129997189731606473",
    "q": "¿Cómo saber si alguien me espía el teléfono?",
    "a": "Batería agotándose rápido, apps extrañas, comportamientos inusuales y sobrecalentamiento son señales comunes."
  },
  {
    "id": "q-4059332456480750476",
    "q": "¿Qué herramientas se usan para investigación digital?",
    "a": "Maltego, Wireshark, Shodan, Recon-ng, Metasploit, <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>ExifTool</a> y herramientas <a href='#q-2964564747354922108' style='color:#00ffff; text-decoration:underline;'>OSINT</a>."
  },
  {
    "id": "q-8414906317756437252",
    "q": "¿Qué es rastreo digital?",
    "a": "Es el proceso de seguir y recolectar información sobre una persona o entidad usando <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>herramientas</a> tecnológicas y <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> disponibles en línea."
  },
  {
    "id": "q-9193731845820806461",
    "q": "¿Cómo rastrean los ciberdetectives?",
    "a": "Usan <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes sociales</a>, geolocalización, <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>metadatos</a>, búsquedas <a href='#q-2964564747354922108' style='color:#00ffff; text-decoration:underline;'>OSINT</a> y software especializado."
  },
  {
    "id": "q-4614958949692010654",
    "q": "¿Cuáles son los tipos de virus informáticos?",
    "a": "Troyanos, gusanos, <a href='#q-1292205693234162050' style='color:#00ffff; text-decoration:underline;'>ransomware</a>, spyware, adware, keyloggers, rootkits y bootkits."
  },
  {
    "id": "q-1440163174099525368",
    "q": "¿Qué es un troyano?",
    "a": "Es un programa que se oculta dentro de software legítimo <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> permitir acceso remoto a un atacante."
  },
  {
    "id": "q-1292205693234162050",
    "q": "¿Qué es ransomware?",
    "a": "Es un software malicioso que cifra tus <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>archivos</a> y pide un rescate económico <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> recuperarlos."
  },
  {
    "id": "q-8015514078441376813",
    "q": "¿Cómo evitar un ataque de malware?",
    "a": "Usa antivirus actualizado, no abras enlaces sospechosos y evita descargar <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>archivos</a> de fuentes no confiables."
  },
  {
    "id": "q-7591942893917500313",
    "q": "¿Cuáles son los tipos de hacking?",
    "a": "<a href='#q-2231274629891274545' style='color:#00ffff; text-decoration:underline;'>Hacking ético</a>, <a href='#q-7873225618381999899' style='color:#00ffff; text-decoration:underline;'>sombrero negro</a>, sombrero gris, <a href='#q-513369496863214638' style='color:#00ffff; text-decoration:underline;'>sombrero blanco</a> y hacktivismo."
  },
  {
    "id": "q-7873225618381999899",
    "q": "¿Qué es un hacker de sombrero negro?",
    "a": "Es un <a href='#q-513369496863214638' style='color:#00ffff; text-decoration:underline;'>hacker</a> malicioso que viola la seguridad con fines ilegales o destructivos."
  },
  {
    "id": "q-513369496863214638",
    "q": "¿Qué es un hacker de sombrero blanco?",
    "a": "Es un profesional que evalúa y mejora la seguridad de sistemas con permiso del dueño."
  },
  {
    "id": "q-7550125872899746830",
    "q": "¿Cómo prevenir un ataque de hackers?",
    "a": "Usa firewalls, actualiza tus sistemas, activa autenticación en dos pasos y monitorea actividades sospechosas."
  },
  {
    "id": "q-4765719186679080094",
    "q": "¿Qué es la deep web?",
    "a": "Es la parte de internet no indexada por buscadores tradicionales. Incluye bases de <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a>, correos privados y <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes</a> cerradas."
  },
  {
    "id": "q-5044141537245971769",
    "q": "¿Qué es la dark web?",
    "a": "Una parte de la <a href='#q-4765719186679080094' style='color:#00ffff; text-decoration:underline;'>deep web</a> accesible solo con software como Tor, asociada con anonimato y actividades no reguladas."
  },
  {
    "id": "q-8589517360036044919",
    "q": "¿Es seguro acceder a la deep web?",
    "a": "No es recomendable sin conocimientos técnicos. Si lo haces, usa Tor, VPNs y nunca compartas <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> reales."
  },
  {
    "id": "q-4635235634519972226",
    "q": "¿Qué es el navegador Tor?",
    "a": "Es un <a href='#q-7859546897014456448' style='color:#00ffff; text-decoration:underline;'>navegador</a> diseñado <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> proteger el anonimato y acceder a la red Tor de forma cifrada."
  },
  {
    "id": "q-8233434738304298282",
    "q": "¿Qué es ingeniería social?",
    "a": "Manipulación psicológica <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> obtener acceso o información sensible, común en <a href='#q-862499652136409979' style='color:#00ffff; text-decoration:underline;'>phishing</a>."
  },
  {
    "id": "q-1201364095824022115",
    "q": "¿Cómo proteger mis redes sociales?",
    "a": "Activa autenticación en dos pasos, revisa permisos de apps y evita enlaces sospechosos."
  },
  {
    "id": "q-3511935188217013369",
    "q": "¿Qué es un exploit?",
    "a": "Es una vulnerabilidad que puede ser usada por atacantes <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> tomar control de un sistema."
  },
  {
    "id": "q-7824139206636122653",
    "q": "¿Qué es spoofing?",
    "a": "Es una técnica de suplantación donde un atacante se hace pasar por una fuente confiable."
  },
  {
    "id": "q-5310660183629573592",
    "q": "¿Cómo proteger tus cuentas contra el SIM swapping?",
    "a": "Evita compartir tu número, usa PIN en tu SIM y activa verificación en dos pasos sin SMS."
  },
  {
    "id": "q-2998082696920381238",
    "q": "¿Qué es un honeypot en ciberseguridad?",
    "a": "Es un sistema trampa que simula ser vulnerable <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> atraer y estudiar atacantes."
  },
  {
    "id": "q-516076136974994945",
    "q": "¿Qué es un ataque de fuerza bruta?",
    "a": "Es un método <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> descubrir contraseñas probando combinaciones posibles."
  },
  {
    "id": "q-2437107973888132945",
    "q": "¿Cómo identificar un perfil falso en redes sociales?",
    "a": "Observa fecha de creación, falta de actividad, imágenes robadas y comportamientos incoherentes."
  },
  {
    "id": "q-3444056128172425089",
    "q": "¿Qué es un ataque de intermediario (MITM)?",
    "a": "Cuando un atacante intercepta la comunicación entre dos partes <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> robar o modificar <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a>."
  },
  {
    "id": "q-5502350227542754391",
    "q": "¿Cómo funciona el rastreo por dirección MAC?",
    "a": "Cada dispositivo tiene una dirección MAC única. Con <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>herramientas</a> adecuadas puede rastrearse en una red."
  },
  {
    "id": "q-5492763758575250060",
    "q": "¿Qué es geofencing en rastreo digital?",
    "a": "Tecnología que crea un perímetro virtual y alerta cuando un dispositivo entra/sale de esa zona."
  },
  {
    "id": "q-4765788978686433739",
    "q": "¿Qué es un keylogger?",
    "a": "Programa o dispositivo que registra las teclas pulsadas <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> robar contraseñas o información."
  },
  {
    "id": "q-6938921834642957637",
    "q": "¿Qué tipo de huellas digitales dejas al navegar?",
    "a": "Tu IP, sistema operativo, <a href='#q-4635235634519972226' style='color:#00ffff; text-decoration:underline;'>navegador</a>, resolución de pantalla y cookies."
  },
  {
    "id": "q-862499652136409979",
    "q": "¿Cómo identificar un ataque por phishing visual?",
    "a": "Observa URLs falsas, errores ortográficos y logos pixelados."
  },
  {
    "id": "q-6344581941272206635",
    "q": "¿Qué es una botnet?",
    "a": "Red de dispositivos infectados controlados remotamente <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> lanzar ataques masivos."
  },
  {
    "id": "q-5749617219092171667",
    "q": "¿Qué es un ataque zero-day?",
    "a": "Explota una vulnerabilidad desconocida por el fabricante. Son muy peligrosos y difíciles de detectar."
  },
  {
    "id": "q-3128814109906663663",
    "q": "¿Cómo se analizan metadatos en archivos?",
    "a": "Con <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>herramientas</a> como ExifTool para extraer ubicación, dispositivo, autor, etc."
  },
  {
    "id": "q-4454302896786796420",
    "q": "¿Qué es el doxing y cómo evitarlo?",
    "a": "Exposición maliciosa de <a href='#q-8279225694700856870' style='color:#00ffff; text-decoration:underline;'>datos</a> personales. No compartas información sensible en <a href='#q-1201364095824022115' style='color:#00ffff; text-decoration:underline;'>redes</a>."
  },
  {
    "id": "q-9203429902435384803",
    "q": "¿Cómo proteger tus fotos de ser rastreadas?",
    "a": "Desactiva geolocalización, elimina <a href='#q-3128814109906663663' style='color:#00ffff; text-decoration:underline;'>metadatos</a> y evita subirlas a plataformas públicas."
  },
  {
    "id": "q-55309545210496065",
    "q": "¿Qué son las dark patterns y cómo detectarlas?",
    "a": "Trucos de diseño web <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> manipular usuarios (ej: botones engañosos, suscripciones ocultas)."
  },
  {
    "id": "q-2002362658445808971",
    "q": "¿Qué es un ataque de ingeniería inversa?",
    "a": "Analizar software/sistemas <a href='#q-4059332456480750476' style='color:#00ffff; text-decoration:underline;'>para</a> descubrir <a href='#q-4485753957604846189' style='color:#00ffff; text-decoration:underline;'>cómo</a> funcionan o encontrar vulnerabilidades."
  },
  {
    "id": "q-7918638888860719491",
    "q": "¿Cómo evitar fraudes sentimentales digitales?",
    "a": "Desconfía de relaciones apresuradas, no envíes dinero y verifica imágenes con búsqueda <a href='#q-2002362658445808971' style='color:#00ffff; text-decoration:underline;'>inversa</a>."
  },
  {
    "id": "q-3000239502520699213",
    "q": "¿Qué herramientas ayudan a investigadores digitales?",
    "a": "Shodan, Maltego, Spiderfoot, ExifTool, FOCA, WHOIS y OSINTgram."
  }
];

// 2) Datos demo de Directorio Etecsa
const etecData = [
  { nombre: "Trd Caribe Almacén", numero: "2342342424", direccion: "54 E/ 45 Y 47, San José de las Lajas, Mayabeque" },
  { nombre: "Trd Caribe El Balcón", numero: "234234234242", direccion: "Carr. Tapaste Km 23½, San José de las Lajas, Mayabeque" },
  // … más registros …
];

// 3) Buscar en Cyberpedia (FAQ)
function searchCyberpedia(query) {
  const results = document.getElementById("faqResults");
  results.innerHTML = "";
  if (!query) return;

  const terms = query.split(/\s+/);
  const matches = faqData.filter(({ q, a }) =>
    terms.some(term =>
      q.toLowerCase().includes(term) ||
      a.toLowerCase().includes(term)
    )
  );

  if (!matches.length) {
    const similar = faqData.find(({ q }) =>
      q.toLowerCase().split(/\s+/).some(word =>
        terms.some(term => word.includes(term))
      )
    );
    results.innerHTML = similar
      ? `<p class="faq-no-results">
           No coincidencias exactas.<br>
           ¿Quizás quisiste decir: <strong>${similar.q}</strong>?
         </p>`
      : `<p class="faq-no-results">No se encontraron resultados.</p>`;
    return;
  }

  matches.forEach(({ id, q, a }) => {
    const card = document.createElement("div");
    card.className = "faq-result-card result-item-animated";
    card.innerHTML = `
      <div class="faq-question" data-id="${id}" id="${id}">
        ${q}
      </div>
      <div class="faq-answer">
        ${a}
        <button class="copy-btn" data-answer="${a}" style="display: none;">
          📋 Copiar
        </button>
      </div>`;
    results.appendChild(card);
  });
}

// 4) Buscar en Directorio Telefónico
function searchEtecsa(query) {
  const results = document.getElementById("faqResults");
  results.innerHTML = "";
  if (!query) return;

  const matches = etecData.filter(({ nombre, direccion }) =>
    nombre.toLowerCase().includes(query) ||
    direccion.toLowerCase().includes(query)
  );

  if (!matches.length) {
    results.innerHTML = `<p class="faq-no-results">No se encontraron resultados en el directorio.</p>`;
    return;
  }

  const table = document.createElement("table");
  table.className = "telf-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Número</th>
        <th>Dirección</th>
        <th class="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${matches.map(m => `
        <tr>
          <td>👤 ${m.nombre}</td>
          <td>📞 ${m.numero || "—"}</td>
          <td>📍 ${m.direccion}</td>
          <td class="text-center">
            <button class="copy-btn" data-answer="👤 ${m.nombre}\n📞 ${m.numero || 'Sin número'}\n📍 ${m.direccion}">📋 Copiar</button>
          </td>
        </tr>
      `).join("")}
    </tbody>`;
  results.appendChild(table);
}

// 5) Función unificada de búsqueda
function triggerSearch() {
  const inputEl = document.getElementById("faqSearch");
  const query    = inputEl.value.trim().toLowerCase();
  const resultsContainer = document.getElementById("faqResults");
  const loader   = document.getElementById("loadingSpinner");
  const icon     = document.getElementById("searchIcon");
  const mode     = document.querySelector('input[name="searchMode"]:checked').value || "cyberpedia";

  if (!query) {
    resultsContainer.innerHTML = "";
    loader.style.display = "none";
    // ⏹ Restaura ícono si campo se borra
    updateSearchUI(mode);
    return;
  }

  loader.style.display = "block";
  icon.textContent = "⌛"; // ⌛ icono de carga

  setTimeout(() => {
    loader.style.display = "none";
    
    // 👇 Ejecutar búsqueda real
    if (mode === "cyberpedia") {
      searchCyberpedia(query);
    } else {
      searchEtecsa(query);
    }

    // 🔁 Restaurar ícono según modo
    updateSearchUI(mode);
  }, 400); // Ajusta la duración del "efecto de carga"
}

// 6) Actualizar idioma
function updateLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (allTranslations[lang]?.[key]) {
      el.textContent = allTranslations[lang][key];
    }
  });

  // textos especiales
  const special = {
    description: "Servicios Profesionales de Investigación Digital y Seguridad Informática",
    "telegram-link": "Contáctanos en Telegram"
  };
  Object.entries(special).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && allTranslations[lang]?.[key]) {
      el.textContent = allTranslations[lang][key];
    }
  });
}
window.updateLanguage = updateLanguage;

// 7) Utilidades
function showPlanAlert(key) {
  const msg = allTranslations[currentLang]?.[key];
  if (msg) alert(msg);
}
window.showPlanAlert = showPlanAlert;

function toggleLegalMenu() {
  const menu = document.getElementById("termsMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function flipCard(button) {
  const card = button.closest(".plan-card");
  if (card) card.classList.toggle("flipped");
}

// 8) Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Carga de traducciones
  fetch("translations.json")
    .then(r => r.json())
    .then(json => {
      allTranslations = json;
      updateLanguage(currentLang);
      const flag = document.getElementById("languageFlag");
      if (flag) {
        flag.addEventListener("click", () => {
          const next = flag.getAttribute("data-lang") === "es" ? "us" : "es";
          flag.setAttribute("data-lang", next);
          flag.setAttribute("src", `assets/flags/${next}.svg`);
          localStorage.setItem("language", next);
          updateLanguage(next);
        });
      }
    });

  // Selector de modo → cambia icono y placeholder
  const radios = document.querySelectorAll('input[name="searchMode"]');
  const icon = document.getElementById("searchIcon");
  const inputEl = document.getElementById("faqSearch");

  radios.forEach(r => {
    r.addEventListener("change", () => {
      const mode = r.value;
    updateSearchUI(mode);
  });
});

  // Disparar búsqueda al hacer click o presionar Enter
  const btn = document.getElementById("searchBtn");
  if (btn) btn.addEventListener("click", triggerSearch);
  if (inputEl) {
    inputEl.addEventListener("keypress", e => {
      if (e.key === "Enter") triggerSearch();
    });
  }

  // Buscar mientras escribes solo si está en modo cyberpedia
inputEl.addEventListener("input", () => {
  const mode = document.querySelector('input[name="searchMode"]:checked').value;
  if (mode === "cyberpedia" || mode === "telf") {
    triggerSearch();
  }
});

  // Delegación de clic en resultados (copiar + toggle con typing effect)
  const faqResults = document.getElementById("faqResults");
  if (faqResults) {
    faqResults.addEventListener("click", e => {
      // Copiar texto
      if (e.target.classList.contains("copy-btn")) {
        e.stopPropagation();
        const raw = e.target.dataset.answer;
        const tmp = document.createElement("div");
        tmp.innerHTML = raw;
        const text = tmp.textContent || tmp.innerText || "";
        navigator.clipboard.writeText(text).then(() => {
          e.target.textContent = "✔ Copiado";
          setTimeout(() => e.target.textContent = "📋 Copiar", 1500);
        });
        return;
      }

      // Toggle pregunta + efecto de escritura
      if (e.target.classList.contains("faq-question")) {
        const clickedQ = e.target;
        const clickedA = clickedQ.nextElementSibling;
        // cerrar otras
        faqResults.querySelectorAll(".faq-question.open").forEach(q => {
          if (q !== clickedQ) {
            q.classList.remove("open");
            const a = q.nextElementSibling;
            a.classList.remove("open", "typing-effect");
            const btn = a.querySelector(".copy-btn");
            if (btn) btn.style.display = "none";
          }
        });
        // abrir/cerrar actual
        clickedQ.classList.toggle("open");
        clickedA.classList.toggle("open");

        // typing effect: aplica o quita clase
        if (clickedA.classList.contains("open")) {
          clickedA.classList.add("typing-effect");
        } else {
          clickedA.classList.remove("typing-effect");
        }

        // mostrar u ocultar botón copiar
        const btnCopy = clickedA.querySelector(".copy-btn");
        if (btnCopy) {
          btnCopy.style.display = clickedA.classList.contains("open")
            ? "inline-block"
            : "none";
        }
      }
    });
  }

  // Botón flotante término
  const termsBtn = document.querySelector(".floating-terms");
  const termsBtnMain = document.querySelector(".terms-btn");
  const termsMenu = document.getElementById("termsMenu");

  if (termsBtn) {
    const onScroll = () => {
      const y = window.scrollY;
      const atBottom = window.innerHeight + y >= document.body.offsetHeight - 10;
      const visible = y > 200 && !atBottom;
      termsBtn.style.opacity = visible ? "1" : "0";
      termsBtn.style.visibility = visible ? "visible" : "hidden";
      if (termsMenu) termsMenu.classList.remove("visible");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  if (termsBtnMain && termsMenu) {
    termsBtnMain.addEventListener("click", e => {
      e.stopPropagation();
      termsMenu.classList.toggle("visible");
    });
    document.addEventListener("click", e => {
      if (!termsMenu.contains(e.target)) termsMenu.classList.remove("visible");
    });
  }

  // Scroll suave en hashchange
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("highlighted");
      setTimeout(() => el.classList.remove("highlighted"), 1500);
    }
  });

  // Animación de estrellas
  const stars = document.getElementById("stars");
  if (stars) {
    stars.width = innerWidth;
    stars.height = innerHeight;
    const ctx = stars.getContext("2d");
    const field = Array.from({ length: 100 }, () => ({
      x: Math.random() * stars.width,
      y: Math.random() * stars.height,
      r: Math.random() * 1.5,
      s: Math.random() * 0.5 + 0.2
    }));
    function draw() {
      ctx.clearRect(0, 0, stars.width, stars.height);
      ctx.fillStyle = "#fff";
      field.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.s;
        if (star.y > stars.height) star.y = 0;
      });
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", () => {
      stars.width = innerWidth;
      stars.height = innerHeight;
    });
  }

  // Toggle de características (planes, secciones, etc.)
  document.querySelectorAll('.toggle-features').forEach(btn => {
    btn.addEventListener('click', () => {
      const features = btn.previousElementSibling;
      features.classList.toggle('collapsed');
      btn.classList.toggle('open');
    });
  });
});
