// 🔍 Lookup APIs para CyberSecureAID

// 🌍 Wikipedia — Resumen institucional
export async function lookupWikipedia(term) {
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("🛑 Artículo no encontrado en Wikipedia");
  return await res.json();
}

// ☁️ ETECSA — Usando tu Worker personalizado
const ETECSA_URL = "https://et-search-proxy.exagtrader.com";

/**
 * Consulta el proxy institucional de ETECSA.
 * @param {string} term - término de búsqueda
 * @param {number} offset - desplazamiento (default 0)
 * @param {number} limit - límite por página (default 10)
 * @returns {Promise<Object>} respuesta JSON desde el Worker
 */
export async function lookupETECSA(term, offset = 0, limit = 10) {
  const url = `${ETECSA_URL}?q=${encodeURIComponent(term)}&offset=${offset}&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok || !res.headers.get("content-type")?.includes("json")) {
    throw new Error("🛑 Respuesta no válida desde el proxy ETECSA");
  }

  return await res.json();
}

// 🔗 SQLite Cloud — Fuente institucional remota
const SQLITE_CLOUD_URL = "https://cpcy0nkwnz.g2.sqlite.cloud:8090/v2/functions";


/**
 * Consulta el directorio remoto en SQLite Cloud.
 * @param {string} term - término de búsqueda
 * @param {"fix" | "movil"} mode - tipo de consulta ("fix" por defecto)
 * @returns {Promise<Array>} resultados tabulares
 */
export async function lookupSQLiteCloud(term, mode = "fix") {
  const endpoint = mode === "movil" ? "buscar_movil" : "buscar_fix";
  const url = `${SQLITE_CLOUD_URL}/${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args: [term] })
  });

  if (!res.ok || !res.headers.get("content-type")?.includes("json")) {
    throw new Error(`🛑 Fallo al consultar SQLite Cloud: ${endpoint}`);
  }

  const datos = await res.json();

  console.log(`🟢 SQLite Cloud | Función: ${endpoint} | Termino: "${term}" | Resultados: ${datos.length}`);

  return datos;
}

// 🧠 Fallback inteligente — ETECSA + SQLite Cloud
/**
 * Realiza búsqueda priorizada: primero en ETECSA, luego en SQLite Cloud si no hay resultados.
 * @param {string} term - término de búsqueda
 * @param {"fix" | "movil"} mode - modo institucional
 * @returns {Promise<{ fuente: string, resultados: Array }>}
 */
export async function lookupUniversal(term, mode = "fix") {
  try {
    const etecsa = await lookupETECSA(term);
    const resultadosETECSA = etecsa?.results || [];

    if (resultadosETECSA.length > 0) {
      console.log(`🟢 Fuente: ETECSA | Termino: "${term}" | Resultados: ${resultadosETECSA.length}`);
      return { fuente: "ETECSA", resultados: resultadosETECSA };
    }

    // Fallback: SQLite Cloud
    const sqlite = await lookupSQLiteCloud(term, mode);
    console.log(`🟡 Fallback SQLite | Termino: "${term}" | Resultados: ${sqlite.length}`);
    return { fuente: "SQLite Cloud", resultados: sqlite };

  } catch (err) {
    console.error("🔴 Error en lookupUniversal:", err);
    return { fuente: "Ninguna", resultados: [] };
  }
}
