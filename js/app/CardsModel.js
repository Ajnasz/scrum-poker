(function (stampit, spoker) {
    spoker.CardsModel = stampit.compose(spoker.Model, stampit().enclose(function () {
        function fibonacci(test, acc) {
            var val;

            if (acc.length < 2) {
                val = 1;
            } else {
                val = acc[acc.length - 2] + acc[acc.length - 1];
            }

            if (test(val)) {
                acc.push(val);

                return fibonacci(test, acc);
            }

            return acc;
        }

        function getFibonacciCards() {
            return fibonacci(function (last) {
                return last < 100; // generate fibonacci until last item is less then 100
            }, [0]).reduce(function (prev, current, index, array) {
                var arr = prev || [prev];

                if (arr.indexOf(current) === -1) {
                    return arr.concat(current);
                }

                return arr;
            }, ['?', 0.5]);
        }

        function getTshirtCards() {
            return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?'];
        }

        function getStandardCards() {
            return ['coffe', '?', 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, Infinity];
        }

        this.getStandard = getStandardCards;
        this.getTshirt = getTshirtCards;
        this.getFibonacci = getFibonacciCards;
    }));
}(window.stampit, window.spoker || {}));
