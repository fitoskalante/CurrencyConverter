const exchangeRates = {
    "usd": {
        "eur": 0.91,
        "aud": 1.48,
        "krw": 1203.00,
        "vnd": 23200.70,
    },
    "eur": {
        "usd": 1.09,
        "aud": 1.62,
        "krw": 1316.21,
        "vnd": 25383.96,
    },
    "aud": {
        "usd": 0.68,
        "eur": 0.62,
        "krw": 813.58,
        "vnd": 15690.63,
    },
    "krw": {
        "usd": 0.00083,
        "aud": 0.0012,
        "eur": 0.00076,
        "vnd": 19.29,
    },
    "vnd": {
        "krw": 0.052,
        "usd": 0.000043,
        "aud": 0.000064,
        "eur": 0.000039,
    },
}

function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
        currency: type,
        style: "currency"
    });
    return formatter.format(value);
}

function convertCurrency() {  
    const from = fromSelector.value
    const to = toSelector.value
    const convertedValue = exchangeRates[from][to] * inputAmount.value
    result.innerHTML = `${formatCurrency(to, convertedValue)}`
    return formatCurrency(to, convertedValue)
}

let converterButton = document.getElementById('convertButton')
let inputAmount = document.getElementById('amountToConvert')
let result = document.getElementById('result')
let fromSelector = document.getElementById('currencyFrom')
let toSelector = document.getElementById('currencyTo')
converterButton.addEventListener('click', convertCurrency)

inputAmount.addEventListener('input', convertCurrency)


async function callApi(fromcurrency, tocurrency) {
    let currency = fromcurrency + "_" + tocurrency;
    let url = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + currency + '&compact=y&apiKey=cf86f2d24af2c4b790f4';
    let result = await fetch(url);
    let json = await result.json();
    let rate = json(currency).val;
    let exchangedAmount = rate * 200;
    updateResults(exchangedAmount);
}

function updateResults(response) {
  console.log(response);
}