const floatingWindow = document.querySelector(".floating-window");
const floatingSettings = document.querySelector(".floating-settings");

// Add event listener to open button
document.getElementById("open-settings").addEventListener("click", function () {
  // Show the floating window
  floatingSettings.style.display = "block";
  floatingSettings.style.top = 0;
});

// Add event listener to close button
document
  .getElementById("close-settings")
  .addEventListener("click", function () {
    // Hide the floating window
    document.querySelector(".floating-window").style.display = "none";
  });

// Make the window draggable
let isDragging = false;
let offsetX, offsetY;
const dragHandle = document.querySelector(".drag-handle");

dragHandle.addEventListener("mousedown", function (event) {
  offsetX = event.offsetX;
  offsetY = event.offsetY;
  isDragging = true;
});

document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    const x = event.pageX - offsetX;
    const y = event.pageY - offsetY;

    // Check if the window is still inside the viewport
    if (
      x >= 0 &&
      x + floatingWindow.offsetWidth <= window.innerWidth &&
      y >= 0 &&
      y + floatingWindow.offsetHeight <= window.innerHeight
    ) {
      floatingWindow.style.left = x + "px";
      floatingWindow.style.top = y + "px";
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
