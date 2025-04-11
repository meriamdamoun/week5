const apiKey = 'f08b1adf5af1445ca7c64fad';
const baseURL = 'https://v6.exchangerate-api.com/v6/';


const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const switchButton = document.getElementById('switchButton');
const resultDiv = document.getElementById('result');
const loaderElement = document.getElementById('loader');
const errorElement = document.getElementById('error');


async function fetchSupportedCurrencies() {
    try {
        showLoader();
        const response = await fetch(`${baseURL}${apiKey}/codes`);
        const data = await response.json();
        
        if (data.result === 'success') {
            populateCurrencyDropdowns(data.supported_codes);
        } else {
            showError('Failed to fetch currencies: ' + data.error);
        }
    } catch (error) {
        showError('Error fetching currencies: ' + error.message);
    } finally {
        hideLoader();
    }
}


function populateCurrencyDropdowns(currencies) {
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';
    
    currencies.forEach(currency => {
        const code = currency[0];
        const name = currency[1];
        
        const fromOption = document.createElement('option');
        fromOption.value = code;
        fromOption.textContent = `${code} - ${name}`;
        
        const toOption = document.createElement('option');
        toOption.value = code;
        toOption.textContent = `${code} - ${name}`;
        
        fromCurrencySelect.appendChild(fromOption);
        toCurrencySelect.appendChild(toOption);
    });
    
    setDefaultSelections();
}


function setDefaultSelections() {
    const usdOptionFrom = Array.from(fromCurrencySelect.options).find(option => option.value === 'USD');
    const eurOptionTo = Array.from(toCurrencySelect.options).find(option => option.value === 'EUR');
    
    if (usdOptionFrom) {
        usdOptionFrom.selected = true;
    }
    
    if (eurOptionTo) {
        eurOptionTo.selected = true;
    }
}


async function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        showError('Please enter a valid amount');
        return;
    }
    
    try {
        showLoader();
        clearError();
        
        const response = await fetch(`${baseURL}${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const data = await response.json();
        
        if (data.result === 'success') {
            displayResult(data, fromCurrency, toCurrency, amount);
        } else {
            showError('Conversion failed: ' + data.error);
        }
    } catch (error) {
        showError('Error during conversion: ' + error.message);
    } finally {
        hideLoader();
    }
}


function displayResult(data, fromCurrency, toCurrency, amount) {
    const convertedAmount = data.conversion_result;
    const rate = data.conversion_rate;
    
    resultDiv.innerHTML = `
        <strong>${amount.toFixed(2)} ${fromCurrency}</strong> = 
        <strong>${convertedAmount.toFixed(2)} ${toCurrency}</strong>
        <br>
        <small>1 ${fromCurrency} = ${rate} ${toCurrency}</small>
    `;
}


function switchCurrencies() {
    const fromValue = fromCurrencySelect.value;
    const toValue = toCurrencySelect.value;
    
    fromCurrencySelect.value = toValue;
    toCurrencySelect.value = fromValue;
    
    convertCurrency();
}


function showLoader() {
    loaderElement.style.display = 'block';
}


function hideLoader() {
    loaderElement.style.display = 'none';
}


function showError(message) {
    errorElement.textContent = message;
}


function clearError() {
    errorElement.textContent = '';
}


convertButton.addEventListener('click', convertCurrency);
switchButton.addEventListener('click', switchCurrencies);


document.addEventListener('DOMContentLoaded', () => {
    fetchSupportedCurrencies();
});