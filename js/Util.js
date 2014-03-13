(function (stampit, spoker) {
    spoker.Util = stampit().enclose(function () {
        this.toArray = function (arg) {
            return Array.prototype.slice.call(arg);
        };
    });
}(window.stampit, window.spoker = window.spoker || {}));
