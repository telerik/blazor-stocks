const baseURL = '/blazor-financial-portfolio/';
const indexURL = '/blazor-financial-portfolio/index.html';
const networkFetchEvent = 'fetch';
const swInstallEvent = 'install';
const swInstalledEvent = 'installed';
const swActivateEvent = 'activate';
const staticCachePrefix = 'blazor-cache-v';
const staticCacheName = 'blazor-cache-v26';
const requiredFiles = [
"/blazor-financial-portfolio/_framework/blazor.boot.json",
"/blazor-financial-portfolio/_framework/blazor.webassembly.js",
"/blazor-financial-portfolio/_framework/wasm/dotnet.js",
"/blazor-financial-portfolio/_framework/wasm/dotnet.wasm",
"/blazor-financial-portfolio/_framework/_bin/BlazorFinancePortfolio.Client.dll",
"/blazor-financial-portfolio/_framework/_bin/BlazorFinancePortfolio.Shared.dll",
"/blazor-financial-portfolio/_framework/_bin/BlazorPro.BlazorSize.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.AspNetCore.Blazor.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.AspNetCore.Components.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.AspNetCore.Components.Forms.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.AspNetCore.Components.Web.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.CSharp.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.Configuration.Abstractions.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.Configuration.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.Options.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.Extensions.Primitives.dll",
"/blazor-financial-portfolio/_framework/_bin/Microsoft.JSInterop.dll",
"/blazor-financial-portfolio/_framework/_bin/Mono.Security.dll",
"/blazor-financial-portfolio/_framework/_bin/Mono.WebAssembly.Interop.dll",
"/blazor-financial-portfolio/_framework/_bin/mscorlib.dll",
"/blazor-financial-portfolio/_framework/_bin/netstandard.dll",
"/blazor-financial-portfolio/_framework/_bin/Newtonsoft.Json.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Buffers.dll",
"/blazor-financial-portfolio/_framework/_bin/System.ComponentModel.Annotations.dll",
"/blazor-financial-portfolio/_framework/_bin/System.ComponentModel.Composition.dll",
"/blazor-financial-portfolio/_framework/_bin/System.ComponentModel.DataAnnotations.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Core.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Data.DataSetExtensions.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Data.dll",
"/blazor-financial-portfolio/_framework/_bin/System.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Drawing.Common.dll",
"/blazor-financial-portfolio/_framework/_bin/System.IO.Compression.dll",
"/blazor-financial-portfolio/_framework/_bin/System.IO.Compression.FileSystem.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Memory.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Net.Http.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Numerics.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Numerics.Vectors.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Runtime.Loader.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Runtime.Serialization.dll",
"/blazor-financial-portfolio/_framework/_bin/System.ServiceModel.Internals.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Text.Encodings.Web.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Text.Json.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Threading.Tasks.Extensions.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Transactions.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Xml.dll",
"/blazor-financial-portfolio/_framework/_bin/System.Xml.Linq.dll",
"/blazor-financial-portfolio/_framework/_bin/Telerik.Blazor.dll",
"/blazor-financial-portfolio/_framework/_bin/Telerik.DataSource.dll",
"/blazor-financial-portfolio/_framework/_bin/WebAssembly.Bindings.dll",
"/blazor-financial-portfolio/_framework/_bin/WebAssembly.Net.Http.dll",
"/blazor-financial-portfolio/_framework/_bin/WebAssembly.Net.WebSockets.dll",
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
"/blazor-financial-portfolio/telerik-themes/bootstrap/dist/all.css",
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
