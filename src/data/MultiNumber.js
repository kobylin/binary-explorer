app.service('$MultiNumber', function($utils) {

    function MultiNumber(options) {
        options = options || {};

        this.bin = options.bin || 0;
        this.dec = options.dec || 0;
        this.hex = options.hex || 0;

        this.fromDec(this.dec);
    }

    MultiNumber.prototype.fromDec = function(num) {
        if (!this.isDec(num)) {
            throw new Error('Number is not dec');
        }
        this.dec = num;
        this.bin = $utils.getBinary(this.dec, 32);
        this.hex = Number(this.dec).toString(16);
    };

    MultiNumber.prototype.fromBin = function(num) {
        if (!this.isBin(num)) {
            throw new Error('Number is not bin');
        }
        this.bin = num;
        this.dec = $utils.parseBinary(this.bin, 32);
        this.hex = Number(this.dec).toString(16);
    };

    MultiNumber.prototype.fromHex = function(num) {
        if (!this.isHex(num)) {
            throw new Error('Number is not hex');
        }
        this.hex = num;
        this.dec = parseInt(this.hex, 16);
        this.bin = $utils.getBinary(this.dec, 32);
    };

    MultiNumber.prototype.isDec = function(num) {
        return /^(-)?[0-9]+$/.test(num);
    };

    MultiNumber.prototype.isBin = function(num) {
        return /^[0-1]+$/.test(num);
    };

    MultiNumber.prototype.isHex = function(num) {
        return /^(-)?(0x)?[0-9a-f]+$/i.test(num);
    };

    return MultiNumber;
});
