## Invariant.js

Example:

```javascript
var test = require('./invariant.js');

var person = {
    name: 'Andrej',
    surname: 'Trajchevski',
    id: -2,
    age: 17,
    hasDriversLicence: true,
    canDrink: false
};

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

var mustNotDrink = test.inv('must not drink', function() {
    return person.canDrink === false;
});

var mustNotDrive = test.inv('must not drive', function() {
    return person.hasDriversLicence === false;
});

var minorInvariants = test.when(isMinor, test.all([mustNotDrive, mustNotDrink]));
var tests = test.all([idIsPositive, nameLength, surnameNoNumbers, minorInvariants]);

console.log(tests());
```