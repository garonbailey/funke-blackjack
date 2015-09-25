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
	var cardDiv = $('<div class="card-container">');

	playerTray.append(cardDiv);
	for (var i = 0; i < player.hand.length; i++) {
		var card = $('<div class="card">');

		card.text(player.hand[i].name);

		cardDiv.append(card);
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
	var cardDiv = $('.card-container');

	var card = $('<div class="card">');

	card.text(current.hand[current.hand.length - 1].name);

	if (current == player) {
		cardDiv.append(card);
	} else if (current == dealer) {
		dealerTray.append(card);
	}
}

function totalHand (b) {
	var total = 0;

	for (var i = 0; i < b.hand.length; i++) {
		total += b.hand[i].value;
	}
	return total;
}

//Game controls
function addButtons () {
	var inPlay = $('.in-play');
	var newPlayer = $('<button class="new-player">');
	var dealButton = $('<button class="deal">');
	var reset = $('<button class="reset">');
	var messages = $('<div class="messages">');
	var theMessage = $('<p class="current-message">')

	newPlayer.text("New Player");
	dealButton.text("Deal Hand");
	reset.text("Start Over");
	theMessage.text("");
	messages.append(theMessage);

	inPlay.append(newPlayer).append(dealButton).append(reset).append(messages);
}
addButtons();

function removeMessage () {
	// $('.messages').on('click', function () {
	// 	$('.current-message').text("");
	// })
	setTimeout(function () {
		$('.current-message').text("");
	}, 5000);
}

function addPlayer () {
	var newPlayer = $('.new-player');

	newPlayer.on('click', function () {
		getPlayer();
	})
}

function deal () {
	var deal = $('.deal');
	var messageOutput = $('.current-message');
	var playerTray = $('.player-tray');
	var dealerTray = $('.dealer-tray');

	deal.on('click', function () {
		setFullDeck();
		player.hand = [];
		playerTray.empty();
		renderPlayer();
		dealer.hand = [];
		dealer.moneyWon = 0;
		dealerTray.empty();
		fullDeck = [];
		setFullDeck();
		renderDealer();

		if (player.bet < 25) {
			messageOutput.text("Please place a bet of at least $25");
			removeMessage();
		} else {
			dealPlayer();
			dealDealer();
		}
	});
}

function startOver () {
	var reset = $('.reset');
	var playerTray = $('.player-tray');
	var dealerTray = $('.dealer-tray');

	reset.on('click', function (e) {

		player.name = "";
		player.hand = [];
		player.bank = 1000;
		player.bet = 0;
		playerTray.empty();
		dealer.hand = [];
		dealer.moneyWon = 0;
		dealerTray.empty();
		fullDeck = [];
		setFullDeck();
		renderDealer();

	})
}

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
	var playerBank = $('<p class="bank">');
	var playerBet = $('<p class="bet-output">');
	var playerHand = $('<div class="player-hand">');

	playerName.text(player.name);
	playerBank.text("Bank: $" + player.bank);
	playerBet.text("Current Bet: $" + player.bet);

	playerInterface.append(playerName).append(playerBank).append(playerBet).append(playerHand);

	playerOptions();
}

function playerOptions () {
	var playerInterface = $('.player-tray');
	var hit = $('<button class="hit">');
	var stand = $('<button class="stand">');
	var changeBet = $('<button class="bet">');

	hit.text("Hit");
	stand.text("Stand");
	changeBet.text("Change bet");

	playerInterface.append(hit).append(stand).append(changeBet);

	hitMe();
	newBet();
}

function hitMe () {
	var hitClick = $('.hit');

	hitClick.on('click', function () {
		hit(player);
	})
}

function newBet () {
	var betButton = $('.bet');
	var output = $('.bet-output')

	betButton.on('click', function () {
		var currentBet = prompt("What's your bet?");

		player.bet = Number(currentBet);
		output.text("Current Bet: $" + player.bet);
	})
}

function playerStands () {
	var standButton = $('.stand');

	standButton.on('click', function () {
		console.log("clicked");
		// dealerDecisions();
	});
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
	var dealerTake = $('<p class="lost-money">');
	var dealerHand = $('<div class="dealer-hand">');

	dealerName.text(dealer.name);
	dealerTake.text("Dealer's take: $" + dealer.moneyWon);

	dealerInterface.append(dealerName).append(dealerTake).append(dealerHand);
}

function dealerDecisions () {
	var hasAce = false;
	var totalValue = totalHand(dealer);
	
	while (totalValue < 17) {
		for (var i = 0; i < dealer.hand.length; i++) {
			if (dealer.hand[i].name === "ace") {
				hasAce = true;
			} 
		}
		if (hasAce === true && totalValue < 12) {
			totalValue += 10;
		} else if (hasAce === true && totalValue < 17) {
			hit(dealer);
			totalValue = totalHand(dealer);
		} else if (hasAce === false && totalValue < 17) {
			hit(dealer);
			totalValue = totalHand(dealer);
		} 
	}
	console.log(hasAce, totalValue);
}

renderDealer();
addPlayer();
deal();
startOver();