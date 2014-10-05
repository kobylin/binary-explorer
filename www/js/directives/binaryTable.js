angular.module('binaryExplorer')
    .directive('binaryTable', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/binaryTable.html',
            scope: {

            },
            controller: function($scope) {
                console.log('controller', $scope);

                $scope.numbers = [new MultiNumber()];

                $scope.addNumber = function() {
                    $scope.numbers.push(new MultiNumber());
                };

                $scope.remove = function(number) {
                    $scope.numbers.splice($scope.numbers.indexOf(number), 1);
                };

            },
            link: function($scope) {

            }

        };
    });

