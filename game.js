var cards = [
	two = {
		name: "two",
		value: 2
	},
	three = {
		name: "three",
		value: 3
	},
	four = {
		name: "four",
		value: 4
	},
	five = {
		name: "five",
		value: 5
	},
	six = {
		name: "six",
		value: 6
	},
	seven = {
		name: "seven",
		value: 7
	},
	eight = {
		name: "eight",
		value: 8
	},
	nine = {
		name: "nine",
		value: 9
	},
	ten = {
		name: "ten",
		value: 10
	},
	jack = {
		name: "jack",
		value: 10
	},
	queen = {
		name: "queen",
		value: 10
	},
	king = {
		name: "king",
		value: 10
	},
	ace = {
		name: "ace",
		value: 1
	}
]

var fullDeck = [];

function setFullDeck () {
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 13; i++) {	
			fullDeck.push(cards[i]);
		}
	}
}

setFullDeck();