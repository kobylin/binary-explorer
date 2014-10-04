var utils = {

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
    },

    padleft: function(str, len, chr) {
        var str = str.toString();
        return Array(len - str.length + 1).join(chr) + str;
    },

    getBinary: function(intVal, base) {
        intVal = Number(intVal);

        if (intVal.toString(2).replace('-', '').length > base - 1) {
            throw 'Too big number for this base system(' + base + ' base)';
        }

        if (intVal >= 0)
            return utils.padleft(intVal.toString(2), base, "0");
        // else
        var tmp = (-intVal - 1).toString(2).replace(/[01]/g, function(d) {
            return +!+d; // hehe: inverts each char
        });
        return utils.padleft(tmp, base, "1");
    },

    parseBinary: function(binVal) {
        if (binVal[0] === '0') {
            return parseInt(binVal, 2);
        }
        if (binVal[0] === '1') {
            var tmp = binVal.replace(/[01]/g, function(d) {
                return +!+d; // hehe: inverts each char
            });
            return -(parseInt(tmp, 2) + 1);
        }
    }
};
