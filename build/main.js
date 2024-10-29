"use strict";
var weather = document.getElementById('weather');
var weatherIcon = document.getElementById('weatherIcon');
var jokeOutput = document.getElementById('jokeOutput');
var btn = document.getElementById('btn');
var blob = document.getElementById('blob');
var voteBtns = document.querySelectorAll('.vote-joke-btn');
btn.addEventListener('click', getJoke);
voteBtns.forEach(function (button) { return button.addEventListener('click', function () { return voteJoke(currentJoke, button.id); }); });
var currentJoke = '';
var jokeVoted = false;
var lastBlobNumber = 0;
function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=e725b8ec710517d47e1e7f0439394bb4')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var currentTemperature = ((data.main.temp - 273.15).toFixed(2)).toString();
        var currentWeather = data.weather[0].main;
        weather.innerHTML = "".concat(currentTemperature, "\u00BAC");
        if (currentWeather === "Rain" || currentWeather === "Thunderstorm" || currentWeather === "Drizzle") {
            weatherIcon.innerHTML = "&#9748;";
        }
        else if (currentWeather === "Snow") {
            weatherIcon.innerHTML = "&#9924;";
        }
        else if (currentWeather === "Clear") {
            weatherIcon.innerHTML = "&#127774;";
        }
        else {
            weatherIcon.innerHTML = "&#9925";
        }
    });
}
getWeather();
var options = {
    headers: {
        'Accept': 'application/json'
    }
};
function getGeneralJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        currentJoke = data.joke;
        jokeOutput.innerHTML = currentJoke;
        jokeVoted = false;
    });
}
function getChuckNorrisJoke() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        currentJoke = data.value;
        jokeOutput.innerHTML = currentJoke;
        jokeVoted = false;
    });
}
function getJoke() {
    if (Math.random() < 0.5) {
        getGeneralJoke();
    }
    else {
        getChuckNorrisJoke();
    }
    var blobNumber;
    do {
        blobNumber = Math.ceil(Math.random() * 5);
    } while (blobNumber === lastBlobNumber);
    lastBlobNumber = blobNumber;
    blob.classList.remove(blob.classList[1]);
    blob.classList.add("bg-blob-".concat(blobNumber));
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
