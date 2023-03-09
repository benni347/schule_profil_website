const year = new Date().getFullYear();
const copyrightNotice = '&copy; Cédric Skwar - ' + year;
const copyParagraph = document.querySelector('div.copy');
copyParagraph.textContent = copyrightNotice;
