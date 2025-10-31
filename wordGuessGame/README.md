# 🧠 Word Guess Game — Keyboard Typing Challenge (28-Stu_WordGuess)

Work to complete an interactive **Word Guess Game** where players type letters on their keyboard to guess a hidden coding term or a topic of your choosing.

---

## 👤 User Story

> **As a player,**  
> I want to guess a hidden programming term by typing letters,  
> so that I can practice JavaScript while having fun.

---

## ✅ Acceptance Criteria

- **It’s done when** the player can type any letter on their keyboard to make a guess.  
- **It’s done when** correct letters are revealed in the masked word.  
- **It’s done when** incorrect guesses reduce the player’s remaining attempts.  
- **It’s done when** the game detects a win when all letters are guessed.  
- **It’s done when** the game detects a loss when attempts reach zero.  
- **It’s done when** a new random word is selected after a win or loss.  

---

## 🧱 Your Task

You’ve been provided an HTML file styled with Bootstrap and a JavaScript starter that includes:
- A **keyboard event listener** that triggers on key press  
- A **word bank** of coding-related terms or otherwise (your choice) (e.g., `"javascript"`, `"array"`, `"loop"`)  
- Empty placeholder text for the masked word, guessed letters, and attempts  

Your task is to complete the logic inside the provided function to:
1. Update the masked word display as the player guesses letters.  
2. Track guessed letters and prevent duplicates.  
3. Subtract from the total attempts for incorrect guesses.  
4. Show a win or loss alert and restart the game.  
5. Update the DOM dynamically so the page reflects the current game state.

---

## 💡 Hints

- Use `.split("")` and `.map()` to rebuild the masked word.  
- Use `.includes()` to check for duplicates and correct guesses.  
- Convert all letters to lowercase before comparison.  
- Use the **Bootstrap IDs** in the HTML to update the text (`maskedWord`, `attempts`, `guessedLetters`).  
- Log values in the console for debugging (`console.log(chosenWord)` is okay for testing).  

---

## 🧠 Bonus Challenges

- Add sound effects for correct and incorrect guesses.  
- Add a restart button that refreshes the word without reloading the page.  
- Display a short success animation when the word is guessed.  
- Add categories (e.g., “JavaScript Terms,” “Web Concepts,” etc.).  

---

## ✅ Quick Checklist

- [ ] Typing letters updates the masked word  
- [ ] Attempts decrease with wrong guesses  
- [ ] Game resets after win/loss  
- [ ] DOM updates dynamically  
- [ ] (Bonus) Added restart or sound effects  
