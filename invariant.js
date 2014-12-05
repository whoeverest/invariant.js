/* Library for testing things you expect to always be satisfied */

function inv(description, f) {
    return function() {
        var result, pass = true;
        try {
            result = f();
        } catch (e) {
            pass = false;
        }
        if (result) {
            return result === true;
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

module.exports = {
    inv: inv,
    all: all
};
