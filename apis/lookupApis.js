

// 🌍 Wikipedia — Resumen institucional
export async function lookupWikipedia(term) {
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se encontraron resultados en la Cyberpedia IA");
  return await res.json();
}

// 🧠 SQLite Cloud — vía Worker institucional
const WORKER_SQLITE_URL = "https://spring-flower-8892.yuset-day.workers.dev";

/**
 * Realiza consulta institucional a SQLite vía método GET.
 * @param {string} query - término de búsqueda
 * @param {"fix" | "movil"} tipo - tabla objetivo
 * @returns {Promise<Object>} respuesta JSON del Worker
 */
export async function lookupInstitutionalSQLite(query, tipo = "movil") {
  const url = `${WORKER_SQLITE_URL}?q=${encodeURIComponent(query)}&tipo=${tipo}`;
  const res = await fetch(url, { method: "GET" });

  const json = await res.json().catch(() => {
    throw new Error("🛑 Worker devolvió respuesta malformada");
  });

  if (!res.ok || json?.error) {
    throw new Error(`❌ SQLite institucional rechazó: ${json?.mensaje || "sin detalles"}`);
  }

  return json;
}

/**
 * Consulta institucional a tabla `fix` o `movil` vía Worker institucional.
 * @param {string} term - término institucional
 * @param {"fix" | "movil"} mode - tabla destino
 * @returns {Promise<Object>} resultados limpios
 */
export async function lookupInstitutionalByMode(term, mode = "fix") {
  const respuesta = await lookupInstitutionalSQLite(term, mode);
  return {
    fuente: respuesta?.fuente || "SQLiteCloud",
    resultados: respuesta?.resultados || []
  };
}
