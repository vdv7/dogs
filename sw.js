const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";


async function cacheOffline(){
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
}

async function onlineOrOffline(req){
    try {
        // Always try the network first.
        return await fetch(req);
    } catch (error) {
        // if there is a network error, respond with offline files
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil( cacheOffline() );
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith( onlineOrOffline(event.request) );
    }
});
