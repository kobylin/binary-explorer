app.component('numbersTable', {
    templateUrl: 'components/numbers-table/numbers-table.html',
    bindings: {
        maxNumber: '<?'
    },
    controller: function ($scope) {
        $scope.maxNumber = $scope.maxNumber || Math.pow(2, 31);

        $scope.numbers = [new MultiNumber()];

        $scope.addNumber = function () {
            $scope.numbers.push(new MultiNumber());
        };

        $scope.remove = function (number) {
            $scope.numbers.splice($scope.numbers.indexOf(number), 1);
        };

        $scope.getNumbersSum = function () {
            var sum = 0;
            $scope.numbers.forEach(function (num) {
                sum += parseInt(num.dec || 0, 10);
            });

            return sum;
        };

        $scope.getNumbersAnd = function () {
            var sum = $scope.numbers[0].dec;
            $scope.numbers.slice(1).forEach(function (num) {
                sum &= parseInt(num.dec || 0, 10);
            });

            return sum;
        };

        $scope.getNumbersOr = function () {
            var sum = $scope.numbers[0].dec;
            $scope.numbers.slice(1).forEach(function (num) {
                sum |= parseInt(num.dec || 0, 10);
            });

            return sum;
        };

        $scope.getNumbersXor = function () {
            var sum = $scope.numbers[0].dec;
            $scope.numbers.slice(1).forEach(function (num) {
                sum ^= parseInt(num.dec || 0, 10);
            });

            return sum;
        };
    }
});

