let vehicle = {
    title: 'Volkswagen brasilia',
    km: '999,999 km',
    year: '1979',
    location: 'São José do Rio Preto, SP',
    situation: 'Doc em Dia Recibo em Branco',
    price: 15000,
    description: 'Brasilia 79/79 Doc em Dia Recibo em Branco4 Pneus novos Bateria Nova.',
}

let game = null;

initGame = () => {
    game = {
        actualPrice: vehicle.price,
        guess: 0,
        maxGuesses: 6,
        guesses: [],
        isGameOver: false,
    };

    renderGuesses();
}

fillVehicleDetails = () => {
    let titleElement = document.querySelector('.title');
    let kmElement = document.querySelector('.km .value');
    let yearElement = document.querySelector('.year .value');
    let locationElement = document.querySelector('.location .value');
    let situationElement = document.querySelector('.situation .value');
    let descriptionElement = document.querySelector('.listing-description .value');

    titleElement.textContent = vehicle.title;
    kmElement.textContent = vehicle.km;
    yearElement.textContent = vehicle.year;
    locationElement.textContent = vehicle.location;
    situationElement.textContent = vehicle.situation;
    descriptionElement.textContent = vehicle.description;

    kmElement.classList.add('blur');
    yearElement.classList.add('blur');
    locationElement.classList.add('blur');
    situationElement.classList.add('blur');
    descriptionElement.classList.add('blur');

    initGame();
}

handleGuess = () => {
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementsByClassName('guess-button');
    const guessValue = parseFloat(guessInput.value);

    if (isNaN(guessValue)) return;

    let newGuess = {
        number: game.guess,
        value: guessValue,
        situation: guessValue < game.actualPrice ? 'low' : guessValue > game.actualPrice ? 'high' : 'correct',
    }
    
    updateGame(newGuess);

    guessInput.value = '';
    guessInput.disabled = game.isGameOver;
    guessButton.disabled = game.isGameOver;
    guessInput.placeholder = game.isGameOver ? 'Jogo terminado' : 'Quanto custa?';
    guessInput.focus();
}

updateGame = (newGuess) => {
    let kmElement = document.querySelector('.km .value');
    let yearElement = document.querySelector('.year .value');
    let locationElement = document.querySelector('.location .value');
    let situationElement = document.querySelector('.situation .value');
    let descriptionElement = document.querySelector('.listing-description .value');

    if (newGuess.situation != 'correct') {
        switch (game.guess) {
            case 0:
                kmElement.classList.remove('blur');
                break;
            case 1:
                yearElement.classList.remove('blur');
                break;
            case 2:
                locationElement.classList.remove('blur');
                break;
            case 3:
                situationElement.classList.remove('blur');
                break;
            case 4:
                descriptionElement.classList.remove('blur');
                break;
            default:
                break;
        }
    }

    game.guesses.push(newGuess);
    game.guess++;
    game.isGameOver = newGuess.situation === 'correct' || game.guesses.length >= game.maxGuesses;

    if (game.isGameOver) {
        kmElement.classList.remove('blur');
        yearElement.classList.remove('blur');
        locationElement.classList.remove('blur');
        situationElement.classList.remove('blur');
        descriptionElement.classList.remove('blur');
    }

    renderGuesses();
}

renderGuesses = () => {
    const pastGuessesElement = document.querySelector('.past-guesses');
    pastGuessesElement.innerHTML = '';

    game.guesses.forEach(guess => {
        const guessElement = document.createElement('div');
        guessElement.className = `guess ${guess.situation === 'correct' ? 'correct' : 'incorrect'}`;
        guessElement.textContent = `R$ ${(guess.value / 1000).toFixed(2)}k ${guess.situation == 'low' ? " É BAIXO" : guess.situation == 'high' ? " É ALTO" : "ESTÁ CORRETO"}!`;
        pastGuessesElement.appendChild(guessElement);
    });
}

fillVehicleDetails();