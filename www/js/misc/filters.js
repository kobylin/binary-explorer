binaryExplorer.filter('binary', function() {
    return function(dec) {
        if(typeof dec === 'undefined' || dec === null) return NaN;

        return utils.getBinary(Number(dec), 32);
    };
});

binaryExplorer.filter('hex', function() {
    return function(dec) {
        return Number(dec).toString(16);
    };
});
