(function (stampit, spoker) {
    spoker.Controller = spoker.Util.enclose(function () {
        this.listenViewEvents = function () {
            var view = this.view,
                viewEvents = this.viewEvents;

            if (viewEvents) {
                Object.keys(viewEvents).forEach(function (eventName) {
                    view.on(eventName, viewEvents[eventName].bind(this));
                }.bind(this));
            }

            return this;
        };

    });
}(window.stampit, window.spoker = window.spoker || {}));
