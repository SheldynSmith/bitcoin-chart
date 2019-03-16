const express = require('express')
const path = require('path')
const https = require('https')
const PORT = process.env.PORT || 5000

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/chart'))
app.get('/get-prices', requestPrices)
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function requestPrices(req, res) {
  https.get('https://api.coindesk.com/v1/bpi/historical/close.json', (apiResonse) => {
    let data = '';

    apiResonse.on('data', (chunk) => {
      data += chunk;
    });

    apiResonse.on('end', () => {
      var prices = JSON.parse(data).bpi;
      console.log(prices)
      var jsonPrices = JSON.stringify(prices);

      res.json(prices);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}