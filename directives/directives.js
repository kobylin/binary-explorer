var binaryExplorer = angular.module('binaryExplorer');

binaryExplorer.directive('numberSet', function() {
    return {
        restrict: 'A',
        scope: {
            numberSet: '='
        },
        link: function($scope, element, attrs, ctrl) {
            $scope.numberSet.bin = utils.getBinary($scope.numberSet.dec, 32);
            $scope.numberSet.hex = Number($scope.numberSet.dec).toString(16);

            $scope.$watch('numberSet.dec', function(newVal, oldVal) {
                if (newVal === '-') return;
                if (!isDec(newVal) && newVal !== '') {
                    $scope.numberSet.dec = oldVal;
                    return;
                }

                newVal = newVal || 0;
                if (newVal !== oldVal) {
                    $scope.numberSet.bin = utils.getBinary(newVal, 32);
                    $scope.numberSet.hex = Number(newVal).toString(16);
                }
            });

            $scope.$watch('numberSet.bin', function(newVal, oldVal) {
                if (newVal === '-') return;
                if (!isBin(newVal) && newVal !== '') {
                    $scope.numberSet.bin = oldVal;
                    return;
                }
                newVal = newVal || 0;
                if (newVal !== oldVal) {
                    $scope.numberSet.dec = utils.parseBinary(newVal);
                    $scope.numberSet.hex = Number($scope.numberSet.dec).toString(16);
                }
            });

            $scope.$watch('numberSet.hex', function(newVal, oldVal) {
                if (newVal === '-') return;
                if (!isHex(newVal) && newVal !== '') {
                    $scope.numberSet.hex = oldVal;
                    return;
                }

                newVal = newVal || 0;
                if (newVal !== oldVal) {
                    $scope.numberSet.dec = parseInt(newVal, 16);
                    $scope.numberSet.bin = utils.getBinary(parseInt(newVal, 16), 32);
                }
            });

            function isDec(num) {
                return /^(-)?[0-9]+$/.test(num);
            }

            function isBin(num) {
                return /^(-)?[0-1]+$/.test(num);
            }

            function isHex(num) {
                return /^(0x)?[0-9a-f]+$/i.test(num);
            }
        }
    }
});

binaryExplorer.directive('isNumber', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            isNumber: '='
        },
        link: function($scope) {
            $scope.$watch('isNumber', function(newValue, oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    $scope.isNumber = oldValue;
                }
            });
        }
    };
});

binaryExplorer.directive('binaryOperationsPopover', function() {
    return {
        restrict: 'A',
        scope: {
            binaryOperationsPopover: '='
        },
        link: function($scope, element, b, c, d) {

            $(element).click(function(e) {
                console.log('click');

                var $hasPopover = $('.has-popover');
                if ($hasPopover.length === 1) {
                    var popover = $hasPopover.data('bs.popover');
                    popover.$tip.off('click', 'a');
                    popover.destroy();
                    $hasPopover.removeClass('has-popover');
                    if (element[0] === $hasPopover[0])
                        return;
                }

                var popover = $(element).addClass('has-popover')
                    .popover({
                        placement: 'bottom',
                        html: true,
                        trigger: 'manual',
                        content: '<div class="binary-operations">' +
                            '<a class="btn btn-primary btn-xs"> ~ </a>' +
                            '<a class="btn btn-primary btn-xs"> << </a>' +
                            '<a class="btn btn-primary btn-xs"> >> </a>' +
                            '<a class="btn btn-primary btn-xs"> >>> </a>' +
                            '</div>'
                    }).data('bs.popover');

                popover.show();

                popover.$tip.on('click', 'a', function() {
                    var operation = $(this).text().trim();
                    console.log(operation);
                    switch (operation) {
                        case '~':
                            var val = ~parseInt($scope.binaryOperationsPopover + '', 2);
                            $scope.binaryOperationsPopover = Number(val).toString(2);
                            break;
                        case '<<':
                            var val = parseInt($scope.binaryOperationsPopover + '', 2);
                            $scope.binaryOperationsPopover = Number(val << 1).toString(2);
                            break;
                        case '>>':
                            var val = parseInt($scope.binaryOperationsPopover + '', 2);
                            $scope.binaryOperationsPopover = Number(val >> 1).toString(2);
                            break;
                        case '>>>':
                            var val = parseInt($scope.binaryOperationsPopover + '', 2);
                            $scope.binaryOperationsPopover = Number(val >>> 1).toString(2);
                            break;
                        default:
                            break;
                    }

                    $scope.$apply();
                });

            });
        }
    }

});
