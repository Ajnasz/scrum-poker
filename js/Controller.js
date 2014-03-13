(function (stampit, spoker) {
    spoker.Controller = spoker.Util.enclose(function () {
        this.listenViewEvents = function (view, viewEvents) {
            if (viewEvents) {
                Object.keys(viewEvents).forEach(function (eventName) {
                    view.on(eventName, viewEvents[eventName]);
                }.bind(this));
            }
        };

    });
}(window.stampit, window.spoker = window.spoker || {}));
