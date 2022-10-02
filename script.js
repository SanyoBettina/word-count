function updateStatistics(event) {
  const stats = getStats(event.target.value);

  const countWordsElement = document.querySelectorAll(".count-words");
  for (let i = 0; i < countWordsElement.length; i++) {
    countWordsElement[i].textContent = "Words " + stats.words;
  }

  const countCharactersEl = document.getElementById("count-characters");
  countCharactersEl.textContent = "Characters " + stats.characters;

  const countSentencesEl = document.getElementById("count-sentences");
  countSentencesEl.textContent = "Sentences " + stats.sentences;

  const countParagraphsEl = document.getElementById("count-paragraph");
  countParagraphsEl.textContent = "Paragraphs " + stats.paragraph;

  const topWordsEl = document.getElementById("top");
  topWordsEl.innerHTML = "";
  for (let i = 0; i < stats.topWords.length; i++) {
    topWordsEl.insertAdjacentHTML(
      "beforeend",
      `<div class="top top4 col-md-3 d-flex justify-content-between"> 
        <div>${stats.topWords[i][0]}</div> 
        <div class="number"> ${stats.topWords[i][1]} </div>
      </div>`
    );
  }
}

function getStats(text) {
  const stats = {};
  const singleWords = sortWords(countSingleWords(text));

  stats.words = countWords(text);
  stats.characters = countChracters(text);
  stats.sentences = countSentences(text);
  stats.paragraph = countPharagraphs(text);
  stats.topWords = topWords(singleWords, 4);
  return stats;
}

function countWords(text) {
  var spaces = text.match(/\s+/g);
  return spaces ? spaces.length : 0;
}

function countChracters(text) {
  return text.length;
}

function countSentences(text) {
  var re = text.split(/[.!?]/);
  return re.length - 1;
}

function countPharagraphs(text) {
  if (text === '') {
    return 0;
  }
  var paragraph = text.replace(/\n$/gm, '').split(/\n/).length;
  
  return paragraph;
}

function cleanWords(word) {
  return word.replace(/[?.!\-,\/*]/g, "").trim();
}

function countSingleWords(text) {
  var words = text.split(" ");
  var obj = {};
  for (let i = 0; i < words.length; i++) {
    words[i] = cleanWords(words[i]);
    if (words[i]) {
      if (obj.hasOwnProperty(words[i])) {
        obj[words[i]]++;
      } else {
        obj[words[i]] = 1;
      }
    }
  }

  return obj;
}

function sortWords(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function topWords(obj, limit) {
  return obj.slice(0, limit);
}

function clear() {
  textBox.value = "";
  textBox.dispatchEvent(new KeyboardEvent('keyup'));
}

window.addEventListener('load', function() {
  const d = new Date();
  let year = d.getFullYear();
  document.getElementById("footer").innerHTML = `${year} All rights reserved`;
})


const textBox = document.getElementById("textbox");
textBox.addEventListener("keyup", updateStatistics);

const clearText = document.getElementById("clear-btn");
clearText.addEventListener("click", clear);
