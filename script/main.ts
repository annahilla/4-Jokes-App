const jokeOutput= document.getElementById('jokeOutput') as HTMLElement;
const btn = document.getElementById('btn') as HTMLElement;
const voteBtns = document.querySelectorAll('.vote-joke-btn');

btn.addEventListener('click', getJoke);
voteBtns.forEach(button => button.addEventListener('click', () => voteJoke(currentJoke, button.id)));

let currentJoke: string = '';
let jokeVoted: boolean = false;

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

function getJoke() {
    fetch('https://icanhazdadjoke.com/', options)
        .then(response => response.json())
        .then(data => {
            currentJoke = data.joke;
            jokeOutput.innerHTML = currentJoke;
            jokeVoted = false;
        });
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