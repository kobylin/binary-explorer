var REGEXP_HEX = /^(0x)?[0-9a-f]+$/i;

app.directive('isHex32', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            isNumber: '='
        },
        link: function($scope, element, attr, ctrl) {
            console.log('isNumber', ctrl);

            ctrl.$parsers.unshift(function(viewValue) {
                if (REGEXP_HEX.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('isHex32', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('isHex32', false);
                    return undefined;
                }
            });
        }
    };
});
