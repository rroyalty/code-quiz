
//JSON Object full of questions and answers. answer[0] always correct answer. Order to be randomized later.

$(document).ready(function() {

  console.log(quizQuestions);

  // Initial Variables
  var computerPick = Math.floor(Math.random() * 4) + 1;
  var lockGame = false;

  // We log the computer's pick to console to make it easier to troubleshoot
  console.log("Computer Pick: " + computerPick);

  // Here we create the on click event that gets the user"s pick
  $(".btn-choice").on("click", function() {

    // Here this lockGame line prevents the user from changing the option after the game is done.
    if (lockGame !== true) {

      // We get the value associated with the button the user picked from here
      var yourPick = $(this).val();
      console.log("Your Pick: " + yourPick);

      // We then reveal the computer's pick in the html
      $("#computer-pick").text(computerPick);

      // If your pick matched the computer's pick you let them know.
      if (parseInt(yourPick) === computerPick) {
        $("#result").text("Yep! You got it! Refresh the page to play again.");
        lockGame = true;
      }

      // If the numbers did not match. You also let them know
      else {
        $("#result").text("Nope. Refresh the page to play again.");
        lockGame = true;
      }
    }

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
