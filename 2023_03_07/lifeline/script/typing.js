const typingElement = document.querySelector(".typing-animation");
const text = typingElement.getAttribute("data-text");
let index = 0;
const intervalId = setInterval(() => {
  typingElement.textContent += text[index];
  index++;
  if (index >= text.length) {
    clearInterval(intervalId);
  }
}, 100);

