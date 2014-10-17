var binaryExplorer = angular.module('binaryExplorer');

var REGEXP = {
    int32: /^(-)?[0-9]+$/,
    bin: /^[0-1]+$/,
    hex: /^(0x)?[0-9a-f]+$/i
};

binaryExplorer.directive('isInt32', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            isNumber: '='
        },
        link: function($scope, element, attr, ctrl) {

            ctrl.$parsers.unshift(function(viewValue) {
                if (
                    REGEXP.int32.test(viewValue) &&
                    -2147483648 + 1 <= viewValue && viewValue <= 2147483648 - 1 // range [-2^31 + 1, 2^31 - 1]
                ) {
                    // it is valid
                    ctrl.$setValidity('isInt32', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('isInt32', false);
                    return undefined;
                }
            });
        }
    };
});

binaryExplorer.directive('isBin32', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            isNumber: '='
        },
        link: function($scope, element, attr, ctrl) {
            console.log('isNumber', ctrl);

            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});

binaryExplorer.directive('isHex32', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            isNumber: '='
        },
        link: function($scope, element, attr, ctrl) {
            console.log('isNumber', ctrl);

            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});
