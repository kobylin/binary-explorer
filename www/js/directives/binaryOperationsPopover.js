angular.module('binaryExplorer')
    .directive('binaryOperationsPopover', function() {
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
