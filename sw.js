/* Verbo Match offline cache.
   Bump VERSION every time you upload a new index.html or es.html (v16, v17, ...). */
const VERSION = "verbo-match-v15";
const FILES = ["./", "./index.html", "./es.html", "./manifest.json",
  "./icon-180.png", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", e => {
  /* cache what exists; a missing icon must never break the install */
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => null)))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});

/* Offline-first: answer instantly from the saved copy,
   then quietly refresh it in the background when there is signal. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  const isPage = e.request.mode === "navigate";
  const page = url.pathname.split("/").pop();
  const key = isPage ? "./" + (page && page.endsWith(".html") ? page : "index.html") : e.request;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(key, { ignoreSearch: true });
    const refresh = fetchWithTimeout(e.request, 8000)
      .then(r => { if (r && r.ok) cache.put(key, r.clone()); return r; })
      .catch(() => null);
    if (cached) { e.waitUntil(refresh); return cached; }
    const fresh = await refresh;
    return fresh || new Response("Offline. Open the app once with internet to save it.", {
      status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }));
});

function fetchWithTimeout(req, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    fetch(req, { cache: "no-store" }).then(r => { clearTimeout(t); resolve(r); }, err => { clearTimeout(t); reject(err); });
  });
}
