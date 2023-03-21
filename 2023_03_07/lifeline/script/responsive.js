"use strict";
function updateLayout() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 720) {
    const circleContainer = document.querySelector(".circle-container");
    const parent = circleContainer.parentNode;
    const hamburgerMenu = document.createElement("div");
    hamburgerMenu.classList.add("hamburger-menu");
    const hamburgerElement = document.createElement("i");
    hamburgerElement.setAttribute("class", "hamburger fa-solid fa-bars");
    // Set the style attribute
    hamburgerElement.setAttribute("style", "color: #9a9996;");
    const settingsA = document.createElement("a");
    const decissionsA = document.createElement("a");
    const sourceCodeA = document.createElement("a");
    sourceCodeA.setAttribute(
      "href",
      "https://github.com/benni347/schule_profil_website/tree/main/2023_03_07/lifeline",
    );
    sourceCodeA.textContent = "Source Code";
    hamburgerMenu.appendChild(hamburgerElement);

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
      const circle = document.createElement("div");
      circle.classList.add("circle");
      const close = document.createElement("button");
      close.classList.add("close");
      const open = document.createElement("button");
      close.classList.add("open");

      circleContainer.appendChild(circle);
      // Add the circle container to the DOM at the appropriate location.
      parent.insertBefore(circleContainer, hamburgerMenu);
      parent.removeChild(hamburgerMenu);
      /*

      <div class="circle-container">
<div class="circle">
          <button id="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </button>
          <button id="open">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
      </div>




       */
    }
  }
}
window.addEventListener("resize", updateLayout);

// Initial layout update on page load
updateLayout();
