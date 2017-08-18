app.directive('multiNumber', function () {
    return {
        restrict: 'A',
        scope: {
            multiNumber: '='
        },
        link: function ($scope, element, attrs, ctrl) {
            $scope.$watch('multiNumber.dec', function (newVal) {
                if (newVal === '-') return;
                $scope.multiNumber.fromDec(newVal || 0);
            });

            $scope.$watch('multiNumber.bin', function (newVal) {
                $scope.multiNumber.fromBin(newVal);
            });

            $scope.$watch('multiNumber.hex', function (newVal) {
                if (newVal === '-') return;
                $scope.multiNumber.fromHex(newVal || 0);
            });
        }
    }
});
