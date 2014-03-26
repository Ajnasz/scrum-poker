(function (stampit, spoker) {
    spoker.View = stampit.compose(spoker.Events, stampit().enclose(function () {
        var DOM_EVENTS = {
            CLICK: 'click',
            TOUCHEND: 'touchend',
            TOUCHMOVE: 'touchmove',
            TOUCHSTART: 'touchstart'
        };
        this.DOM_EVENTS = DOM_EVENTS;

        this.listen = function (elem, event, cb) {
            if (typeof elem === 'string') {
                elem = this.byId(elem);
            }

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
    }));
}(window.stampit, window.spoker = window.spoker || {}));
