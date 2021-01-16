
$(document).ready(function() {
  $("#stage2").attr("hidden", true);
  $("#stage3").attr("hidden", true);
  $("#stage1").attr("hidden", false);

  // Initial Variables
  let highScores = new Array(9999);
  let correctCount = 0;

  //Begins the game
  $(".btn-begin").on("click", function() {

    $("#stage1").attr("hidden", true);
    $("#stage2").attr("hidden", false);
    
    let fluidQuestions = quizQuestions;
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
      } else {
        $(lockThis).addClass("incorrect");
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
});

function randomizeButtons(questionsArr) {
  let arrLoc = [0, 1, 2, 3];
  let arrNum = [0, 1, 2, 3];
  arrLoc.forEach(function(elem, i, arr) {
    let Length = arrNum.length;
    let rand = Math.floor(Math.random() * Length);
    arr[i] = arrNum[(rand)];
    arrNum.splice((rand), 1);
  }, arrNum);

  // Console Log Stuff
    // console.log(arrLoc);

  // More Variables
  let questionsLeft = questionsArr.questions.length;
  let randomQNum =  Math.floor(Math.random() * questionsLeft);
  let buttonCollection = $(".btn-choice");
  let answerCollection = $(".answerChoice");

  // Turn the collections into Arrays.
  let buttonArray = [].slice.call (buttonCollection);
  let answerArray = [].slice.call (answerCollection);

  // Console Log Stuff
    // console.log(buttonArray);
    // console.log(answerArray);

  // Sets the next question and removes the current Question from the array.
  $("#quizQuestion").text(questionsArr.questions[randomQNum].question);
    buttonArray.forEach(function(elem, i) {
      $(elem).val(parseInt(arrLoc[i]));
      $(answerArray[i]).text(questionsArr.questions[randomQNum].answers[arrLoc[i]]);
      console.log(questionsArr.questions[randomQNum].answers[arrLoc[i]]);
    });

    questionsArr.questions.splice(randomQNum, 1);

    return questionsArr;
};
