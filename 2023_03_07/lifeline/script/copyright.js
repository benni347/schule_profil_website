const year = new Date().getFullYear();
const copyrightSymbol = String.fromCharCode(169);
const copyrightNotice = `${copyrightSymbol} Cédric Skwar - ${year}`;
const copyParagraph = document.querySelector('div.copy');
copyParagraph.textContent = copyrightNotice;
