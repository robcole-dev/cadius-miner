/* jshint esversion: 8 */

// Function to display how to play instructions

function show() {
    let display = document.getElementById("display");
    let footer = document.getElementById("footer");
    
    if (display.classList.contains("hide") === true) {
      display.classList.remove("hide");
      footer.classList.remove("footer-position");
    } else {
      display.classList.add("hide");
      footer.classList.add("footer-position");
    }
  }

// Previous high score message

if (localStorage.getItem("hscore")) {
  document.getElementById("prev-hscore").innerHTML = `<p>Your Previous High Score was ${localStorage.getItem("hscore")}! Can you beat it?</p>`;
} else {
  document.getElementById("prev-hscore").innerHTML = '<p>You currently have no high score!<br>Click Play and try your luck!</p>';
}

// event listeners
let infoButton = document.getElementById('show');
infoButton.addEventListener('click',show);