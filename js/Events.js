(function (stampit, spoker) {
    spoker.Events = stampit.compose(spoker.Util, stampit().enclose(function () {
        var events = {};

        this.on = function (event, callback) {

            if (!events[event]) {
                events[event] = [];
            }

            events[event].push(callback);
        };

        this.emit = function (event) {
            var args;

            if (events && events[event]) {
                args = this.toArray(arguments);

                args.shift();

                events[event].forEach(function (callback) {
                    callback.apply(this, args);
                }.bind(this));
            }
        };
    }));
}(window.stampit, window.spoker = window.spoker || {}));
