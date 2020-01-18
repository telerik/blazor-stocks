function raiseResizeEvent() {
    var namespace = 'BlazorFinancePortfolio.Shared';
    var method = 'RaiseWindowResizeEvent'; 
    DotNet.invokeMethodAsync(namespace, method, Math.floor(window.innerWidth), Math.floor(window.innerHeight))
        .then(function () { },
            function (er) { /* .net dispatches is probably not initialized yet, or the namespace/method name are wrong */ });
}

//throttle resize event, taken from https://stackoverflow.com/a/668185/812369
var timeout = false;
window.addEventListener("resize", function () {
    if (timeout !== false)
        clearTimeout(timeout);
    timeout = setTimeout(raiseResizeEvent, 200);
});

function getWindowWidth() {
    return window.innerWidth;
}