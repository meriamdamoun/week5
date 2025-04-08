const morse = `{
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
  }`;

function toJs() {
return new Promise((resolve, reject) => {
    try {
    const morseJS = JSON.parse(morse);
    
    if (Object.keys(morseJS).length === 0) {
        reject('Error: Morse object is empty');
    } else {
        resolve(morseJS);
    }
    } catch (error) {
    reject('Error parsing morse JSON: ' + error.message);
    }
});
}

function toMorse(morseJS) {
return new Promise((resolve, reject) => {
    const getUserInput = () => {
    // Create an input field and button for user input
    const inputContainer = document.createElement('div');
    inputContainer.style.margin = '20px 0';
    
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter a word or sentence';
    inputField.style.padding = '8px';
    inputField.style.marginRight = '10px';
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Translate to Morse';
    submitButton.style.padding = '8px 16px';
    
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(submitButton);
    
    document.body.appendChild(inputContainer);
    
    return new Promise((resolveInput) => {
        submitButton.addEventListener('click', () => {
        const userInput = inputField.value;
        inputContainer.remove();
        resolveInput(userInput);
        });
    });
    };
    
    getUserInput().then(userInput => {
    const morseTranslation = [];
    const lowerInput = userInput.toLowerCase();
    
    for (let char of lowerInput) {
        if (char === ' ') {
        morseTranslation.push(' ');
        continue;
        }
        
        if (morseJS[char] === undefined) {
        reject(`Error: Character "${char}" doesn't exist in the morse code dictionary`);
        return;
        }
        
        morseTranslation.push(morseJS[char]);
    }
    
    resolve(morseTranslation);
    });
});
}

function joinWords(morseTranslation) {
    // Create a container for the morse code output
    const morseContainer = document.createElement('div');
    morseContainer.style.margin = '20px 0';
    morseContainer.style.padding = '15px';
    morseContainer.style.backgroundColor = '#f0f0f0';
    morseContainer.style.border = '1px solid #ccc';
    morseContainer.style.borderRadius = '5px';

    const heading = document.createElement('h3');
    heading.textContent = 'Morse Code Translation:';
    morseContainer.appendChild(heading);

    const morseOutput = document.createElement('pre');
    morseOutput.textContent = morseTranslation.join('\n');
    morseOutput.style.fontFamily = 'monospace';
    morseOutput.style.fontSize = '18px';

    morseContainer.appendChild(morseOutput);
    document.body.appendChild(morseContainer);
}

// Function to start the morse code translation process
function startMorseTranslation() {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Morse Code Translator';
    startButton.style.padding = '10px 20px';
    startButton.style.margin = '20px 0';
    startButton.style.backgroundColor = '#4CAF50';
    startButton.style.color = 'white';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '4px';
    startButton.style.cursor = 'pointer';

    document.body.appendChild(startButton);

    startButton.addEventListener('click', () => {
        startButton.remove();
        
        toJs()
        .then(morseJS => toMorse(morseJS))
        .then(morseTranslation => joinWords(morseTranslation))
        .catch(error => {
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.margin = '20px 0';
            errorDiv.textContent = error;
            document.body.appendChild(errorDiv);
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
    const separator = document.createElement('hr');
    document.body.appendChild(separator);
    
    const challengeTitle = document.createElement('h2');
    challengeTitle.textContent = 'Second Daily Challenge - Morse Code Translator';
    document.body.appendChild(challengeTitle);
    
    startMorseTranslation();
}, 1000); 
});