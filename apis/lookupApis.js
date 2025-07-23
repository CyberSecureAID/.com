// 🔍 Lookup APIs
// 🌍 Wikipedia
export async function lookupWikipedia(term) {
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Artículo no encontrado");
  return await res.json();
}

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
    throw new Error("🛑 Respuesta no válida desde el BaseDatos");
  }

  return await res.json();
}
