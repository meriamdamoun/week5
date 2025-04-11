const gameState = {
    score: 0,
    currentQuestion: null,
    username: '',
    timeLimit: 10,
    timer: null,
    hintUsed: false
};

const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');
const usernameInput = document.getElementById('usernameInput');
const startGameBtn = document.getElementById('startGameBtn');
const emojiDisplay = document.getElementById('emojiDisplay');
const optionsContainer = document.getElementById('options');
const scoreValue = document.getElementById('scoreValue');
const finalScore = document.getElementById('finalScore');
const feedback = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const showLeaderboardBtn = document.getElementById('showLeaderboardBtn');
const backToGameBtn = document.getElementById('backToGameBtn');
const timerFill = document.getElementById('timerFill');
const hintBtn = document.getElementById('hintBtn');
const hintText = document.getElementById('hintText');

startGameBtn.addEventListener('click', startGame);
nextQuestionBtn.addEventListener('click', loadNextQuestion);
playAgainBtn.addEventListener('click', resetGame);
showLeaderboardBtn.addEventListener('click', showLeaderboard);
backToGameBtn.addEventListener('click', () => {
    leaderboardScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
});
hintBtn.addEventListener('click', getHint);

function startGame() {
    gameState.username = usernameInput.value.trim() || 'Anonymous Player';
    welcomeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    gameState.score = 0;
    updateScore(0);
    loadNextQuestion();
}

function loadNextQuestion() {
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextQuestionBtn.style.display = 'none';
    hintText.textContent = '';
    hintBtn.disabled = false;
    gameState.hintUsed = false;
    
    fetch('/api/question')
        .then(response => response.json())
        .then(question => {
            gameState.currentQuestion = question;
            emojiDisplay.textContent = question.emoji;
            optionsContainer.innerHTML = '';
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'option-btn';
                button.addEventListener('click', () => checkAnswer(option));
                optionsContainer.appendChild(button);
            });
            startTimer();
        })
        .catch(error => {
            console.error('Error loading question:', error);
            feedback.textContent = 'Error loading question. Please try again.';
        });
}

function checkAnswer(selectedOption) {
    clearTimeout(gameState.timer);
    timerFill.style.width = '100%';
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === selectedOption) {
            button.classList.add('selected');
        }
    });
    
    fetch('/api/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            guess: selectedOption,
            correctAnswer: gameState.currentQuestion.correctAnswer
        })
    })
    .then(response => response.json())
    .then(result => {
        feedback.textContent = result.message;
        feedback.className = result.correct ? 'feedback correct' : 'feedback incorrect';
        if (result.correct) {
            const pointsToAdd = gameState.hintUsed ? 1 : 2;
            updateScore(gameState.score + pointsToAdd);
        }
        nextQuestionBtn.style.display = 'inline-block';
    })
    .catch(error => {
        console.error('Error checking answer:', error);
        feedback.textContent = 'Error checking answer. Please try again.';
    });
}

function updateScore(newScore) {
    gameState.score = newScore;
    scoreValue.textContent = newScore;
}

function startTimer() {
    timerFill.style.transition = 'none';
    timerFill.style.width = '100%';
    void timerFill.offsetWidth;
    timerFill.style.transition = `width ${gameState.timeLimit}s linear`;
    timerFill.style.width = '0%';
    
    gameState.timer = setTimeout(() => {
        feedback.textContent = `Time's up! The correct answer was ${gameState.currentQuestion.correctAnswer}`;
        feedback.className = 'feedback incorrect';
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === gameState.currentQuestion.correctAnswer) {
                button.classList.add('selected');
            }
        });
        nextQuestionBtn.style.display = 'inline-block';
    }, gameState.timeLimit * 1000);
}

function getHint() {
    if (gameState.score < 1) {
        hintText.textContent = 'You need at least 1 point to use a hint!';
        return;
    }
    
    updateScore(gameState.score - 1);
    gameState.hintUsed = true;
    const correctAnswer = gameState.currentQuestion.correctAnswer;
    const hintStrategies = [
        () => `The name starts with the letter "${correctAnswer[0]}"`,
        () => `The name has ${correctAnswer.length} letters`,
        () => {
            const categories = {
                'face': ['Face', 'Grinning', 'Smiling', 'Thinking', 'Sleeping', 'Pleading', 'Screaming', 'Rolling'],
                'animal': ['Dog', 'Cat', 'Panda', 'Koala', 'Fox', 'Lion', 'Tiger', 'Cow', 'Unicorn'],
                'food': ['Taco', 'Pizza', 'Hamburger', 'Ice Cream', 'Doughnut', 'Chocolate', 'Apple', 'Banana', 'Avocado'],
                'transport': ['Car', 'Rocket', 'Airplane']
            };
            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords.some(keyword => correctAnswer.includes(keyword))) {
                    return `This emoji belongs to the "${category}" category`;
                }
            }
            return `This emoji's name has a special meaning`;
        }
    ];
    
    const randomStrategy = hintStrategies[Math.floor(Math.random() * hintStrategies.length)];
    hintText.textContent = randomStrategy();
    hintBtn.disabled = true;
}

function resetGame() {
    fetch('/api/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: gameState.username,
            score: gameState.score
        })
    })
    .then(() => {
        gameState.score = 0;
        gameOverScreen.classList.remove('active');
        welcomeScreen.classList.add('active');
    })
    .catch(error => {
        console.error('Error saving score:', error);
    });
}

function showLeaderboard() {
    fetch('/api/leaderboard')
        .then(response => response.json())
        .then(data => {
            const leaderboardTable = document.querySelector('#leaderboardTable tbody');
            leaderboardTable.innerHTML = '';
            
            data.forEach((entry, index) => {
                const row = document.createElement('tr');
                const rankCell = document.createElement('td');
                rankCell.textContent = index + 1;
                const nameCell = document.createElement('td');
                nameCell.textContent = entry.username;
                const scoreCell = document.createElement('td');
                scoreCell.textContent = entry.score;
                row.appendChild(rankCell);
                row.appendChild(nameCell);
                row.appendChild(scoreCell);
                leaderboardTable.appendChild(row);
            });
            
            gameOverScreen.classList.remove('active');
            leaderboardScreen.classList.add('active');
        })
        .catch(error => {
            console.error('Error loading leaderboard:', error);
        });
}

optionsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('option-btn')) {
        const selectedOption = event.target.textContent;
        checkAnswer(selectedOption);
    }
});

let questionCounter = 0;
const originalLoadNextQuestion = loadNextQuestion;
loadNextQuestion = function() {
    questionCounter++;
    if (questionCounter > 10) {
        gameScreen.classList.remove('active');
        gameOverScreen.classList.add('active');
        finalScore.textContent = gameState.score;
        questionCounter = 0;
    } else {
        originalLoadNextQuestion();
    }
};