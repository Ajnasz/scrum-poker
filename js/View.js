(function (stampit, spoker) {
    spoker.View = spoker.Util.enclose(function () {
        var DOM_EVENTS = {
            CLICK: 'click',
            TOUCHEND: 'touchend',
            TOUCHMOVE: 'touchmove',
            TOUCHSTART: 'touchstart'
        };
        this.DOM_EVENTS = DOM_EVENTS;

        this.on = function (event, callback) {
            if (!this.events) {
                this.events = {};
            }

            if (!this.events[event]) {
                this.events[event] = [];
            }

            this.events[event].push(callback);
        };

        this.emit = function (event) {
            var args;


            if (this.events && this.events[event]) {
                args = this.toArray(arguments);
                args.shift();
                this.events[event].forEach(function (callback) {
                    callback.apply(this, args);
                }.bind(this));
            }
        };

        this.listen = function (elem, event, cb) {
            elem.addEventListener(event, cb, false);
        };
        this.byId = function (id) {
            return document.getElementById(id);
        };
        this.onClick = function (elem, cb) {
            if (typeof elem === 'string') {
                elem = this.byId(elem);
            }
            this.listen(elem, DOM_EVENTS.CLICK, cb);
        };

        this.onTouchEnd = function (elem, cb) {
            if (typeof elem === 'string') {
                elem = this.byId(elem);
            }
            this.listen(elem, DOM_EVENTS.TOUCHEND, cb);
        };
    });
}(window.stampit, window.spoker = window.spoker || {}));
