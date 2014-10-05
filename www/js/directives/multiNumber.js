angular.module('binaryExplorer')
    .directive('multiNumber', function() {
        return {
            restrict: 'A',
            scope: {
                multiNumber: '='
            },
            link: function($scope, element, attrs, ctrl) {

                $scope.$watch('multiNumber.dec', function(newVal, oldVal) {
                    newVal = newVal || 0;
                    if (newVal === '-') return;
                    if (!$scope.multiNumber.fromDec(newVal)) {
                        $scope.multiNumber.dec = oldVal;
                        return;
                    }
                });

                $scope.$watch('multiNumber.bin', function(newVal, oldVal) {
                    if (!$scope.multiNumber.fromBin(newVal)) {
                        $scope.multiNumber.bin = oldVal;
                        return;
                    }
                });

                $scope.$watch('multiNumber.hex', function(newVal, oldVal) {
                    newVal = newVal || 0;
                    if (newVal === '-') return;
                    if (!$scope.multiNumber.fromHex(newVal)) {
                        $scope.multiNumber.hex = oldVal;
                        return;
                    }
                });

            }
        }
    });
