var REGEXP_INT = /^(-)?[0-9]+$/;

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
                if(!REGEXP_INT.test(viewValue)) {
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