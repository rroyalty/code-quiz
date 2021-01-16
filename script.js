
//JSON Object full of questions and answers. answer[0] always correct answer. Order to be randomized later.

$(document).ready(function() {

  // Initial Variables
  let fluidQuestions = quizQuestions;

  // Here we create the on click event that gets the user"s pick
  $(".btn-choice").on("click", function() {

    
    const yourPick = $(this).val();
    const answer = parseInt(yourPick);

    if (answer === 0) {
        $(this).addClass("correct");
    } else {
        $(this).addClass("incorrect");
    };

    //Randomizes the order of the Answer buttons.
    let arrLoc = [0, 1, 2, 3];
    let arrNum = [0, 1, 2, 3];
    arrLoc.forEach(function(elem, i, arr) {
      let Length = arrNum.length;
      let rand = Math.floor(Math.random() * Length);
      arr[i] = arrNum[(rand)];
      arrNum.splice((rand), 1);
    }, arrNum);

    // console.log(arrLoc);

    let questionsLeft = fluidQuestions.questions.length;
    let randomQNum =  Math.floor(Math.random() * questionsLeft);
    let buttonCollection = $(".btn-choice");
    let answerCollection = $(".answerChoice");

    // console.log(buttonCollection);
    // console.log(answerCollection);

    let buttonArray = [].slice.call (buttonCollection);
    let answerArray = [].slice.call (answerCollection);

    // console.log(buttonArray);
    // console.log(answerArray);

    $("#quizQuestion").text(fluidQuestions.questions[randomQNum].question);
    buttonArray.forEach(function(elem, i) {
      $(elem).val(parseInt(arrLoc[i]));
      $(answerArray[i]).text(fluidQuestions.questions[randomQNum].answers[arrLoc[i]]);
    });

    fluidQuestions.questions.splice(randomQNum, 1);

    if (answer === parseInt(0)) {
      $(this).removeClass("correct");
      } else {
        $(this).removeClass("incorrect");
    };
    
  
  });
});
