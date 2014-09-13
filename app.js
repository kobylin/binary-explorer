var binaryExplorer = angular.module('binaryExplorer', []);

binaryExplorer.filter('binary', function() {
    return function(dec) {
        return Number(dec).toString(2);
    };
});

binaryExplorer.filter('hex', function() {
    return function(dec) {
        return Number(dec).toString(16);
    };
});

binaryExplorer.directive('numberSet', function() {
    return {
        restrict: 'A',
        scope: {
            numberSet: '='
        },
        link: function($scope, element, attrs, ctrl) {
            $scope.$watch('numberSet.dec', function(newVal, oldVal) {
                if (!isDec(newVal) && newVal !== '') {
                    $scope.numberSet.dec = oldVal;
                    return;
                }
                newVal = newVal || 0;
                if (newVal !== oldVal) {
                    $scope.numberSet.bin = Number(newVal).toString(2);
                    $scope.numberSet.hex = Number(newVal).toString(16);
                }
            });
            $scope.$watch('numberSet.bin', function(newVal, oldVal) {
                if (!isBin(newVal) && newVal !== '') {
                    $scope.numberSet.bin = oldVal;
                    return;
                }
                newVal = newVal || 0;
                if (newVal !== oldVal) {
                    $scope.numberSet.dec = parseInt(newVal, 2);
                    $scope.numberSet.hex = Number(parseInt(newVal, 2)).toString(16);
                }
            });
            $scope.$watch('numberSet.hex', function(newVal, oldVal) {
                if (!isHex(newVal) && newVal !== '') {
                    $scope.numberSet.hex = oldVal;
                    return;
                }
                newVal = newVal || 0;
                if (newVal !== oldVal) {
                    $scope.numberSet.dec = parseInt(newVal, 16);
                    $scope.numberSet.bin = Number(parseInt(newVal, 16)).toString(2);
                }
            });

            function isDec(num) {
                var arr = String(num).split("");
                if (arr.length === 0) return true;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return true;
                if (arr.length === 2 && num === '-.') return true;
                if (isNaN(num)) {
                    return false;
                }
                return true;
            }

            function isBin(num) {
                return /^[0-1]+$/.test(num);
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

binaryExplorer.controller('binaryConvertions', function($scope) {
    $scope.numbers = [{
        bin: 0,
        dec: 0,
        hex: 0
    }];

    $scope.addNumber = function() {
        $scope.numbers.push({
            bin: 0,
            dec: 0,
            hex: 0
        });
    }

    $scope.remove = function(number) {
        $scope.numbers.splice($scope.numbers.indexOf(number), 1);
    };

    $scope.getNumbersSum = function() {
        var sum = 0;
        $scope.numbers.forEach(function(num) {
            sum += parseInt(num.dec || 0, 10);
        });

        return sum;
    };
    $scope.getNumbersAnd = function() {
        var sum = $scope.numbers[0].dec;
        $scope.numbers.slice(1).forEach(function(num) {
            sum &= parseInt(num.dec || 0, 10);
        });

        return sum;
    };

    $scope.getNumbersOr = function() {
        var sum = $scope.numbers[0].dec;
        $scope.numbers.slice(1).forEach(function(num) {
            sum |= parseInt(num.dec || 0, 10);
        });

        return sum;
    };
    $scope.getNumbersXor = function() {
        var sum = $scope.numbers[0].dec;
        $scope.numbers.slice(1).forEach(function(num) {
            sum ^= parseInt(num.dec || 0, 10);
        });

        return sum;
    };

});

var Utils = {
    setValue: function(obj, key, value) {
        if (!key) return;
        var path = key.split('.');

        try {
            var deep = obj;
            path.slice(0, path.length - 1).forEach(function(p) {
                deep = deep[p];
            });
            deep[path[path.length - 1]] = value;
        } catch (err) {
            console.log('Nobody at such deep.');
        }

    }
};
