const baseURL = '/blazor-stocks-portfolio/';
const indexURL = '/blazor-stocks-portfolio/index.html';
const networkFetchEvent = 'fetch';
const swInstallEvent = 'install';
const swInstalledEvent = 'installed';
const swActivateEvent = 'activate';
const staticCachePrefix = 'blazor-cache-v';
const staticCacheName = 'blazor-cache-v21';
const requiredFiles = [
"/blazor-stocks-portfolio/_framework/blazor.boot.json",
"/blazor-stocks-portfolio/_framework/blazor.webassembly.js",
"/blazor-stocks-portfolio/_framework/wasm/mono.js",
"/blazor-stocks-portfolio/_framework/wasm/mono.wasm",
"/blazor-stocks-portfolio/_framework/_bin/BlazorFinancePortfolio.Client.dll",
"/blazor-stocks-portfolio/_framework/_bin/BlazorFinancePortfolio.Client.pdb",
"/blazor-stocks-portfolio/_framework/_bin/BlazorFinancePortfolio.Shared.dll",
"/blazor-stocks-portfolio/_framework/_bin/BlazorFinancePortfolio.Shared.pdb",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.AspNetCore.Blazor.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.AspNetCore.Components.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.AspNetCore.Components.Forms.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.AspNetCore.Components.Web.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.CSharp.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.Extensions.Options.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.Extensions.Primitives.dll",
"/blazor-stocks-portfolio/_framework/_bin/Microsoft.JSInterop.dll",
"/blazor-stocks-portfolio/_framework/_bin/Mono.Security.dll",
"/blazor-stocks-portfolio/_framework/_bin/Mono.WebAssembly.Interop.dll",
"/blazor-stocks-portfolio/_framework/_bin/mscorlib.dll",
"/blazor-stocks-portfolio/_framework/_bin/netstandard.dll",
"/blazor-stocks-portfolio/_framework/_bin/Newtonsoft.Json.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Buffers.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.ComponentModel.Annotations.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.ComponentModel.Composition.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.ComponentModel.DataAnnotations.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Core.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Data.DataSetExtensions.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Data.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Drawing.Common.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.IO.Compression.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.IO.Compression.FileSystem.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Memory.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Net.Http.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Numerics.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Numerics.Vectors.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Runtime.Loader.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Runtime.Serialization.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.ServiceModel.Internals.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Text.Encodings.Web.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Text.Json.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Threading.Tasks.Extensions.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Transactions.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Xml.dll",
"/blazor-stocks-portfolio/_framework/_bin/System.Xml.Linq.dll",
"/blazor-stocks-portfolio/_framework/_bin/Telerik.Blazor.dll",
"/blazor-stocks-portfolio/_framework/_bin/Telerik.DataSource.dll",
"/blazor-stocks-portfolio/_framework/_bin/WebAssembly.Bindings.dll",
"/blazor-stocks-portfolio/_framework/_bin/WebAssembly.Net.Http.dll",
"/blazor-stocks-portfolio/css/bootstrap/bootstrap.min.css",
"/blazor-stocks-portfolio/css/bootstrap/bootstrap.min.css.map",
"/blazor-stocks-portfolio/css/styles.min.css",
"/blazor-stocks-portfolio/default-icon-192x192.png",
"/blazor-stocks-portfolio/default-icon-512x512.png",
"/blazor-stocks-portfolio/favicon.ico",
"/blazor-stocks-portfolio/images/area.png",
"/blazor-stocks-portfolio/images/candle.png",
"/blazor-stocks-portfolio/images/cross-out.svg",
"/blazor-stocks-portfolio/images/footer-bg.svg",
"/blazor-stocks-portfolio/images/header-bg.svg",
"/blazor-stocks-portfolio/images/line.png",
"/blazor-stocks-portfolio/images/progress-logo.svg",
"/blazor-stocks-portfolio/images/user.jpg",
"/blazor-stocks-portfolio/index.html",
"/blazor-stocks-portfolio/telerik-themes/bootstrap/dist/all.css",
"/blazor-stocks-portfolio/windowResizeHandler.js",
"/blazor-stocks-portfolio/ServiceWorkerRegister.js",
"/blazor-stocks-portfolio/manifest.json"
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
