// ☁️ ETECSA — usando tu Worker personalizado
const ETECSA_URL = "https://et-search-proxy.exagtrader.com";

/**
 * Consulta la API de directorio ETECSA mediante tu Worker.
 * @param {string} term - término de búsqueda
 * @param {number} offset - desplazamiento para paginación (opcional)
 * @param {number} limit - límite de resultados por página (opcional)
 * @returns {Promise<Object>} respuesta JSON del proxy
 */
export async function lookupETECSA(term, offset = 0, limit = 10) {
  const url = `${ETECSA_URL}?q=${encodeURIComponent(term)}&offset=${offset}&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok || !res.headers.get("content-type")?.includes("json")) {
    throw new Error("🛑 Respuesta no válida desde el proxy ETECSA");
  }

  return await res.json();
}

// 📘 Wikipedia — consulta rápida resumida en español
export async function lookupWikipedia(term) {
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
  const res = await fetch(url);
  
  if (!res.ok) throw new Error("📘 Artículo no encontrado en Wikipedia");
  
  return await res.json();
}

// 📞 Numverify — verificación de número telefónico
export async function lookupNumverify(phone) {
  const access_key = "eeba90e55d1b5a3a443c2f0f6b884cb9"; // considera moverla a entorno seguro
  const url = `https://apilayer.net/api/validate?access_key=${access_key}&number=${encodeURIComponent(phone)}`;
  const res = await fetch(url);
  
  if (!res.ok) throw new Error("📞 Error en consulta a Numverify");
  
  return await res.json();
}

// 🛰️ NumlookupAPI — alternativa a Numverify
export async function lookupNumlookupAPI(phone) {
  const apiKey = "num_live_NQwdDnXjM2oeFLwmb5Q5WRw6c34mvTMa7oyPyv6p"; // reemplázala con tu clave real de https://numlookupapi.com
  const url = `https://api.numlookupapi.com/v1/validate/+${encodeURIComponent(phone)}`;
  const res = await fetch(url, {
    headers: {
      "apikey": apiKey
    }
  });

  if (!res.ok) throw new Error("🛰️ Error en consulta a NumlookupAPI");

  return await res.json();
}

// 🧪 Radar OSINT básico
export async function lookupAll(input) {
  const [etecsa, wiki, numverify] = await Promise.allSettled([
    lookupETECSA(input),
    lookupWikipedia(input),
    lookupNumverify(input)
  ]);

  return {
    etecsa: etecsa.status === "fulfilled" ? etecsa.value : null,
    wiki: wiki.status === "fulfilled" ? wiki.value : null,
    numverify: numverify.status === "fulfilled" ? numverify.value : null
  };
}

// 🧪 Radar OSINT extendido (incluye NumlookupAPI)
export async function lookupAllExtended(input) {
  const [etecsa, wiki, numverify, numlookup] = await Promise.allSettled([
    lookupETECSA(input),
    lookupWikipedia(input),
    lookupNumverify(input),
    lookupNumlookupAPI(input)
  ]);

  return {
    etecsa: etecsa.status === "fulfilled" ? etecsa.value : null,
    wiki: wiki.status === "fulfilled" ? wiki.value : null,
    numverify: numverify.status === "fulfilled" ? numverify.value : null,
    numlookup: numlookup.status === "fulfilled" ? numlookup.value : null
  };
}
