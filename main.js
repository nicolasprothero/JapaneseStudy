const answerWith = document.querySelectorAll('input[name="answerType"]');
var genkiLessons = document.getElementById('genkilessons')
var pickLessonVocab = document.getElementById('vocab');
var pickLessonKanji = document.getElementById('kanji');

var flashcard = document.querySelector('.flashcard');

var frontText = document.getElementById('frontText');
var backText = document.getElementById('backText');

let frontShowing = true;
let wordIndex = 0;

// Imports in the words from json file
import words from './words.json' assert {type: "json"};

let wordListEnglish = [];
let wordListJapanese = [];
for(let i=0; i<words['Lesson 1'].length; i++) {
    wordListEnglish.push(words['Lesson 1'][i].English);
    wordListJapanese.push(words['Lesson 1'][i].Japanese);
}
for(let i=0; i<words['Lesson 2'].length; i++) {
    wordListEnglish.push(words['Lesson 2'][i].English);
    wordListJapanese.push(words['Lesson 2'][i].Japanese);
}

frontText.innerHTML = wordListEnglish[wordIndex];
backText.innerHTML = wordListJapanese[wordIndex];

window.removeWord = function() {
    if(!frontShowing){
        flipCard();
    }
    wordListEnglish.splice(wordIndex, 1);
    wordListJapanese.splice(wordIndex,1);
    if(wordIndex > wordListEnglish.length-1) {
        wordIndex = 0;
    }
    frontText.innerHTML = wordListEnglish[wordIndex];
    backText.innerHTML = wordListJapanese[wordIndex];
}

window.nextWord = function() {
    if(!frontShowing){
        flipCard();
    }
    if(wordIndex < wordListEnglish.length-1) {
        wordIndex = wordIndex+1;
    } else {
        wordIndex = 0;
    }
    frontText.innerHTML = wordListEnglish[wordIndex];
    backText.innerHTML = wordListJapanese[wordIndex];
    console.log(wordListEnglish)
}

window.flipCard = function() {
    if(frontShowing) {
        flashcard.style.transform = 'rotateX(180deg)';
        setTimeout(function(){
            frontText.classList.add('hidden');
            backText.classList.remove('hidden');
            flashcard.style.transform = '';
            frontShowing = !frontShowing
        }, 200);
    } else {
        flashcard.style.transform = 'rotateX(180deg)';
        setTimeout(function(){
            backText.classList.add('hidden');
            frontText.classList.remove('hidden');
            flashcard.style.transform = '';
            frontShowing = !frontShowing
        }, 200);
    }
}

window.showLessons = function() {
    if (pickLessonVocab.checked == true || pickLessonKanji.checked == true){
        genkiLessons.style.display = "block";
    } 
    if(pickLessonVocab.checked == false && pickLessonKanji.checked == false) {
        genkiLessons.style.display = "none";
    }
}

window.showSettings = function() {
    document.getElementById('settings-popup').classList.remove('hidden');
    document.getElementById('command-center').classList.add('hidden');
}
  
window.hideSettings = function() {
    // RETURNS WHAT LANGUAGE TO ANSWER WITH
    let selectedLanguage;
    for(const language of answerWith) {
        if(language.checked) {
            selectedLanguage = language.value;
            break;
        }
    }
    // HIDES SETTINGS POPUP THEN REVEALS COMMAND CENTER
    document.getElementById('settings-popup').classList.add('hidden');
    document.getElementById('command-center').classList.remove('hidden');
}
