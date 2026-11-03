/* Verbo Match offline cache.
   Bump VERSION every time you upload a new index.html (v14, v15, ...). */
const VERSION = "verbo-match-v13";
const FILES = ["./", "./index.html", "./manifest.json",
  "./icon-180.png", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
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
  const key = isPage ? "./index.html" : e.request;
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
