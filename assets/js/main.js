/* jshint esversion: 8 */

// Function to display how to play instructions

function show() {
    let display = document.getElementById("display");
    if (display.style.display === "none") {
      display.style.display = "block";
    } else {
      display.style.display = "none";
    }
  };