app.filter('binary', function($utils) {
    return function(dec) {
        if(typeof dec === 'undefined' || dec === null) return NaN;

        return $utils.getBinary(Number(dec), 32);
    };
});
