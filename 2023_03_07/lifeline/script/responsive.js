"use strict";
function updateLayout() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 720) {
    const circleContainer = document.querySelector(".circle-container");
    const parent = circleContainer.parentNode;
    const hamburgerMenu = document.createElement("div");
    hamburgerMenu.classList.add("hamburger-menu");
    const pElement = document.createElement("p");
    pElement.textContent = "hello";
    hamburgerMenu.appendChild(pElement);

    // Add the hamburger menu to the DOM at the appropriate location.
    parent.insertBefore(hamburgerMenu, circleContainer);
    parent.removeChild(circleContainer);
  } else {
    // Restore the original layout
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    if (hamburgerMenu) {
      const parent = hamburgerMenu.parentNode;
      const circleContainer = document.createElement("div");
      circleContainer.classList.add("circle-container");
      // Add the circle container to the DOM at the appropriate location.
      parent.insertBefore(circleContainer, hamburgerMenu);
      parent.removeChild(hamburgerMenu);
    }
  }
}
window.addEventListener("resize", updateLayout);

// Initial layout update on page load
updateLayout();
