/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {
	var winningNumber;
	var numberGuesses;
	var guessesArray;
	init();

	function init(){ 
		winningNumber = generateWinningNumber();
		console.log(winningNumber);
		numberGuesses = 0;
		guessesArray =[];
	};


	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		return Math.floor((Math.random() * 100) + 1);

	};

	// Fetch the Players Guess

	function playersGuessSubmission(){
		// add code here
		var input = $('#question').val(); 
		var intInput = parseInt(input, 10);

		if(input == intInput.toString(10)){
			checkGuess(intInput); 
			$('#question').val("");
		} else {
			$('#message').html('Please enter a number');
		}
		
	};

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(playersGuess){
		// add code here
		var distanceDirection= {};
		var distance = Math.abs(winningNumber-playersGuess);

		if(distance <= 10){
			distanceDirection.guessDistance = 10;
		} else if(distance <= 20){
			distanceDirection.guessDistance = 20;
		} else if(distance <= 30){
			distanceDirection.guessDistance = 30;
		} else if(distance <= 60){
			distanceDirection.guessDistance = 60;
		} else if(distance <= 99){
			distanceDirection.guessDistance = 99;
		}

		if(playersGuess < winningNumber){
			distanceDirection.guessDirection = "lower";		

		} else if (playersGuess > winningNumber) {
			distanceDirection.guessDirection = "higher";
		}

		return distanceDirection;
	};

	// Check if the Player's Guess is the winning number 

	function checkGuess(playersGuess){
		// add code here
		if(playersGuess > 100 || playersGuess < 0){
			$('#message').html('Please choose a number in range');
		
		} else if(playersGuess === winningNumber){
			$('#message').html('Your guess is correct!');
			$('#submit_button').prop('disabled', true);
			$('#hint').prop('disabled', true);
			$('body, .header').addClass('winner');
			$('.main-content').append('<img src="winner.png" id= "winnerImage" alt="winner">')

		} else {
			
			 if(!guessesArray.includes(playersGuess)){
				numberGuesses++;
				guessesLeft = 6 - numberGuesses;
				guessesArray.push(playersGuess);
				$('#message').html(guessMessage(playersGuess));
					if(numberGuesses > 5){
						$('#message').html("Sorry you're out of guesses!");
						$('#question').prop('disabled', true);
						
					$('body, .header, .main-content').addClass('loser');
					}

			} else {
				$('#message').html("You already guessed that number.");
			}
			
		}

	};

	function guessMessage(playersGuess){
		var distanceDirection = lowerOrHigher(playersGuess);

		$('#message').html("Your guess is "  + distanceDirection.guessDirection + " and within " + distanceDirection.guessDistance + " of the winning number. You have " + guessesLeft +" guesses left.");
	};
	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		// add code here
		var hintArray = [];
		var hintOne = Math.floor((Math.random() * 100) + 1);
		var hintTwo = Math.floor((Math.random() * 100) + 1);

		hintArray.push(hintOne, hintTwo, winningNumber);

		$('#message').html("The winning number is one of these: " + hintArray);

	};

	// Allow the "Player" to Play Again

	function playAgain(){
		// add code here
		init();
		$('body, .header, .main-content').removeClass('loser');
		$('body, .header, .main-content').removeClass('winner');
		$('#message').html("");
		$('#winnerImage').detach();
			$('#submit_button').prop('disabled', false);
			$('#hint').prop('disabled', false);
			$('#question').prop('disabled', false);

	};


	/* **** Event Listeners/Handlers ****  */

	$('#submit_button').on('click', function(){
		playersGuessSubmission();
				
	});

	$('#hint').on('click', function(){
		provideHint();

	});	

	$('#new-game').on('click', function(){
		playAgain();
	});

	$('#question').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			event.preventDefault();
	    	playersGuessSubmission();  
		}
	});

});
