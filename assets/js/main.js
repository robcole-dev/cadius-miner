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

// event listeners
let infoButton = document.getElementById('show');
infoButton.addEventListener('click',show);