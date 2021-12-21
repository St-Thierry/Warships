//this object takes care of messages to the players
var view = {
	displayMessage: function(msg) {//this method takes care of any msg we might need to update our user with
	var messageArea = document.getElementById("messageArea");
	messageArea.innerHTML = msg;//we deal with the 'msg' literal later
},

displayHit: function(location) {//whenever the player makes a hit, this jumps right in
	var cell = document.getElementById(location);
	cell.setAttribute("class", "hit");
},

displayMiss: function(location) {//this displays a msg whenever the player misses a guess
	var cell = document.getElementById(location);
	cell.setAttribute("class", "miss"); 	
	}
};

var model = {
	shipEval: 0, //shipEval is a variable to keep track of the index of the three ships being currently evaluated
	numShips: 3, //idea here is to prevent hardcoding of the number of ships
	ships: 	[{locations: ["06", "16", "26"], hits: ["", "", ""] },
			{locations: ["24", "34", "44"], hits: ["", "", ""] },
			{locations: ["10", "11", "12"], hits: ["", "", ""] }],
	
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
				this.ships[i].locations = locations;
			}
		},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		if (direction === 1) {
		// Generate a starting location for a horizontal ship
		} else {
		// Generate a starting location for a vertical ship
		}

		var newShipLocations = [];
			for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
			// add location to array for new horizontal ship
			newShipLocations.push(row + "" + (col + i));
			} else {
			// add location to array for new vertical ship
			newShipLocations.push(row + "" + (col + i));
			}
		}
			return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
		for (var j = 0; j < locations.length; j++) {
			if (ship.locations.indexOf(locations[j]) >= 0) {
		return true;
				}
			}
		}
			return false;
	},

	fire: function(guess) {
 		for (var i = 0; i < this.numShips; i++) {
 			var ship = this.ships[i];
 			var index = ship.locations.indexOf(guess);
 			if (index >= 0) {
				 ship.hits[index] = "hit";
				 view.displayHit(guess);
				 view.displayMessage("HIT!");
				 if (this.isSunk(ship)) {
					 view.displayMessage("You sank my battleship!");
					 this.shipsSunk++;
				 }
				 return true;
				 }
			 }
			view.displayMiss(guess);
 			view.displayMessage("You missed.");
 			return false;
		 },
 		isSunk: function(ship) {
 			for (var i = 0; i < this.shipLength; i++) {
 				if (ship.hits[i] !== "hit") {
 					return false;
 				}
 			}
 			return true;
 		}
 	};
 
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} 
	else {
		firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
			if (isNaN(row) || isNaN(column)) {
				alert("Oops, that isn't on the board.");
			} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
			} else {
				return row + column;
			}
		}
			return null;
		}

var controller = {
		guesses: 0,
		processGuess: function(guess) {
			var location = parseGuess(guess);
				if (location) {
					this.guesses++;
					var hit = model.fire(location);
					if (hit && model.shipsSunk === model.numShips) {
						view.displayMessage("You sank all my battleships, in " +
						this.guesses + " guesses");
					}
				}
			}
		};

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}



model.fire("53"); 