app.filter('hex', function() {
    return function(dec) {
        return Number(dec).toString(16);
    };
});
