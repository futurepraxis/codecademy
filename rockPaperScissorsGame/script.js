// Create array of valid game options
const options = ["rock", "paper", "scissors"];

// Pick a random option as the computer's choice
let computerChoice = options[Math.floor(Math.random() * 3)];
// console.log(`The first computer choice is ${computerChoice}`);

//Check if user wants to play 
let userWantsToPlay = false;

//Store user input
let userChoice;

//Win and lose messages to display to user
const userWinsMessage = "\n\n👍🏽 Congrats, you win!";
const computerWinsMessage = "\n\n😞 Sorry, the computer wins.";

//Keep track of game stats 
const stats = {
    user: {
        wins: 0,
        losses: 0,
        ties: 0,
        rock: 0,
        paper: 0,
        scissors: 0,
    },
    computer: {
        wins: 0,
        losses: 0,
        ties: 0,
        rock: 0,
        paper: 0,
        scissors: 0,

    }
};

// Let user start game
function startGame() {
    userWantsToPlay = true;
    playGame();
};

// Game Logic
function playGame() {
    while (userWantsToPlay == true) {
        //Prompt user input
        let userChoice = window.prompt("Choose: rock, paper, or scissors").toLowerCase();

        //Validate user input
        let validUserChoice;
        if (userChoice == null) {
            alert("Please enter a valid choice.");
        } else {
            if (options.includes(userChoice)) {
                validUserChoice = userChoice;
            } else {
                alert("Please enter a valid choice.");
            }
        };
        // console.log(`The user chose ${validUserChoice}`);

        //Determine winner and update game stats
        if (validUserChoice === computerChoice) {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + "\n\n 🫤 The game is tied.");
            stats.user.ties += 1;
            stats.computer.ties += 1;
        } else if (validUserChoice == "rock" && computerChoice == "scissors") {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + userWinsMessage);
            stats.user.wins += 1;
            stats.user.rock += 1;
            stats.computer.losses += 1;
            stats.computer.rock += 1;
        } else if (validUserChoice == "rock" && computerChoice == "paper") {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + computerWinsMessage);
            stats.user.losses += 1;
            stats.user.rock += 1;
            stats.computer.wins += 1;
            stats.computer.paper += 1;
        }
        else if (validUserChoice == "paper" && computerChoice == "rock") {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + userWinsMessage);
            stats.user.wins += 1;
            stats.user.paper += 1;
            stats.computer.losses += 1;
            stats.computer.rock += 1;
        } else if (validUserChoice == "paper" && computerChoice == "scissors") {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + computerWinsMessage);
            stats.user.losses += 1;
            stats.user.paper += 1;
            stats.computer.wins += 1;
            stats.computer.scissors += 1;
        } else if (validUserChoice == "scissors" && computerChoice == "rock") {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + computerWinsMessage);

            stats.user.losses += 1;
            stats.user.scissors += 1;
            stats.computer.wins += 1;
            stats.computer.rock += 1;
        } else if (validUserChoice == "scissors" && computerChoice == "paper") {
            alert(`You chose: ${validUserChoice} \nThe computer chose: ${computerChoice} ` + userWinsMessage);
            stats.user.wins += 1;
            stats.user.scissors += 1;
            stats.computer.losses += 1;
            stats.computer.paper += 1;
        } else {
            alert("Something went wrong.");
        };

        //Confirm if user wants to keep playing 
        if (confirm("Do you want to keep playing?") == true) {
            userWantsToPlay = true;
            //Computer selects a new choice
            computerChoice = options[Math.floor(Math.random() * 3)];
            // console.log(`The new computer choice is ${computerChoice}`);
        } else {
            userWantsToPlay = false;
            document.getElementById("gameStats").innerHTML = `
                <div class="col-12 col-lg-6 border border-4 mx-auto">
                <div class="row">
                    <div class="col-6 p-3 px-5 mx-auto border-end border-4 userStats">
                        <img src="assets/matthewBroderickWarGames.jpg" class="d-block mx-auto mb-3 rounded-circle shadow-md">
                        <h2 class="fw-bold text-center">You</h2>
                        <div class="d-flex justify-content-center p-3">
                            <ul>
                            <li><strong>💪 Wins:</strong>${stats.user.wins}</li>
                            <li><strong>😞 Losses:</strong>${stats.user.losses}</li>
                            <li><strong>🤷🏽‍♀️ Ties:</strong>${stats.user.ties}</li>
                            <li><strong>⁉️ Guesses:</strong></li>
                            <ul>
                                <li><strong>🪨 Rock:</strong>${stats.user.rock}</li>
                                <li><strong>🧻 Paper:</strong>${stats.user.paper}</li>
                                <li><strong>✂️ Scissors:</strong>${stats.user.scissors}</li>
                            </ul>
                        </ul>
                        </div>
                    </div>
                    <div class="col-6 p-3 px-5 mx-auto computerStats">
                        <img src="assets/wargamesComputer.jpg" class="d-block mx-auto mb-3 rounded-circle shadow-md">
                        <h2 class="fw-bold text-center">Computer</h2>
                        <div class="d-flex justify-content-center p-3">
                            <ul>
                            <li><strong>💪 Wins:</strong>${stats.computer.wins}</li>
                            <li><strong>😞 Losses:</strong>${stats.computer.losses}</li>
                            <li><strong>🤷🏽‍♀️ Ties:</strong>${stats.computer.ties}</li>
                            <li><strong>⁉️ Guesses:</strong></li>
                            <ul>
                                <li><strong>🪨 Rock:</strong>${stats.computer.rock}</li>
                                <li><strong>🧻 Paper:</strong>${stats.computer.paper}</li>
                                <li><strong>✂️ Scissors:</strong>${stats.computer.scissors}</li>
                            </ul>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>

                `
        }
    };
};