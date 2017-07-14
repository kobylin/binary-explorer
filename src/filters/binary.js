app.filter('binary', function() {
    return function(dec) {
        if(typeof dec === 'undefined' || dec === null) return NaN;

        return utils.getBinary(Number(dec), 32);
    };
});