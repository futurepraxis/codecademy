//Let user choose to start game
// let startGame = false

//Store user guesses
let userGuess;

//Set limit on attempts
const attemptLimit = 3;
let attemptsRemaining = null;

//Keep track of game stats
const stats = {
    numOfGuesses: 0,
    numbersGuessed: [],
};

function updateStats() {
    stats.numOfGuesses += 1;
    stats.numbersGuessed.push(userGuess);
};

function resetStats() {
    stats.numOfGuesses = 0;
    stats.numbersGuessed = [];
}

//Update UI with Stats
function updateUI() {
    if (stats.numOfGuesses >= attemptLimit) {
        document.getElementById("gameStats").innerHTML = `
        <div class="col-6 p-3 px-5 mx-auto">
            <h2 class="fw-bold text-center">😞 Sorry, you ran out of attempts.</h2>
        </div>
        `
    } else {
        document.getElementById("gameStats").innerHTML = `
                <div class="col-3 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h2>📈 Stats</h2>
                </div>
                <div class="card-body">
                    <ul>
                        <li><strong>❓ Number of Guesses:</strong> ${stats.numOfGuesses}</li>
                        <li><strong>👤 You Guessed:</strong> ${stats.numbersGuessed}</li>
                    </ul>
                </div>
            </div>
        </div>
    `
    }
};

function playHighLowGame() {
    startGame = true;
    resetStats();
    //generate a random number
    const randomNum = Math.floor(Math.random() * 101);
    //console.log(`The random number is ${randomNum}`);
    while (startGame && stats.numOfGuesses < attemptLimit) {
        //keep track of attempts
        attemptsRemaining = (attemptLimit - stats.numOfGuesses);
        //prompt user for guess
        userGuess = parseInt(window.prompt(`I'm thinking of a number between 1 and 100. What's your guess? \n\n You have ${attemptsRemaining} attempts left.`));
        //console.log(`This is attempt #${stats.numOfGuesses}`);
        
        //check if input is valid
        if (isNaN(userGuess)) {
            alert("Please enter a valid choice.");
        } else {
            //game logic
            if (userGuess > randomNum) {
                updateStats(userGuess);
                if (userGuess <= (randomNum + 5)) {
                    alert("👀 That's close, but just a little high!")
                } else {
                    alert(`⬆️ Sorry, your guess is too high. Try again.`);
                }
            } else if (userGuess < randomNum) {
                updateStats(userGuess);
                if (userGuess >= (randomNum - 5)) {
                    alert("👀 That's close, but just a little low!")
                } else {
                    alert(`⬇️ Sorry, your guess is too low. Try again`);
                }
            } else if (userGuess === randomNum) {
                alert("✅ 🎯 👊 \n\n Congrats! You guessed correctly!");
                updateStats(userGuess);
                if (confirm("Do you want to play again?")) {
                    playHighLowGame();
                } else {
                    startGame = false;
                    updateUI();
                };
            };
        };
    };
    //alert user they ran out of attempts
    if (stats.numOfGuesses >= attemptLimit) {
        alert("Sorry, you ran out of attempts.")
        updateUI();
    };
};