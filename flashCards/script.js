// Flash Card — Unsolved with Boostrap Starter code

(function () {
  'use strict';

  // Starter data (You can replace with your own topic)
  var cards = [
    { front: 'What does DOM stand for?', back: 'Document Object Model' },
    { front: 'Select a single element?', back: 'document.querySelector' },
    { front: 'Add a click listener?', back: "element.addEventListener('click', handler)" }
  ];

  // State
  var current = 0;
  var showingFront = true;

  // Elements
  var flashcardEl = document.getElementById('flashcard');
  var cardTextEl = document.getElementById('card-text');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var flipBtn = document.getElementById('flip-btn');

  // Optional UI
  var counterEl = document.getElementById('counter');
  var progressBarEl = document.getElementById('progress-bar');
  var percentLabelEl = document.getElementById('percent-label');
  var sideBadgeEl = document.getElementById('side-badge');

  // --- Render function (front/back text + basic counter) ---
  function render() {
    var c = cards[current];
    cardTextEl.textContent = showingFront ? c.front : c.back;

    // Counter is implemented so you can see effect of prev/next
    if (counterEl) {
      counterEl.textContent = (current + 1) + ' of ' + cards.length;
    }

    // TODO: Update progress width (percent complete)
  
    // TODO: Update side badge to "Front" / "Back"
  }

  // --- Prev/Next: fully implemented with wrap-around ---
  function goNext() {
    current = (current + 1) % cards.length; // wrap to 0
    showingFront = true; // reset to front when moving to a new card
    render();
  }

  function goPrev() {
    current = (current - 1 + cards.length) % cards.length; // wrap to last
    showingFront = true; // reset to front when moving to a new card
    render();
  }

  // --- Events: Prev/Next wired for students to build on ---
  nextBtn.addEventListener('click', function () {
    goNext();
  });

  prevBtn.addEventListener('click', function () {
    goPrev();
  });

  // TODO: Flip behavior (click card or Flip button to toggle front/back)


  // TODO: Keyboard shortcuts: ArrowRight = next, ArrowLeft = prev, Space/Enter = flip

  // Initial render
  render();
})();
