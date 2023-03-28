// Select the hamburger menu button and the menu
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const drop = document.getElementById("__next");

// When the hamburger menu is clicked, toggle the "active" class on both the hamburger and the menu
hamburger.addEventListener("click", function () {
  this.classList.toggle("open");
  menu.classList.toggle("open");

  // Switch between the menu and close icons
  const icon = this.querySelector("i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
    drop.style.display = "initial";
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
    drop.style.display = "none";
  }
});
