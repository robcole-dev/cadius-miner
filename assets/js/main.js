/* jshint esversion: 8 */

// Function to display how to play instructions

function show() {
    let display = document.getElementById("display");
    if (display.classList.contains("hide") === true) {
      display.classList.remove("hide");
    } else {
      display.classList.add("hide");
    }
  };

// event listeners
let infoButton = document.getElementById('show');
infoButton.addEventListener('click',show);