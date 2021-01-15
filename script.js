
//JSON Object full of questions and answers. answer[0] always correct answer. Order to be randomized later.

$(document).ready(function() {

  // Initial Variables
  let lockGame = false;
  let fluidQuestions = quizQuestions;

  // Here we create the on click event that gets the user"s pick
  $(".btn-choice").on("click", function() {

    let questionsLeft = fluidQuestions.questions.length;
    let randomQNum =  Math.floor(Math.random() * questionsLeft);

    $("#quizQuestion").text(fluidQuestions.questions[randomQNum].question);

    console.log(questionsLeft);
    console.log(randomQNum);
    console.log(fluidQuestions.questions[randomQNum].question);

    fluidQuestions.questions.question.splice(randomQNum);

    console.log(fluidQuestions);
    console.log(fluidQuestions.questions.length);

    // // We get the value associated with the button the user picked from here
    // var yourPick = $(this).val();


    // // We then reveal the computer's pick in the html

    // // If your pick matched the computer's pick you let them know.
    // if (parseInt(yourPick) === computerPick) {
    //   $("#result").text("Yep! You got it! Refresh the page to play again.");
    //   lockGame = true;
    // }

    // // If the numbers did not match. You also let them know
    // else {
    //   $("#result").text("Nope. Refresh the page to play again.");
    //   lockGame = true;
    // }
    

  });
});


// // Assignment Code
// var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// // Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
