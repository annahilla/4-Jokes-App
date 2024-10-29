"use strict";
var jokeOutput = document.getElementById('jokeOutput');
var btn = document.getElementById('btn');
btn.addEventListener('click', getJoke);
var options = {
    headers: {
        'Accept': 'application/json'
    }
};
fetch('https://icanhazdadjoke.com/', options)
    .then(function (response) { return response.json(); })
    .then(function (data) {
    jokeOutput.innerHTML = data.joke;
});
function getJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        jokeOutput.innerHTML = data.joke;
    });
}
