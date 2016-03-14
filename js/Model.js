(function (stampit, spoker) {
	'use strict';
    spoker.Model = stampit.compose(spoker.Events, stampit().enclose(function () {
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
			if (name in data) {
				return data[name];
			}

			return;
        };
    }));
}(window.stampit, window.spoker = window.spoker || {}));
