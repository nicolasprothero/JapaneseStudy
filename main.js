const answerWith = document.querySelectorAll('input[name="answerType"]');
var genkiLessons = document.getElementById('genkilessons')
var pickLessonVocab = document.getElementById('vocab');
var pickLessonKanji = document.getElementById('kanji');
var flashcard = document.querySelector('.flashcard');
var frontText = document.getElementById('frontText');
var backText = document.getElementById('backText');
var scoreLeft = document.getElementById('scoreLeft');
var scoreRight = document.getElementById('scoreRight');

let wordsCorrect = 0

let frontShowing = true;
let wordIndex = 0;

let selectedLanguage = "English";

// Imports in the words from json file
import words from './words.json' assert {type: "json"};
import katakana from './katakana.json' assert {type: "json"};

let wordListEnglish = [];
let wordListJapanese = [];

window.init = function() {
    wordListEnglish = [];
    wordListJapanese = [];
    for(let i=0; i<katakana['Ka'].length; i++) {
        wordListEnglish.push(katakana['Ka'][i].English);
        wordListJapanese.push(katakana['Ka'][i].Japanese);
    }
    for(let i=0; i<words['Lesson 1'].length; i++) {
        wordListEnglish.push(words['Lesson 1'][i].English);
        wordListJapanese.push(words['Lesson 1'][i].Japanese);
    }
    for(let i=0; i<words['Lesson 2'].length; i++) {
        wordListEnglish.push(words['Lesson 2'][i].English);
        wordListJapanese.push(words['Lesson 2'][i].Japanese);
    }
    for(let i=0; i<words['Lesson 3'].length; i++) {
        wordListEnglish.push(words['Lesson 3'][i].English);
        wordListJapanese.push(words['Lesson 3'][i].Japanese);
    }
    scoreLeft.innerHTML = 0;
    scoreRight.innerHTML = wordListEnglish.length;
    wordIndex = 0;
    wordsCorrect = 0;
    frontShowing = true;
    placeWord();
}

window.placeWord = function() {
    if(selectedLanguage == "english") {
        frontText.innerHTML = wordListEnglish[wordIndex];
        backText.innerHTML = wordListJapanese[wordIndex];
    } else {
        frontText.innerHTML = wordListJapanese[wordIndex];
        backText.innerHTML = wordListEnglish[wordIndex];
    }
}

window.removeWord = function() {
    if(!frontShowing){
        flipCard();
    }
    wordListEnglish.splice(wordIndex, 1);
    wordListJapanese.splice(wordIndex,1);
    if(wordIndex > wordListEnglish.length-1) {
        wordIndex = 0;
    }
    placeWord();
    wordsCorrect = wordsCorrect + 1;
    scoreLeft.innerHTML = wordsCorrect;
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
    placeWord();
}

window.flipCard = function(time) {
    if(frontShowing) {
        flashcard.style.transform = 'rotateX(180deg)';
        setTimeout(function(){
            frontText.classList.add('hidden');
            backText.classList.remove('hidden');
            flashcard.style.transform = '';
            frontShowing = !frontShowing
        }, time);
    } else {
        flashcard.style.transform = 'rotateX(180deg)';
        setTimeout(function(){
            backText.classList.add('hidden');
            frontText.classList.remove('hidden');
            flashcard.style.transform = '';
            frontShowing = !frontShowing
        }, time);
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

    document.getElementById('footer2').classList.remove('hidden');
    document.getElementById('footer1').classList.add('hidden');
}
  
window.hideSettings = function() {
    // RETURNS WHAT LANGUAGE TO ANSWER WITH
    for(const language of answerWith) {
        if(language.checked) {
            selectedLanguage = language.value;
            break;
        }
    }
    console.log(selectedLanguage);
    init();
    // HIDES SETTINGS POPUP THEN REVEALS COMMAND CENTER
    document.getElementById('settings-popup').classList.add('hidden');
    document.getElementById('command-center').classList.remove('hidden');

    document.getElementById('footer1').classList.remove('hidden');
    document.getElementById('footer2').classList.add('hidden');
}

init();