const open = document.getElementById("open")
const close = document.getElementById("close")
const sideBarElements = document.querySelector(".sideBarElements")
const container = document.querySelector(".container")

open.addEventListener("click", () => container.classList.add("show-nav"))

close.addEventListener("click", () => container.classList.remove("show-nav"))
sideBarElements.addEventListener("click", () =>
    container.classList.remove("show-nav")
)
