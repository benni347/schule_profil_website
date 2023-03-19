const typingElement = document.querySelector(".typing-animation");
const text = typingElement.getAttribute("data-text");
let index = 0;
const intervalId = setInterval(() => {
  typingElement.innerHTML = text.substr(0, index) +
    '<span class="cursor"></span>';
  index++;
  if (index >= text.length) {
    clearInterval(intervalId);
  }
}, 200);
