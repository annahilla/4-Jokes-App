const jokeOutput= document.getElementById('jokeOutput') as HTMLElement;
const btn = document.getElementById('btn') as HTMLElement;

btn.addEventListener('click', getJoke)

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

fetch('https://icanhazdadjoke.com/', options)
  .then(response => response.json())
  .then(data => {
    jokeOutput.innerHTML = data.joke;
  });

  
function getJoke() {
    fetch('https://icanhazdadjoke.com/', options)
  .then(response => response.json())
  .then(data => {
    jokeOutput.innerHTML = data.joke;
  });
}
