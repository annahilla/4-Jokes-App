"use strict";
var jokeOutput = document.getElementById('jokeOutput');
var btn = document.getElementById('btn');
var voteBtns = document.querySelectorAll('.vote-joke-btn');
btn.addEventListener('click', getJoke);
voteBtns.forEach(function (button) { return button.addEventListener('click', function () { return voteJoke(currentJoke, button.id); }); });
var currentJoke = '';
var jokeVoted = false;
var options = {
    headers: {
        'Accept': 'application/json'
    }
};
function getJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        currentJoke = data.joke;
        jokeOutput.innerHTML = currentJoke;
        jokeVoted = false;
    });
}
getJoke();
var reportAcudits = [];
function voteJoke(joke, btnId) {
    var currentVote = {
        joke: joke,
        score: parseInt(btnId),
        date: (new Date()).toISOString()
    };
    if (jokeVoted) {
        reportAcudits.map(function (joke) {
            if (joke.joke === currentVote.joke) {
                joke.score = currentVote.score;
                return;
            }
        });
    }
    else {
        reportAcudits.push(currentVote);
        jokeVoted = true;
    }
    console.log(reportAcudits);
}
