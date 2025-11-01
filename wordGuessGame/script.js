// Word bank
const words = ["javascript", "array", "loop", "variable"];
let chosenWord = null;

//Store masked word
let maskedWord = null;
let displayWord = null;

//Store split word
let splitWord = null;

// Track guessed letters and attempts
let guessedLetters = [];
let attempts = null;

//set up word for game
function createWord() {
    //Randomly select word
    chosenWord = words[Math.floor(Math.random() * words.length)];
    //Mask the word for game logic and UI
    maskedWord = Array(chosenWord.length).fill("_");
    displayWord = maskedWord.join("");
    //Split the word for game logic
    splitWord = chosenWord.split("");
    //Base number of attempts on length of word
    attempts = chosenWord.length + 3;
};
createWord();

//Show the masked word in the UI
document.getElementById("maskedWord").innerHTML = `${displayWord}`;
document.getElementById("attempts").innerHTML = `${attempts}`;

function updateUI() {
    let displayWord = maskedWord.join("");
    document.getElementById("maskedWord").innerHTML = `${displayWord}`;
    document.getElementById("attempts").innerHTML = `${attempts}`;
    let displayGuesses = guessedLetters.join(", ");
    document.getElementById("guessedLetters").innerHTML = `${displayGuesses}`;
}

// Log the chosen word for debugging
//console.log("Chosen word:", chosenWord);


// Reset game
function resetGame() {
    guessedLetters = [];
    const playButton = document.getElementById("playAgain");
    playButton.classList.add("d-none");
    createWord();
    updateUI();
};


// Start game when letter pressed
function startGame(letter) {
    console.log(`You pressed: ${letter}`);
    if (attempts !== 0) {
        //Store the guessed letter
        attempts--;
        guessedLetters.push(letter);
        console.log(`The guessed letters are: ${guessedLetters}`);

        //Check if letter is in word 
        if (splitWord.includes(letter)) {
            splitWord.forEach((char, index) => {
                if (char === letter) {
                    maskedWord[index] = letter;
                }
            });
            console.log("Correct!")
        } else {
            console.log("Wrong!")
        };
        if (!maskedWord.includes("_")) {
            document.getElementById("alert").innerHTML = `
                <div class="alert alert-success alert-dismissible fade show fs-5 mb-5" role="alert">
                    <strong>🎉 Congrats!</strong> You won!
                    <p class="text-center mt-3 fs-4">✅ 🙌 🥂</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            const playButton = document.getElementById("playAgain");
            playButton.classList.remove("d-none");
        };
        updateUI();

    } else {
        resetGame();
        document.getElementById("alert").innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show fs-5 mb-5" role="alert">
                <strong>😞 Sorry!</strong> You ran out of attempts.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    };
};

// ⌨️ Listen for keyboard input when the page loads
window.addEventListener("keydown", function (event) {
  let key = event.key.toLowerCase();

  // Only process alphabetic letters (ignore Shift, Enter, etc.)
  if (key.match(/^[a-z]$/)) {
    startGame(key);
  } else {
    console.log("Please press a valid letter (A-Z).");
  }
});
