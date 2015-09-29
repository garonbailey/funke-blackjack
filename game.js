//Cards
var cards = [
	two = {
		name: "two",
		value: 2,
		display: "2"
	},
	three = {
		name: "three",
		value: 3,
		display: "3"
	},
	four = {
		name: "four",
		value: 4,
		display: "4"
	},
	five = {
		name: "five",
		value: 5,
		display: "5"
	},
	six = {
		name: "six",
		value: 6,
		display: "6"
	},
	seven = {
		name: "seven",
		value: 7,
		display: "7"
	},
	eight = {
		name: "eight",
		value: 8,
		display: "8"
	},
	nine = {
		name: "nine",
		value: 9,
		display: "9"
	},
	ten = {
		name: "ten",
		value: 10,
		display: "10"
	},
	jack = {
		name: "jack",
		value: 10,
		display: "J"
	},
	queen = {
		name: "queen",
		value: 10,
		display: "Q"
	},
	king = {
		name: "king",
		value: 10,
		display: "K"
	},
	ace = {
		name: "ace",
		value: 1,
		display: "A"
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
	renderPlayerDeal();
}

function dealDealer () {
	for (var i = 0; i < 2; i++) {
		var cardIndex = Math.floor(Math.random() * fullDeck.length);

		dealer.hand.push(fullDeck[cardIndex]);
		fullDeck.splice(cardIndex, 1);
	}
	renderDealerDeal();
}

function renderPlayerDeal() {
	var playerTray = $('.player-tray');
	var cardDiv = $('<div class="card-container">');
	var playerSide = $('.player-side');

	playerTray.append(cardDiv);
	for (var i = 0; i < player.hand.length; i++) {
		var card = $('<div class="card">');
		var cardDisplay = $('<h2 class="card-display">');

		cardDisplay.text(player.hand[i].display);

		card.append(cardDisplay);
		playerSide.append(card);
	}
}

function renderDealerDeal() {
	var dealerTray = $('.dealer-tray');
	var dealerDisplay = $('.dealer-side');
	for (var i = 0; i < dealer.hand.length; i++) {
		var card = $('<div class="dealer-cards">');
		var cardDisplay = $('<h2 class="card-display">');

		cardDisplay.text(dealer.hand[i].display);

		card.append(cardDisplay);
		if (i === 0) {
			dealerDisplay.append(card);
		} else if (i === 1) {
			card.addClass('hidden');
			dealerDisplay.append(card);
		}
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

	var playerSide = $('.player-side');
	var dealerSide = $('.dealer-side');

	var card = $('<div class="card">');
	var dealerCard = $('<div class="dealer-cards">');

	var cardDisplay = $('<h2 class="card-display">');



	if (current == player) {
		cardDisplay.text(current.hand[current.hand.length - 1].display);

		card.append(cardDisplay);

		playerSide.append(card);
	} else if (current == dealer) {
		cardDisplay.text(current.hand[current.hand.length - 1].display);

		dealerCard.append(cardDisplay);

		dealerSide.append(dealerCard);
	}
}

function dealerInitialTotal () {
	for (var i = 0; i < dealer.hand.length; i++) {
		if (dealer.hand[i].name === "ace") {
			dealer.hasAce = true;
			dealer.totalHand += dealer.hand[i].value + 10;
			dealer.tenAdded = true;
		} else {
			dealer.totalHand += dealer.hand[i].value;
		}
	}
}

function playerInitialTotal () {
	for (var i = 0; i < player.hand.length; i++) {
		if (player.hand[i].name === "ace") {
			player.hasAce = true;
		} 
	}

	if (player.hasAce) {
		player.totalHand += 10;
		player.tenAdded = true;
	}

	for (var j = 0; j < player.hand.length; j++) {
		player.totalHand += player.hand[j].value;
	}
}

function newPlayerTotal () {
	for (var i = 0; i < player.hand.length; i++) {
		if (player.hand[i].name === "ace") {
			player.hasAce = true;
		}
	}

	var currentTotal = player.totalHand + player.hand[player.hand.length - 1].value;

	if (player.hasAce && player.tenAdded === false && currentTotal <= 11) {
		player.totalHand = currentTotal + 10;
	} else if (player.hasAce && player.tenAdded && player.tenSubtracted === false && currentTotal > 21) {
		player.totalHand = currentTotal - 10;
		player.tenSubtracted = true;
	} else {
		player.totalHand = currentTotal;
	}
}

function determineWinner () {
	var theMessage = $('.current-message');
	var playerBank = $('.bank');
	var dealerTake = $('.lost-money');
	
	if (player.totalHand === 21 && dealer.totalHand !== 21) {
		theMessage.text("Blackjack! " + player.name + " wins!     X");
		clickRemoveMessage();
		player.bank += player.bet;
		playerBank.text("Bank: $" + player.bank);
		if (dealer.moneyWon >= player.bet) {
			dealer.moneyWon -= player.bet;
			dealerTake.text("Dealer's take: $" + dealer.moneyWon);
		}
	} else if (player.totalHand < 21 && dealer.totalHand > 21) {
		theMessage.text("Dealer Busts! " + player.name + " wins!     X");
		clickRemoveMessage();
		player.bank += player.bet;
		playerBank.text("Bank: $" + player.bank);
		if (dealer.moneyWon >= player.bet) {
			dealer.moneyWon -= player.bet;
			dealerTake.text("Dealer's take: $" + dealer.moneyWon);
		}
	} else if (player.totalHand > 21 && dealer.totalHand <= 21) {
		theMessage.text(player.name + " busts! Dealer wins.    X");
		clickRemoveMessage();
		player.bank -= player.bet;
		dealer.moneyWon += player.bet;
		playerBank.text("Bank: $" + player.bank);
		dealerTake.text("Dealer's take: $" + dealer.moneyWon);
	} else if (player.totalHand === dealer.totalHand) {
		theMessage.text("It's a push!    X");
		clickRemoveMessage();
	} else if (player.totalHand <= 21 && player.totalHand > dealer.totalHand) {
		theMessage.text(player.name + " wins with " + player.totalHand + " to Dealer's " + dealer.totalHand + "!     X");
		clickRemoveMessage();
		player.bank += player.bet;
		playerBank.text("Bank: $" + player.bank);
		if (dealer.moneyWon >= player.bet) {
			dealer.moneyWon -= player.bet;
			dealerTake.text("Dealer's take: $" + dealer.moneyWon);
		}
	} else if (dealer.totalHand <= 21 && dealer.totalHand > player.totalHand) {
		theMessage.text("Dealer wins with " + dealer.totalHand + " to " + player.name + "'s " + player.totalHand + "!     X");
		clickRemoveMessage();
		player.bank -= player.bet;
		dealer.moneyWon += player.bet;
		playerBank.text("Bank: $" + player.bank);
		dealerTake.text("Dealer's take: $" + dealer.moneyWon);
	}
}

//Game controls
function addButtons () {
	var inPlay = $('.in-play');
	var newPlayer = $('<button class="new-player">');
	var dealButton = $('<button class="deal">');
	var reset = $('<button class="reset">');
	var messages = $('<div class="messages">');
	var theMessage = $('<p class="current-message">');
	var playerSide = $('<div class="player-side">');
	var dealerSide = $('<div class="dealer-side">');

	newPlayer.text("New Player");
	dealButton.text("Deal Hand");
	reset.text("Start Over");
	theMessage.text("");
	messages.append(theMessage);

	inPlay.append(newPlayer).append(dealButton).append(reset).append(messages);
	inPlay.append(playerSide).append(dealerSide);
}
addButtons();

function removeMessage () {
	setTimeout(function () {
		$('.current-message').text("");
	}, 5000);
}

function clickRemoveMessage () {
	$('.messages').on('click', function () {
		$('.current-message').text("");
	})
}

function addPlayer () {
	var newPlayer = $('.new-player');
	var theMessage = $('.current-message');

	if (player.name === "") {
		newPlayer.on('click', function () {
			getPlayer();
		})
	} else {
		theMessage.text("There is already a player!");
		removeMessage();
	}
}

function deal () {
	var deal = $('.deal');
	var messageOutput = $('.current-message');
	var playerTray = $('.player-tray');
	var dealerTray = $('.dealer-tray');
	var playerInPlay = $('.player-side');
	var dealerInPlay = $('.dealer-side');

	deal.on('click', function () {
		setFullDeck();
		player.hand = [];
		player.totalHand = 0;
		player.hasAce = false;
		player.tenAdded = false;
		player.tenSubtracted = false;
		playerTray.empty();
		playerInPlay.empty();
		dealer.hand = [];
		dealer.totalHand = 0;
		dealer.hasAce = false;
		dealer.numberOfAces = 0;
		dealer.tenAdded = false;
		dealer.tenSubtracted = false;
		dealerTray.empty();
		dealerInPlay.empty();
		fullDeck = [];
		setFullDeck();

		if (player.name === "") {
			messageOutput.text("Please enter a new player");
			removeMessage();
		} else if (player.bet < 25) {
			renderPlayer();
			renderDealer();
			messageOutput.text("Please place a bet of at least $25.    X");
			clickRemoveMessage();
		} else if (player.bank < 25) {
			messageOutput.text("You don't have enough money to play! Please start over.    X");
			clickRemoveMessage();
		} else {
			renderPlayer();
			renderDealer();
			dealPlayer();
			dealDealer();
			playerInitialTotal();
			dealerInitialTotal();
		}
	});
}

function startOver () {
	var reset = $('.reset');
	var playerTray = $('.player-tray');
	var dealerTray = $('.dealer-tray');
	var playerInPlay = $('.player-side');
	var dealerInPlay = $('.dealer-side');

	reset.on('click', function (e) {

		player.name = "";
		player.hand = [];
		player.bank = 1000;
		player.bet = 0;
		player.totalHand = 0;
		player.hasAce = false;
		player.tenAdded = false;
		player.tenSubtracted = false;
		playerTray.empty();
		playerInPlay.empty();
		dealer.moneyWon = 0;
		dealer.hand = [];
		dealer.totalHand = 0;
		dealer.hasAce = false;
		dealer.numberOfAces = 0;
		dealer.tenAdded = false;
		dealer.tenSubtracted = false;
		dealerTray.empty();
		dealerInPlay.empty();
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
	hand: [],
	totalHand: 0,
	hasAce: false,
	tenAdded: false,
	tenSubtracted: false
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
	playerStands();
}

function hitMe () {
	var hitClick = $('.hit');
	var theMessage = $('.current-message');

	hitClick.on('click', function () {
		hit(player);
		var playerHasAce = false;
		for (var i = 0; i < player.hand.length; i++) {
			if (player.hand[i].name === "ace") {
				playerHasAce = true;
			}
		}
		if (player.hasAce && player.tenAdded && player.tenSubtracted === false && player.totalHand > 22) {
			player.totalHand -= 10;
			player.tenSubtracted = true;
		}
		newPlayerTotal();
		if (player.totalHand > 21) {
			theMessage.text(player.name + " busts! Dealer wins!    X");
			clickRemoveMessage();
			player.bank -= player.bet;
			$('.bank').text("Bank: $" + player.bank);
			dealer.moneyWon += player.bet;
			$('.lost-money').text("Dealer's take: $" + dealer.moneyWon);
		}
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
	var dealerSide = $('.dealer-side');

	standButton.on('click', function () {
		$(".dealer-cards").removeClass('hidden');
		setTimeout(dealerDecisions, 3000);
	});
}

//Dealer
var dealer = {
	name: "Dealer",
	moneyWon: 0,
	hand: [],
	totalHand: 0,
	hasAce: false,
	numberOfAces: 0,
	tenAdded: false,
	tenSubtracted: false
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

function handleAce () {
	for (var i = 0; i < dealer.hand.length; i++) {
		if (dealer.hand[i].name === "ace") {
			dealer.hasAce = true;
		}
	}

	if (dealer.hasAce && dealer.tenAdded === false && dealer.totalhand <= 11) {
		dealer.totalHand += 10;
		dealer.tenAdded = true;
	} else if (dealer.tenAdded && dealer.tenSubtracted === false && dealer.totalHand > 21) {
		dealer.totalHand -= 10;
		dealer.tenSubtracted = true;
	} 
}

function dealerDecisions () {
	if (dealer.totalHand >= 17) {
		determineWinner();
	} else {
		while (dealer.totalHand < 17) {
			hit(dealer);
			dealer.totalHand += dealer.hand[dealer.hand.length - 1].value;
			handleAce();
		} 
		determineWinner();
	}
}

renderDealer();
addPlayer();
deal();
startOver();