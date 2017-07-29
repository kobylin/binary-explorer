app.directive('isInt', function () {
    return {
        restrict: 'A',
        controller: function ($element) {
            var ctrl = this;
            var validCharacterRegexp = /[0-9\-]/;
            var validKeys = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];

            $element.on('keydown', function validateKey(e) {
                var character = e.key;

                if (!ctrl._validateCharacter(character)) {
                    e.preventDefault();
                    return;
                }

                ctrl._handleMinus(character, e);
            });

            ctrl._validateCharacter = function (character) {
                var isValidCharacter = validCharacterRegexp.test(character);
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
        }
    }
});
