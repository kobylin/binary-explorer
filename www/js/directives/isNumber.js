var binaryExplorer = angular.module('binaryExplorer');

binaryExplorer.directive('isInt32', function() {
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
