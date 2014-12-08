var test = require('./invariant.js');

function genPersonTests(person) {
    var nameLength = test.inv('name has low length', function() {
        return person.name.length < 16;
    });

    var surnameNoNumbers = test.inv('surname has no numbers', function() {
        return person.surname.search(/[0-9]/) === -1;
    });

    var isMinor = function() {
        return person.age < 18;
    };

    var idIsPositive = test.inv('id is positive', function() {
        return person.id > 0;
    });

    var minorInvariants = test.when(isMinor, test.all({
        mustNotDrink: test.inv('must not drink', function() {
            return person.canDrink === false;
        }),
        mustNotDrive: test.inv('must not drive', function() {
            return person.hasDriversLicence === false;
        })
    }));

    var tests = test.all([idIsPositive, nameLength, surnameNoNumbers, minorInvariants]);

    return tests;
}

var person = {
    name: 'Andrej',
    surname: 'Trajchevski',
    id: -2,
    age: 17,
    hasDriversLicence: true,
    canDrink: false
};

var personTests = genPersonTests(person);

console.log(personTests());
