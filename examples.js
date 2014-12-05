var test = require('./invariant');
var expect = require('expect');

var RPS = function() {
    this.players = 2;
    this.currentRound = {};
};

RPS.prototype.choose = function(index, hand) {
    this.currentRound[index] = hand;
};

RPS.prototype.reset = function() {
    this.currentRound = {};
};

var rps = new RPS();

var hasTwoPlayers = test.inv('players should be 2', function() {
    expect(rps.players).toEqual(2);
});

var handIsRPS = test.inv('hand is rock, paper or scissors (if any)', function() {
    if (rps.currentRound[0]) {
        expect(['rock', 'paper', 'scissors']).to.include(rps.currentRound[0]);
    }
});

var handTests = test.all([hasTwoPlayers, handIsRPS]);

rps.choose(0, 'sranje');

console.log(handTests());
