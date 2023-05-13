( function () {
	const gameStats = {
		roundsPlayed: 0,
		player: { score: 0 },
		computer: { score: 0 }
	};
	const buttons = document
		.querySelector( '.choices-wrapper' )
		.querySelectorAll( 'button' );

	function getComputerChoice() {
		const CHOICES = [ 'rock', 'paper', 'scissors' ];
		const randomIndex = Math.floor( Math.random() * CHOICES.length );
		const randomChoice = CHOICES[ randomIndex ];

		return randomChoice;
	}

	function playRound( playerSelection, computerSelection ) {
		let roundOutcome;
		const winningMoves = {
			rock: 'scissors',
			paper: 'rock',
			scissors: 'paper'
		};

		if ( playerSelection === computerSelection ) {
			roundOutcome = 'tie';
		} else if ( winningMoves[ playerSelection ] === computerSelection ) {
			roundOutcome = 'player';
		} else {
			roundOutcome = 'computer';
		}

		return roundOutcome;
	}

	function capitalizeString( str ) {
		const firstChar = str[ 0 ].toUpperCase();
		const restOfStr = str.slice( 1 ).toLowerCase();
		const capitalizedStr = firstChar + restOfStr;

		return capitalizedStr;
	}

	function displayRoundOutcome( roundOutcome, playerSelection, computerSelection, stats ) {
		let roundOutcomeHeaderDisplay = document.querySelector( '.round-result-header' );
		let roundOutcomeDisplay = document.querySelector( '.round-result' );

		if ( !roundOutcomeHeaderDisplay && !roundOutcomeDisplay ) {
			const container = document.querySelector( '.container' );

			roundOutcomeHeaderDisplay = document.createElement( 'p' );
			roundOutcomeDisplay = document.createElement( 'p' );

			roundOutcomeHeaderDisplay.classList.add( 'round-result-header' );
			roundOutcomeDisplay.classList.add( 'round-result' );

			container.appendChild( roundOutcomeHeaderDisplay );
			container.appendChild( roundOutcomeDisplay );
		}

		roundOutcomeHeaderDisplay.textContent = `Round ${stats.roundsPlayed}`;

		if ( roundOutcome === 'player' ) {
			roundOutcomeDisplay.textContent = 'You Win! ' +
				`${capitalizeString( playerSelection )} beats ${computerSelection}`;
		} else if ( roundOutcome === 'computer' ) {
			roundOutcomeDisplay.textContent = 'You Lose! ' +
				`${capitalizeString( computerSelection )} beats ${playerSelection}`;
		} else {
			roundOutcomeDisplay.textContent = `It's a Tie! You both chose ${playerSelection}`;
		}
	}

	function displayResetLink() {
		const container = document.querySelector( '.container' );
		const link = document.createElement( 'a' );

		link.setAttribute( 'href', '' );
		link.classList.add( 'restart-link' );
		link.textContent = 'Restart game';

		container.appendChild( link );
	}

	function displayResult( stats ) {
		const container = document.querySelector( '.container' );
		const resultDisplay = document.createElement( 'p' );

		resultDisplay.classList.add( 'game-result' );

		if ( stats.player.score > stats.computer.score ) {
			resultDisplay.textContent = 'Player Wins!';
		} else if ( stats.player.score < stats.computer.score ) {
			resultDisplay.textContent = 'Computer Wins!';
		} else {
			resultDisplay.textContent = 'It\'s a Tie!';
		}

		container.appendChild( resultDisplay );
		displayResetLink();
	}

	function updateScores( stats, roundOutcome ) {
		stats.roundsPlayed++;

		if ( roundOutcome !== 'tie' ) {
			stats[ roundOutcome ].score++;
		}
	}

	function displayScores( stats ) {
		const playerScoreDisplay = document.getElementById( 'player-score' );
		const computerScoreDisplay = document.getElementById( 'computer-score' );

		playerScoreDisplay.textContent = stats.player.score;
		computerScoreDisplay.textContent = stats.computer.score;
	}

	function game( playerSelection, stats ) {
		const computerSelection = getComputerChoice();
		const roundOutcome = playRound( playerSelection, computerSelection );

		updateScores( stats, roundOutcome );

		displayScores( stats );
		displayRoundOutcome( roundOutcome, playerSelection, computerSelection, stats );

		if ( stats.roundsPlayed === 5 ) {
			buttons.forEach( button => {
				button.disabled = true;
			} );

			displayResult( stats );
		}
	}

	buttons.forEach( button => {
		button.addEventListener( 'click', () => {
			game( button.value, gameStats );
		} );
	} );
}() );
