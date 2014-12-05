/* Library for testing things you expect to always be satisfied */
var colors = require('colors');

function inv(description, f) {
    return function() {
        var result, pass = true;
        try {
            result = f();
        } catch (e) {
            pass = false;
        }

        if (!pass || result === false) {
            console.error(colors.red('Invariant "' + description + '" failed'));
        }

        if (result === true) {
            return true;
        } else if (result === false) {
            return false;
        } else {
            return pass;
        }
    };
}

var all = function(invariants) {
    return function() {
        return invariants.reduce(function(prev, f) {
            return f() && prev;
        }, true);
    };
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
