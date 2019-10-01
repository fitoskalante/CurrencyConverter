function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
        currency: type,
        style: "currency"
    });
    return formatter.format(value);
}

async function convertCurrency() {  
    const from = fromSelector.value
    const to = toSelector.value
    const convertedValue = await callApi(from, to, inputAmount.value)
    result.innerHTML = formatCurrency(to, convertedValue)
}

let converterButton = document.getElementById('convertButton')
let inputAmount = document.getElementById('amountToConvert')
let result = document.getElementById('result')
let fromSelector = document.getElementById('currencyFrom')
let toSelector = document.getElementById('currencyTo')

inputAmount.addEventListener('input', convertCurrency)


async function callApi(fromcurrency, tocurrency, amount) {
    let currency = fromcurrency.toUpperCase() + "_" + tocurrency.toUpperCase();
    let url = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + currency + '&compact=y&apiKey=cf86f2d24af2c4b790f4';
    let result = await fetch(url);
    let json = await result.json();
    let rate = json[currency].val
    return rate * amount
}

function updateResults(response) {
  console.log(response);
}

console.log('testing code', convertCurrency)