(function (stampit, spoker) {
    spoker.Model = spoker.Events.enclose(function () {
        var data = {};

        this.set = function (name, value, silent) {
            var originalValue = data[name];

            if (value !== originalValue) {
                data[name] = value;

                if (!silent) {
                    this.emit('change.' + name, value, originalValue);
                }
            }
        };
        this.get = function (name) {
            return data[name];
        };
    });
}(window.stampit, window.spoker = window.spoker || {}));
