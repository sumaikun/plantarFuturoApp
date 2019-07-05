"use strict";var precacheConfig=[["./index.html","53c621aad432b764b2878633635d99fb"],["./static/css/main.45b502c5.css","f6eea921447ccaa17dd1948afd8614f0"],["./static/js/main.b5210ab1.js","4cafa4728a919141d71489be0852e280"],["./static/media/Material-Design-Iconic-Font.a4d31128.woff2","a4d31128b633bc0b1cc1f18a34fb3851"],["./static/media/Material-Design-Iconic-Font.b351bd62.ttf","b351bd62abcd96e924d9f44a3da169a7"],["./static/media/Material-Design-Iconic-Font.d2a55d33.woff","d2a55d331bdd1a7ea97a8a1fbb3c569c"],["./static/media/fa-brands-400.6814d0e8.woff2","6814d0e8136d34e313623eb7129d538e"],["./static/media/fa-brands-400.83e6c29f.svg","83e6c29fb363b2f0ea6cc18fefff729c"],["./static/media/fa-brands-400.da408238.woff","da408238128b876cbda6424391f1566f"],["./static/media/fa-brands-400.e8019d50.eot","e8019d507e8cb51d169ab4f94a0cda12"],["./static/media/fa-brands-400.fdf44bc4.ttf","fdf44bc43e8fa2358bbb7d9165d78455"],["./static/media/fa-regular-400.8d220c79.ttf","8d220c793e2612bd131ed8522c54669f"],["./static/media/fa-regular-400.8d9ab84b.woff2","8d9ab84bfe87a3f77112a6698cf639fb"],["./static/media/fa-regular-400.ba2a91dc.svg","ba2a91dc95e6cfdc4b2a186a7ba83e29"],["./static/media/fa-regular-400.dad90637.woff","dad90637f797356bbc70d2664832e0b6"],["./static/media/fa-regular-400.e6c93cb4.eot","e6c93cb47e716b579264a5fdfbf7e84d"],["./static/media/fa-solid-900.132e9759.ttf","132e9759d93e4eefd7cdde0d7a322991"],["./static/media/fa-solid-900.2d0415fa.woff","2d0415fa29ea596b7a02c78eddeede20"],["./static/media/fa-solid-900.b75b4bfe.woff2","b75b4bfe0d58faeced5006c785eaae23"],["./static/media/fa-solid-900.de1d242d.svg","de1d242d8acb26ec43c0d071fe78e72d"],["./static/media/fa-solid-900.ea363ed4.eot","ea363ed422723673917901680be9b37c"],["./static/media/ionicons.19e65b89.eot","19e65b89cee273a249fba4c09b951b74"],["./static/media/ionicons.2c159d0d.woff","2c159d0d05473040b53ec79df8797d32"],["./static/media/ionicons.aff28a20.svg","aff28a207631f39ee0272d5cdde43ee7"],["./static/media/ionicons.dd4781d1.ttf","dd4781d1acc57ba4c4808d1b44301201"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var c="./index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});