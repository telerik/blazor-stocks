const baseURL = '/blazor-financial-portfolio/';
const indexURL = '/blazor-financial-portfolio/index.html';
const networkFetchEvent = 'fetch';
const swInstallEvent = 'install';
const swInstalledEvent = 'installed';
const swActivateEvent = 'activate';
const staticCachePrefix = 'blazor-cache-v';
const staticCacheName = 'blazor-cache-v26';
const requiredFiles = [
"/blazor-financial-portfolio/css/bootstrap/bootstrap.min.css",
"/blazor-financial-portfolio/css/bootstrap/bootstrap.min.css.map",
"/blazor-financial-portfolio/css/styles.min.css",
"/blazor-financial-portfolio/default-icon-192x192.png",
"/blazor-financial-portfolio/default-icon-512x512.png",
"/blazor-financial-portfolio/favicon.ico",
"/blazor-financial-portfolio/images/area.png",
"/blazor-financial-portfolio/images/candle.png",
"/blazor-financial-portfolio/images/cross-out.svg",
"/blazor-financial-portfolio/images/footer-bg.svg",
"/blazor-financial-portfolio/images/header-bg.svg",
"/blazor-financial-portfolio/images/line.png",
"/blazor-financial-portfolio/images/progress-logo.svg",
"/blazor-financial-portfolio/images/user.jpg",
"/blazor-financial-portfolio/index.html",
"/blazor-financial-portfolio/ServiceWorkerRegister.js",
"/blazor-financial-portfolio/manifest.json"
];
// * listen for the install event and pre-cache anything in filesToCache * //
self.addEventListener(swInstallEvent, event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(requiredFiles);
            })
    );
});
self.addEventListener(swActivateEvent, function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (staticCacheName !== cacheName && cacheName.startsWith(staticCachePrefix)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener(networkFetchEvent, event => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === baseURL) {
            event.respondWith(caches.match(indexURL));
            return;
        }
    }
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (response.ok) {
                            if (requestUrl.origin === location.origin) {
                                caches.open(staticCacheName).then(cache => {
                                    cache.put(event.request.url, response);
                                });
                            }
                        }
                        return response.clone();
                    });
            }).catch(error => {
                console.error(error);
            })
    );
});
