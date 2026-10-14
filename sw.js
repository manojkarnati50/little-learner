const C='kids-v2';const F=['./','./index.html','./manifest.webmanifest','./icon.svg','./sw.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.open(C).then(cache=>cache.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n&&n.ok)cache.put(e.request,n.clone());return n;})))));
