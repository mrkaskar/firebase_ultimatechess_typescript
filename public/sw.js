/* eslint-disable no-restricted-globals */
const staticCacheName = "site-static-v12";

const assets = [
  // "stockfish.js",
  // "botworker.js",
  // "/",
  "offline.html",
  "/img/pieces/bb.png",
  "/img/pieces/bk.png",
  "/img/pieces/bn.png",
  "/img/pieces/bp.png",
  "/img/pieces/bq.png",
  "/img/pieces/br.png",
  "/img/pieces/wb.png",
  "/img/pieces/wk.png",
  "/img/pieces/wn.png",
  "/img/pieces/wp.png",
  "/img/pieces/wq.png",
  "/img/pieces/wr.png",
  "/img/bots/Alex.png",
  "/img/bots/Beth.png",
  "/img/bots/Cristina.png",
  "/img/bots/John.png",
  "/img/bots/Josh.png",
  "/img/bots/Max.png",
  "/img/svg/bishop.svg",
  "/img/svg/blackknight.svg",
  "/img/svg/blackpawn.svg",
  "/img/svg/blackqueen.svg",
  "/img/svg/king.svg",
  "/img/svg/rook.svg",
  "icon-72x72.png",
  // "/static/css/main.f7edd3e3.chunk.css",
  // "/static/js/2.716918dd.chunk.js",
  // "/static/js/main.a3bd94e6.chunk.js",
  // "app.js",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  if (evt.request.url.indexOf("firestore.googleapis.com") === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          return cacheRes || fetch(evt.request);
        })
        .catch(() => {
          return caches.match("/pages/fallback.html");
        })
    );
  }
});
