const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const emojis = [
    { emoji: '😀', name: 'Grinning Face' },
    { emoji: '😂', name: 'Face with Tears of Joy' },
    { emoji: '🥰', name: 'Smiling Face with Hearts' },
    { emoji: '😎', name: 'Smiling Face with Sunglasses' },
    { emoji: '🤔', name: 'Thinking Face' },
    { emoji: '😴', name: 'Sleeping Face' },
    { emoji: '🥺', name: 'Pleading Face' },
    { emoji: '😱', name: 'Face Screaming in Fear' },
    { emoji: '🙄', name: 'Face with Rolling Eyes' },
    { emoji: '🐶', name: 'Dog Face' },
    { emoji: '🐱', name: 'Cat Face' },
    { emoji: '🐼', name: 'Panda Face' },
    { emoji: '🐨', name: 'Koala' },
    { emoji: '🦊', name: 'Fox Face' },
    { emoji: '🦁', name: 'Lion Face' },
    { emoji: '🐯', name: 'Tiger Face' },
    { emoji: '🐮', name: 'Cow Face' },
    { emoji: '🦄', name: 'Unicorn Face' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🍔', name: 'Hamburger' },
    { emoji: '🍦', name: 'Ice Cream' },
    { emoji: '🍩', name: 'Doughnut' },
    { emoji: '🍫', name: 'Chocolate Bar' },
    { emoji: '🍎', name: 'Red Apple' },
    { emoji: '🍌', name: 'Banana' },
    { emoji: '🥑', name: 'Avocado' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '✈️', name: 'Airplane' }
];

let leaderboard = [];

function getRandomEmojiQuestion(optionsCount = 4) {
    const correctIndex = Math.floor(Math.random() * emojis.length);
    const correctEmoji = emojis[correctIndex];
    const options = [correctEmoji.name];
    
    while (options.length < optionsCount) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const randomName = emojis[randomIndex].name;
        if (!options.includes(randomName)) {
            options.push(randomName);
        }
    }
    
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    return {
        emoji: correctEmoji.emoji,
        correctAnswer: correctEmoji.name,
        options: shuffledOptions
    };
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/question', (req, res) => {
    const question = getRandomEmojiQuestion();
    res.json(question);
});

app.post('/api/guess', (req, res) => {
    const { guess, correctAnswer } = req.body;
    const isCorrect = guess === correctAnswer;
    
    res.json({
        correct: isCorrect,
        message: isCorrect ? 'Correct! 🎉' : `Wrong! The correct answer was ${correctAnswer}`
    });
});

app.post('/api/score', (req, res) => {
    const { username, score } = req.body;
    leaderboard.push({ username, score, timestamp: new Date() });
    leaderboard.sort((a, b) => b.score - a.score);
    if (leaderboard.length > 10) {
        leaderboard = leaderboard.slice(0, 10);
    }
    
    res.json({ success: true });
});

app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard);
});

app.listen(port, () => {
    console.log(`Emoji Guessing Game server running at http://localhost:${port}`);
});