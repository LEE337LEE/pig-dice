const ScoreToReach = 100;
var scores, roundScore, activePlayer, gamePlaying;

$(document).ready(function () {
  // reset scores
  init();

  $(".btn-roll").click(function () {
    if (gamePlaying) {
      // 1. Random number
      var rarerifyOne = Math.random() * (1.9 - 1.5) + 1.5;
      var dice = Math.floor(Math.random() * (6 - rarerifyOne) + rarerifyOne);

      // 2. Display the result 1
      var diceDOM = $(".dice");
      diceDOM.removeClass("hidden");
      diceDOM.attr("src", `img/dice-${dice}.png`);

      // 3. Update the round score IF the rolled number was NOT 1
      if (dice !== 1) {
        // Add round score
        roundScore += dice;
        $(`#current-${activePlayer}`).text(roundScore);
      } else {
        nextPlayer(1000);
      }
    }
  });
   // Add players current score to global score
   $(".btn-hold").click(function () {
    if (gamePlaying) {
      // add current score to global score
      scores[activePlayer] += roundScore;

      // update the ui
      $(`#score-${activePlayer}`).text(scores[activePlayer]);

      // Check if player won the game
      if (scores[activePlayer] >= ScoreToReach) {
        $(`#name-${activePlayer}`).text("Winner!");
        $(".dice").addClass("hidden");
        $(`.player-${activePlayer}-panel`).addClass("winner");
        $(`.player-${activePlayer}-panel`).removeClass("active");
        gamePlaying = false;
      } else {
        // next player with minimun delay
        nextPlayer(100);
      }
    }
  });

  // setting the init function as callback
  $(".btn-new").click(init);
});

function nextPlayer(theTimeout) {
  // debugger;
  // switch players
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // Show zeros on scores
  $("#current-0").text(0);
  $("#current-1").text(0);

  // Activate new player's board
  $(".player-0-panel").toggleClass("active");
  $(".player-1-panel").toggleClass("active");

  // Find all the cubes
  var dice = $(".dice");

  // hide the dices
  setTimeout(function () {
    dice.addClass("hidden");
    // make the ROLL DICE button working again
    $(".btn-roll").removeProp("disabled");
  }, theTimeout);
}

function init() {
  scores = [0, 0];
  activePlayer = 0; // current round score for each player
  roundScore = 0;
  gamePlaying = true;
   // Hide the dice before any rolls
   $(".dice").addClass("hidden");
   $("#score-0").text("0");
   $("#score-1").text("0");
   $("#current-0").text("0");
   $("#current-1").text("0");
   $("#name-0").text("Player 1");
   $("#name-1").text("Player 2");
   $(".player-0-panel").removeClass("winner");
   $(".player-1-panel").removeClass("winner");
   $(".player-0-panel").removeClass("active");
   $(".player-1-panel").removeClass("active");
   $(".player-0-panel").addClass("active");
 }
 
 // Clear entire player's score
 function dropPlayersScore() {
   scores[activePlayer] = 0;
   $("#score-" + activePlayer).text(0);
 }
 