document.querySelector('.settings_cog').addEventListener('click', function() {
  let element = document.querySelector(".sidebar")
  let selectors = element.classList
  if (selectors.contains("sidebar_closed")) {
    element.classList.remove("sidebar_closed");
    element.classList.add("sidebar_visible");
  } else {
    element.classList.remove("sidebar_visible");
    element.classList.add("sidebar_closed");
  }
});
