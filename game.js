//Cards
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
	shuffleDeck();
}

setFullDeck();

//Card-related functions
function shuffleDeck () {
	var temp;
	for (var i = fullDeck.length - 1 ; i > 0; i--) {
		var random = Math.floor(Math.random() * fullDeck.length);

		temp = fullDeck[i];
		fullDeck[i] = fullDeck[random];
		fullDeck[random] = temp;
	}
}

function dealPlayer () {
	for (var i = 0; i < 2; i++) {
		var cardIndex = Math.floor(Math.random() * fullDeck.length);

		player.hand.push(fullDeck[cardIndex]);
		fullDeck.splice(cardIndex, 1);
	}
	console.log(player.hand);
	renderPlayerDeal();
}

function dealDealer () {
	for (var i = 0; i < 2; i++) {
		var cardIndex = Math.floor(Math.random() * fullDeck.length);

		dealer.hand.push(fullDeck[cardIndex]);
		fullDeck.splice(cardIndex, 1);
	}
	console.log(dealer.hand);
	renderDealerDeal();
}

function renderPlayerDeal() {
	var playerTray = $('.player-tray');
	for (var i = 0; i < player.hand.length; i++) {
		var card = $('<div class="card">');

		card.text(player.hand[i].name);

		playerTray.append(card);
	}
}

function renderDealerDeal() {
	var dealerTray = $('.dealer-tray');
	for (var i = 0; i < dealer.hand.length; i++) {
		var card = $('<div class="card">');

		card.text(dealer.hand[i].name);

		dealerTray.append(card);
	}
}

function hit (current) {
	var cardToPull = Math.floor(Math.random() * fullDeck.length);

	current.hand.push(fullDeck[cardToPull]);
	fullDeck.splice(cardToPull, 1);

	renderHit(current);
}

function renderHit (current) {
	var dealerTray = $('.dealer-tray');
	var playerTray = $('.player-tray');

	var card = $('<div class="card">');

	card.text(current.hand[current.hand.length - 1].name);

	if (current == player) {
		playerTray.append(card);
	} else if (current == dealer) {
		dealerTray.append(card);
	}
}

function totalHand (b) {
	var total = 0;

	for (var i = 0; i < b.hand.length; i++) {
		total += b.hand[i].value;
	}
	console.log(total);
}

//Game controls


//Player 
var player = {
	name: "",
	bank: 1000,
	bet: 0,
	hand: []
}

function getPlayer () {
	player.name = prompt("Who's playing, today?");

	renderPlayer();
}

function renderPlayer () {
	var playerInterface = $('.player-tray');
	var playerName = $('<h3>');
	var playerBank = $('<p>');
	var playerBet = $('<p>');
	var playerHand = $('<div class="player-hand">');

	playerName.text(player.name);
	playerBank.text("Bank: $" + player.bank);
	playerBet.text("Current Bet: $" + player.bet);

	playerInterface.append(playerName).append(playerBank).append(playerBet).append(playerHand);
}

//Dealer
var dealer = {
	name: "Dealer",
	moneyWon: 0,
	hand: []
}

function renderDealer () {
	var dealerInterface = $('.dealer-tray');
	var dealerName = $('<h3>');
	var dealerTake = $('<p>');
	var dealerHand = $('<div class="dealer-hand">');

	dealerName.text(dealer.name);
	dealerTake.text("Dealer's take: $" + dealer.moneyWon);

	dealerInterface.append(dealerName).append(dealerTake).append(dealerHand);
}

renderDealer();