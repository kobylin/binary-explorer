var REGEXP = {
    int32: /^(-)?[0-9]+$/,
    bin: /^[0-1]+$/,
    hex: /^(0x)?[0-9a-f]+$/i
};

var MIN_INT32 = -Math.pow(2, 31) + 1;
var MAX_INT32 = Math.pow(2, 31) - 1;

app.directive('isInt32', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            isNumber: '='
        },
        link: function($scope, element, attr, ngModel) {
            ngModel.$parsers.unshift(function(viewValue) {
                if(!REGEXP.int32.test(viewValue)) {
                    element.val(ngModel.$modelValue || 0);

                    return ngModel.$modelValue;
                }

                if (MIN_INT32 <= viewValue && viewValue <= MAX_INT32) {
                    return viewValue;
                } else {
                    var validValue = utils.clamp(viewValue, MIN_INT32, MAX_INT32);
                    element.val(validValue);
                    return validValue;
                }
            });
        }
    };
});

app.directive('isBin32', function() {
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
