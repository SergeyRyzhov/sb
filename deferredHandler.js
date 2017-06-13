(function (name, root, factory) {
    function isObject(x) { return typeof x === "object"; }
    if (isObject(root.module) && isObject(root.module.exports)) {
        root.module.exports = factory();
    } else if (isObject(root.exports)) {
        root.exports[name] = factory();
    } else if (isObject(root.define) && root.define.amd) {
        root.define(name, [], factory);
    } else if (isObject(root.modulejs)) {
        root.modulejs.define(name, factory);
    } else if (isObject(root.YUI)) {
        root.YUI.add(name, function (Y) { Y[name] = factory(); });
    } else {
        root[name] = factory();
    }
} ('crutch', this, function () {
    function _deferredHandler(selector, callback, delay) {
        delay = delay || 100;
        callback = callback || console.debug;

        function _executor() {
            var element = document.querySelector(this.selector);
            if (element)
                this.callback(element);
            else
                setTimeout(_executor.bind(this), this.delay);
        }

        _executor.call({ selector: selector, callback: callback, delay: delay });
    }

    return {
        deferredHandler: _deferredHandler
    };
}));
