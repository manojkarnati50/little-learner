const C='kids-v9';
const F=['./','./index.html','./manifest.webmanifest','./icon.svg','./sw.js','./assets/avatars/bike.webp','./assets/avatars/jump.webp','./assets/avatars/pout.webp','./assets/avatars/look.webp','./assets/avatars/stand.webp','./assets/avatars/laugh.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith((async()=>{
    const cache=await caches.open(C);
    const hit=await cache.match(e.request,{ignoreSearch:true});
    if(hit)return hit;
    try{
      const n=await fetch(e.request);
      if(n&&n.ok)cache.put(e.request,n.clone());
      return n;
    }catch(err){
      const u=new URL(e.request.url);
      if(e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html')){
        return (await cache.match('./index.html'))||(await cache.match('./'))||Response.error();
      }
      return Response.error();
    }
  })());
});
