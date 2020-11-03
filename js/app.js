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