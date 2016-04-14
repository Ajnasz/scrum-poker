(function (stampit, spoker) {
    spoker.View = stampit.compose(spoker.Events, stampit().enclose(function () {

        var DOM_EVENTS = {
            CLICK: 'click',
            TOUCHEND: 'touchend',
            TOUCHMOVE: 'touchmove',
            TOUCHSTART: 'touchstart'
        };

        this.DOM_EVENTS = DOM_EVENTS;

        this.getElem = function (elem) {
            if (typeof elem === 'string') {
                elem = this.byId(elem);
            }

            return elem;
        };

        this.listen = function (elem, event, cb) {
            this.getElem(elem).addEventListener(event, cb, false);
        };

        this.byId = function (id) {
            return document.getElementById(id);
        };

        this.onClick = function (elem, cb) {
            this.listen(elem, DOM_EVENTS.CLICK, cb);
        };

        this.onTouchMove = function (elem, cb) {
            this.listen(elem, DOM_EVENTS.TOUCHMOVE, cb);
        };

        this.onTouchStart = function (elem, cb) {
            this.listen(elem, DOM_EVENTS.TOUCHSTART, cb);
        };

        this.onTouchEnd = function (elem, cb) {
            this.listen(elem, DOM_EVENTS.TOUCHEND, cb);
        };

		this.empty = function (elem) {
			while (elem.hasChildNodes()) {
				elem.removeChild(elem.firstChild);
			}
		};

    }));
}(window.stampit, window.spoker = window.spoker || {}));
