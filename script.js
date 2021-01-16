$(document).ready(function() {
  $("#stage2").attr("hidden", true);
  $("#stage3").attr("hidden", true);
  $("#stage1").attr("hidden", false);

  // Initial Variables
  let fluidQuestions = quizQuestions;
  let highScores = new Array(9999);
  let correctCount = 0;
  let incorrectCount = 0;
  let timer = 0;

  //Begins the game
  $(".btn-begin").on("click", function() {

    timerAdjust(30);
    gameTimer();

    $("#stage1").attr("hidden", true);
    $("#stage2").attr("hidden", false);

    fluidQuestions = randomizeButtons(fluidQuestions);
  });

  // Creates the on click event and executes on Answer Click function.
  $(".btn-choice").on("click", function() {

    //Defines clicked button.
    const yourPick = parseInt($(this).val());

    //Checks to see if the answer clicked was the correct one.
    let lockThis = this;
    if (yourPick === 0) {
        $(lockThis).addClass("correct");
        correctCount++;
        timerAdjust(3);

      } else {
        $(lockThis).addClass("incorrect");
        timerAdjust(-5);
    };
    
    //Delays for a moment to show correct/incorrect formatting.
    setTimeout(function(){

      fluidQuestions = randomizeButtons(fluidQuestions);

      // Resets Correct/Incorrect
      if (yourPick === 0) {
        $(lockThis).removeClass("correct");
        } else {
          $(lockThis).removeClass("incorrect");
      };
    }, 100);
  });

  function gameTimer() {
    let interval = setInterval(function() {
      if (parseInt(timer) <= 0) {
        clearInterval(interval);
        gameOver();
      } else {
          timerAdjust (-1);
        }
    }, 1000);

  };

  function timerAdjust (adjustment) {
    timer = timer + adjustment;
    if (parseInt(timer) <= 0) {
      clearInterval(interval);
      gameOver();
    } else {
      $("#timer").text("Time Remaining: " + timer);
      if (parseInt(timer) <= 10) {
        $("#timer").addClass("timer-warning");
      } else {
        $("#timer").removeClass("timer-warning");
        };
    };
  };

  function gameOver() {
    $("#stage2").attr("hidden", true);
    $("#stage3").attr("hidden", false);
  };

  // An array of the unused questions is passed in to this function, which then selects a random question from that array,splices it out so it won't be seen again, and randomizes the order of the answers seen on screen
  function randomizeButtons(questionsArr) {

    // Function variables
    let questionsLeft = questionsArr.questions.length;
    let randomQNum =  Math.floor(Math.random() * questionsLeft);
    let arrLoc = [0, 1, 2, 3];
    let arrNum = [0, 1, 2, 3];
    let buttonCollection = $(".btn-choice");
    let answerCollection = $(".answerChoice");
      // Turn the collections into Arrays.
      let buttonArray = [].slice.call (buttonCollection);
      let answerArray = [].slice.call (answerCollection);

    // Randomizes the order of arrLoc in order to randomize the order of the buttons on the screen.
    arrLoc.forEach(function(elem, i, arr) {
      let Length = arrNum.length;
      let rand = Math.floor(Math.random() * Length);
      arr[i] = arrNum[(rand)];
      arrNum.splice((rand), 1);
    }, arrNum);

    // 1. Sets the next question and removes the current Question from the array.
    // 2. Sets the answers in a random order.
    $("#quizQuestion").text(questionsArr.questions[randomQNum].question);
    buttonArray.forEach(function(elem, i) {
      $(elem).val(parseInt(arrLoc[i]));
      $(answerArray[i]).text(questionsArr.questions[randomQNum].answers[arrLoc[i]]);
    });

    questionsArr.questions.splice(randomQNum, 1);

      console.log(arrLoc);
      return questionsArr;
  };

});




