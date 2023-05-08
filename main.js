( function () {
	const CHOICES = [ 'Rock', 'Paper', 'Scissors' ];

	function capitalizeString( str ) {
		const firstChar = str[ 0 ].toUpperCase();
		const restOfStr = str.slice( 1 ).toLowerCase();
		const capitalizedStr = firstChar + restOfStr;

		return capitalizedStr;
	}

	function getPlayerChoice() {
		let choice;

		while ( !CHOICES.includes( choice ) ) {
			choice = capitalizeString( prompt( 'Enter your choice' ) ).trim();
		}

		return choice;
	}

	function getComputerChoice() {
		const randomIndex = Math.floor( Math.random() * CHOICES.length );
		const randomChoice = CHOICES[ randomIndex ];

		return randomChoice;
	}

	function playRound( playerSelection, computerSelection ) {
		let roundOutcome;
		const winningMoves = {
			rock: 'Scissors',
			paper: 'Rock',
			scissors: 'Paper'
		};

		if ( playerSelection === computerSelection ) {
			roundOutcome = 'tie';
		} else if ( winningMoves[ playerSelection.toLowerCase() ] === computerSelection ) {
			roundOutcome = 'player';
		} else {
			roundOutcome = 'computer';
		}

		return roundOutcome;
	}

	function displayRoundOutcome( roundOutcome, playerSelection, computerSelection ) {
		if ( roundOutcome === 'player' ) {
			console.log( `You Win! ${playerSelection} beats ${computerSelection}` );
		} else if ( roundOutcome === 'computer' ) {
			console.log( `You Lose! ${computerSelection} beats ${playerSelection}` );
		} else {
			console.log( `It's a Tie! You both chose ${playerSelection}` );
		}
	}

	function displayResults( playerScore, computerScore ) {
		// Horizontal '-' rule.
		console.log( '-'.repeat( 50 ) );

		if ( playerScore > computerScore ) {
			console.log( 'Player Wins!' );
		} else if ( playerScore < computerScore ) {
			console.log( 'Computer Wins!' );
		} else {
			console.log( 'It\'s a Tie!' );
		}

		console.log( `Player: ${playerScore} - Computer: ${computerScore}` );
	}

	function updateScores( roundOutcome, playerScore, computerScore ) {
		if ( roundOutcome === 'player' ) {
			playerScore++;
		} else if ( roundOutcome === 'computer' ) {
			computerScore++;
		}

		return { playerScore: playerScore, computerScore: computerScore };
	}

	function game() {
		const numOfRounds = 5;
		let playerScore = 0, computerScore = 0;

		for ( let i = 0; i < numOfRounds; i++ ) {
			const playerSelection = getPlayerChoice();
			const computerSelection = getComputerChoice();
			const roundOutcome = playRound( playerSelection, computerSelection );

			( { playerScore, computerScore } = updateScores(
				roundOutcome, playerScore, computerScore
			) );

			displayRoundOutcome( roundOutcome, playerSelection, computerSelection );
		}

		displayResults( playerScore, computerScore );
	}

	game();
}() );
