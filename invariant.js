/* Library for testing things you expect to always be satisfied */
var colors = require('colors');

var helpers = {
    type: function(obj) {
        var type = Object.prototype.toString.call(obj);
        if (type === '[object Array]') {
            return 'Array';
        } else if (type === '[object Object]') {
            return 'Object';
        } else {
            throw new Error('Unknown type: {{type}}'.replace('{{type}}', type));
        }
    }
};

function inv(description, f) {
    return function() {
        var result, pass = true;
        try {
            result = f();
        } catch (e) {
            pass = false;
        }

        if (!pass || result === false) {
            console.error(colors.red('Invariant "' + description + '" not satisfied'));
        }

        if (result === true) {
            return true;
        } else if (result === false) {
            return false;
        } else if (typeof result === 'undefined') {
            console.warn(colors.yellow('No result returned from: "{{desc}}"'
                                       .replace('{{desc}}', description)));
        } else {
            return pass;
        }
    };
}

var all = function(invariants) {
    if (helpers.type(invariants) === 'Array') {
        return function() {
            return invariants.reduce(function(prev, f) {
                return f() && prev;
            }, true);
        };
    } else if (helpers.type(invariants) === 'Object') {
        var invArr = [];
        for (var inv in invariants) {
            invArr.push(invariants[inv]);
        }
        return all(invArr);
    }
};

var when = function(condition, invariants) {
    return function() {
        if (condition()) {
            return invariants();
        } else {
            return true;
        }
    };
};

module.exports = {
    inv: inv,
    all: all,
    when: when
};
