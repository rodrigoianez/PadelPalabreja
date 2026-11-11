// Service worker de la Peña: permite instalar la web como app y abrirla sin conexión.
// - Archivos propios (index.html, iconos…): primero la red, y si no hay, lo guardado.
//   Así siempre se ve la última versión cuando hay internet.
// - Fuentes de Google y librerías de Firebase: lo guardado primero (no cambian).
// - Firestore (los datos) no se toca: Firebase lo gestiona por su cuenta.
// Al cambiar archivos no hace falta tocar nada; sube CACHE solo si quieres limpiar lo guardado.
const CACHE = "pena-v1";
const CORE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/favicon-64.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const isStatic = url =>
  url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" ||
  (url.hostname === "www.gstatic.com" && url.pathname.startsWith("/firebasejs/"));

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true })
        .then(hit => hit || (req.mode === "navigate" ? caches.match("index.html") : Response.error())))
    );
    return;
  }

  if (isStatic(url)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
