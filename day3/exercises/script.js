
const getRandomCharacterBtn = document.getElementById('getRandomCharacter');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const characterCard = document.getElementById('characterCard');
const characterName = document.getElementById('characterName');
const characterHeight = document.getElementById('characterHeight');
const characterGender = document.getElementById('characterGender');
const characterBirth = document.getElementById('characterBirth');
const characterHomeworld = document.getElementById('characterHomeworld');

getRandomCharacterBtn.addEventListener('click', fetchRandomCharacter);

function showLoading() {
    loadingElement.classList.remove('hidden');
    errorElement.classList.add('hidden');
    characterCard.classList.add('hidden');
}

function hideLoading() {
    loadingElement.classList.add('hidden');
}

function showError() {
    errorElement.classList.remove('hidden');
    characterCard.classList.add('hidden');
}

function showCharacter() {
    characterCard.classList.remove('hidden');
}

async function fetchRandomCharacter() {
    showLoading();
    
    try {
        const randomId = Math.floor(Math.random() * 83) + 1;
        
        const response = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch character data');
        }
        
        const data = await response.json();
        const character = data.result.properties;
        
        const homeworldResponse = await fetch(character.homeworld);
        
        if (!homeworldResponse.ok) {
            throw new Error('Failed to fetch homeworld data');
        }
        
        const homeworldData = await homeworldResponse.json();
        const homeworld = homeworldData.result.properties.name;
        
        characterName.textContent = character.name;
        characterHeight.textContent = character.height === "unknown" ? "Unknown" : `${character.height} cm`;
        characterGender.textContent = character.gender.charAt(0).toUpperCase() + character.gender.slice(1);
        characterBirth.textContent = character.birth_year;
        characterHomeworld.textContent = homeworld;
        
        hideLoading();
        showCharacter();
        
    } catch (error) {
        console.error('Error fetching character:', error);
        hideLoading();
        showError();
    }
}

window.addEventListener('load', fetchRandomCharacter);