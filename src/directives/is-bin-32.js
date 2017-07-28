var REGEXP_BIN = /^[0-1]+$/;

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
                if (REGEXP_BIN.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('isBin32', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('isBin32', false);
                    return undefined;
                }
            });
        }
    };
});