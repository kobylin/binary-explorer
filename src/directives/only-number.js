app.directive('onlyNumber', function () {
    return {
        restrict: 'A',
        controller: function ($element, $attrs) {
            var ctrl = this;
            var validCharacterRegexp = {
                int: /[0-9\-]/,
                bin: /[01]/,
                hex: /[0-9a-f]/i
            };
            var validKeys = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];
            var type = $attrs.onlyNumber || 'int';

            ctrl.validateKey = function (e) {
                var character = e.key;

                if (!ctrl._validateCharacter(character)) {
                    e.preventDefault();
                    return;
                }

                ctrl._handleMinus(character, e);
            };

            ctrl._validateCharacter = function (character) {
                var isValidCharacter = validCharacterRegexp[type].test(character);
                var isValidKey = validKeys.indexOf(character) !== -1;

                if (!isValidCharacter && !isValidKey) {
                    return false;
                }

                return true;
            };

            ctrl._handleMinus = function (character, e) {
                if (character !== '-') {
                    return;
                }

                var inputValue = $element.val();
                var minusExists = inputValue[0] === '-';

                if(!minusExists) {
                    $element.val('-' + inputValue);
                }

                e.preventDefault();
            }

            $element.on('keydown', ctrl.validateKey);
        }
    }
});
