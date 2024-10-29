const weather = document.getElementById('weather') as HTMLElement;
const weatherIcon = document.getElementById('weatherIcon') as HTMLElement;
const jokeOutput= document.getElementById('jokeOutput') as HTMLElement;
const btn = document.getElementById('btn') as HTMLElement;
const blob = document.getElementById('blob') as HTMLElement;
const voteBtns = document.querySelectorAll('.vote-joke-btn');

btn.addEventListener('click', getJoke);
voteBtns.forEach(button => button.addEventListener('click', () => voteJoke(currentJoke, button.id)));

let currentJoke: string = '';
let jokeVoted: boolean = false;
let lastBlobNumber: number = 0;

function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=e725b8ec710517d47e1e7f0439394bb4')
    .then(response => response.json())
    .then(data => {
        let currentTemperature:string = ((data.main.temp - 273.15).toFixed(2)).toString();
        let currentWeather = data.weather[0].main;

        weather.innerHTML = `${currentTemperature}ºC`;

        if(currentWeather === "Rain" || currentWeather === "Thunderstorm" || currentWeather === "Drizzle") {
            weatherIcon.innerHTML = "&#9748;";
        } else if(currentWeather === "Snow") {
            weatherIcon.innerHTML = "&#9924;";
        } else if(currentWeather === "Clear") {
            weatherIcon.innerHTML = "&#127774;";
        } else {
            weatherIcon.innerHTML = "&#9925";
        }
    });
}

getWeather();

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

function getGeneralJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(response => response.json())
        .then(data => {
            currentJoke = data.joke;
            jokeOutput.innerHTML = currentJoke;
            jokeVoted = false;
        });
}

function getChuckNorrisJoke() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            currentJoke = data.value;
            jokeOutput.innerHTML = currentJoke;
            jokeVoted = false;
        })
}

function getJoke() {
    if(Math.random() < 0.5){
        getGeneralJoke();
    } else {
        getChuckNorrisJoke();
    }

    let blobNumber: number;

    do {
        blobNumber = Math.ceil(Math.random() * 5);
    } while (blobNumber === lastBlobNumber);
    
    lastBlobNumber = blobNumber;

    blob.classList.remove(blob.classList[1]);
    blob.classList.add(`bg-blob-${blobNumber}`);
}

getJoke();


interface ReportAcudit {
    joke: string,
    score: number,
    date: string
}

const reportAcudits: ReportAcudit[] = [];

function voteJoke(joke: string, btnId:string) {   
    let currentVote: ReportAcudit = {
        joke: joke,
        score: parseInt(btnId),
        date: (new Date()).toISOString()
    }

    if(jokeVoted) {
        reportAcudits.map(joke => {
            if(joke.joke === currentVote.joke) {
                joke.score = currentVote.score;
                return;
            }
        })
    } else {
        reportAcudits.push(currentVote);
        jokeVoted = true;
    }

    console.log(reportAcudits);
}