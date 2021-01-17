
$(document).ready(function() {
  // Initial Variables
  sessionStorage.setItem("questions", JSON.stringify(quizQuestions));
  let fluidQuestions = JSON.parse(sessionStorage.getItem("questions"));
  let highScores = JSON.parse(localStorage.getItem("highScores"));
  let correctCount = 0;
  let incorrectCount = 0;
  let timeElapsed = 0;
  let timer = 0;

  let playerArray = [].slice.call ($(".playerList"));
  let correctArray = [].slice.call ($(".correctGuesses"));
  let incorrectArray = [].slice.call ($(".incorrectGuesses"));
  let elapsedArray = [].slice.call ($(".timeElapsed"));

  // Populates high scores.
  populateHS();

  // BUTTON: Begins the game
  $(".btn-begin").on("click", function() {
    randomizeButtons();
    // Sets initial time to 30 seconds.
    timerAdjust(30);
    // Initiates count down.
    gameTimer();
    // Hides opening screen and shows quiz screen.
    $("#stage1").attr("hidden", true);
    $("#stage2").attr("hidden", false);
    // Picks first question and randomizes answer order.
  });
  // END BUTTON

  // BUTTON: Selects user answer, checks if it's correct and applies appropriate logic, populate next question and answers.
  $(".btn-choice").on("click", function() {
    //Defines clicked button.
    const yourPick = parseInt($(this).val());
    //Checks to see if the answer clicked was the correct one.
    let _this = this;
    // Correct Answer: Correct count +1, +3 seconds to timer, flash button Green.
    if (yourPick === 0) {
        $(_this).addClass("correct");
        correctCount++;
        timerAdjust(3);
      // Incorrect Answer: Incorrect count +1, -5 seconds to timer, flash button Red.
      } else {
        $(_this).addClass("incorrect");
        incorrectCount++;
        timerAdjust(-5);
        };
    // Pick next question randomly and randomize answer order.
    randomizeButtons();
    //Delays for a moment to show correct/incorrect formatting.
    setTimeout(function(){
      // Resets clicked button to original color.
      if (yourPick === 0) {
        $(_this).removeClass("correct");
        } else {
          $(_this).removeClass("incorrect");
      };
    }, 100);
  });
  // END BUTTON

  // FUNCTION: Countdown timer. At time <= 0, iniate GameOver.
  function gameTimer() {
    let interval = setInterval(function() {
      if (parseInt(timer) <= 0) {
        clearInterval(interval);
      } else {
          timeElapsed++;
          timerAdjust (-1);
        }
    }, 1000);
  };
  // END FUNCTION

  // FUNCTION: Adjust game timer. The reason this is a seperate function than gameTimer() is because I wanted the display to update to the new time immediately when a user clicks a button instead of waiting for an interval countdown.
  function timerAdjust (adjustment) {
    // Adds (or subtracts for negative parameters) time to timer.
    timer = timer + adjustment;
    //Ends game and stops timer if time <= 0.
    if (parseInt(timer) <= 0) {
      gameOver();
      // Updates game timer display. If time is <= 10 seconds, increase font and change color to red.
    } else {
      $("#timer").text("Time Remaining: " + timer);
      if (parseInt(timer) <= 10) {
        $("#timer").addClass("timer-warning");
      } else {
        $("#timer").removeClass("timer-warning");
        };
    };
  };
  // END FUNCTION

  // FUNCTION: Game over function. Hides quiz screen, shows Game Over screen, populates records score.
  function gameOver() {
    $(".btn-choice").removeClass("correct");
    $(".btn-choice").removeClass("incorrect");
    $("#stage2").attr("hidden", true);
    $("#stage1").attr("hidden", false);
    sessionStorage.setItem("questions", JSON.stringify(quizQuestions));
    // If no highscore yet recorded, create a new JSON object and populate. timeOut present to allow JQuery to process before alert pops.
    setTimeout(function(){
      if(!highScores) {
        let player = prompt("GAME OVER: Please input your name to record highscore:");
        if (player != null) {
          highScores = {entries: [{player: "",correct: "",incorrect: "",elapsed: ""}]};
          highScores.entries[0].player = player;
          highScores.entries[0].correct = correctCount;
          highScores.entries[0].incorrect = incorrectCount;
          highScores.entries[0].elapsed = timeElapsed;
        }
       // If highscore present, push new score into JSON object. Sorts by Correct Answers, then Incorrect Answers, then Time Elapsed.
      } else {
          for (let i = 0; i < 10; i++) {
            // If Entry is Null, Push entry into array.
            if ( !highScores.entries[i] ) {
              let player1 = prompt("GAME OVER: Please input your name to record highscore:");
              if (player1 != null) {
                highScores['entries'].push({"player":player1,"correct":correctCount,"incorrect":incorrectCount,"elapsed":timeElapsed});
              }
              i = 11;
              // Sorts current entry into array based on Correct Answers, Incorrect Answers, and Seconds Elapsed.
            } else {
                // Variables parsed as Integers.
                let wCorrect = parseInt(highScores.entries[i].correct);
                let wIncorrect = parseInt(highScores.entries[i].incorrect);
                let wElapsed = parseInt(highScores.entries[i].elapsed);
                // Switch logic.
                switch(true) {
                  case wCorrect > parseInt(correctCount):
                    break;
                  case wCorrect === parseInt(correctCount) && wIncorrect < parseInt(incorrectCount):
                    break;
                  case wCorrect === parseInt(correctCount) && wIncorrect === parseInt(incorrectCount) && wElapsed < parseInt(timeElapsed):
                    break;
                  default:
                    let player2 = prompt("GAME OVER: Please input your name to record highscore:");
                    if (player2 != null) {
                      highScores['entries'].splice(i, 0, {"player":player2,"correct":correctCount,"incorrect":incorrectCount,"elapsed":timeElapsed});
                    }
                    i = 11;
                }
              }
          if (i === 10) alert("GAMEOVER: You did not qualify for a higherscore.")}
        }
      // Local storage JSON object.
      highScores['entries'].splice(10,1);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      // Populate High Score.
      populateHS();
      location.reload;
    }, 100);
  };
  // END FUNCTION

  // FUNCTION :An array of the unused questions is passed in to this function, which then selects a random question from that array,splices it out so it won't be seen again, and randomizes the order of the answers seen on screen
  function randomizeButtons() {
    // Function variables
    fluidQuestions = JSON.parse(sessionStorage.getItem("questions"));
    let questionsLeft = fluidQuestions.questions.length;
    if (questionsLeft === 0) {
      gameover();
    } else {
        let randomQNum =  Math.floor(Math.random() * questionsLeft);
        let arrLoc = [0, 1, 2, 3];
        let arrNum = [0, 1, 2, 3];
        let buttonArray = [].slice.call ($(".btn-choice"));
        let answerArray = [].slice.call ($(".answerChoice"));
        // Randomizes the order of arrLoc in order to randomize the order of the buttons on the screen.
        arrLoc.forEach(function(elem, i, arr) {
          let Length = arrNum.length;
          let rand = Math.floor(Math.random() * Length);
          arr[i] = arrNum[(rand)];
          arrNum.splice((rand), 1);
        }, arrNum);
        // 1. Sets the next question and removes the current Question from the array.
        // 2. Sets the answers in a random order.
        $("#quizQuestion").text(fluidQuestions.questions[randomQNum].question);
        buttonArray.forEach(function(elem, i) {
          $(elem).val(parseInt(arrLoc[i]));
          $(answerArray[i]).text(fluidQuestions.questions[randomQNum].answers[arrLoc[i]]);
        });
        // Removes used questions from the question pool.
        fluidQuestions.questions.splice(randomQNum, 1);
        sessionStorage.setItem("questions", JSON.stringify(fluidQuestions));
      }
  };
  // END FUNCTION

  // FUNCTION: Populate the high score table.
  function populateHS() {
    if (highScores) {
      let hsLength = highScores.entries.length;
      for(let i = 0; i < hsLength; i++) {
        playerArray[i].innerText = highScores.entries[i].player;
        correctArray[i].innerText = highScores.entries[i].correct;
        incorrectArray[i].innerText = highScores.entries[i].incorrect;
        elapsedArray[i].innerText = highScores.entries[i].elapsed;
      }
    }
  }
  // END FUNCTION

});




