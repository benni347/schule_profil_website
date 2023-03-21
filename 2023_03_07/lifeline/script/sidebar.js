const open = document.getElementsByClassName("open")[0];
const close = document.getElementsByClassName("close")[0];
const sideBarElements = document.querySelector(".sideBarElements");
const container = document.querySelector(".container");

open.addEventListener("click", () => container.classList.add("show-nav"));

close.addEventListener("click", () => container.classList.remove("show-nav"));
sideBarElements.addEventListener(
  "click",
  () => container.classList.remove("show-nav"),
);
