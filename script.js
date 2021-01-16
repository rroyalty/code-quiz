
$(document).ready(function() {
  // Initial Variables
  let fluidQuestions = quizQuestions;

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
    
    setTimeout(function(){
      //Randomizes the order of the Answer buttons.
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
      let questionsLeft = fluidQuestions.questions.length;
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
      $("#quizQuestion").text(fluidQuestions.questions[randomQNum].question);
        buttonArray.forEach(function(elem, i) {
          $(elem).val(parseInt(arrLoc[i]));
          $(answerArray[i]).text(fluidQuestions.questions[randomQNum].answers[arrLoc[i]]);
        });

      fluidQuestions.questions.splice(randomQNum, 1);

      // Resets Correct/Incorrect
      if (yourPick === 0) {
        $(lockThis).removeClass("correct");
        } else {
          $(lockThis).removeClass("incorrect");
      };
    }, 100);
  });
});
