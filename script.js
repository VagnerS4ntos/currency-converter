const currencySelected = document.getElementById('currency-one')
const currencyConverted = document.getElementById('currency-two')
const currencyAmount = document.getElementById('amount-one')
const currencyAmountConverted = document.getElementById('amount-two')
const swap = document.getElementById('swap')
const rate = document.querySelector('.rate')


function exchange() {
  fetch(`https://v6.exchangerate-api.com/v6/060bbef1171adfdb5f0e2946/latest/${currencySelected.value}`)
    .then(response => response.json())
    .then(body => {
      rate.innerText = `1 ${currencySelected.value} = ${body.conversion_rates[currencyConverted.value]} ${currencyConverted.value}`
      currencyAmountConverted.value = `${(currencyAmount.value * body.conversion_rates[currencyConverted.value]).toFixed(2)}`
    })
}

currencySelected.addEventListener('input', exchange)
currencyConverted.addEventListener('input', exchange)
currencyAmount.addEventListener('input', exchange)

swap.addEventListener('click', () => {
  const holdValue = currencyConverted.value
  currencyConverted.value = currencySelected.value
  currencySelected.value = holdValue
  exchange()
})

exchange()