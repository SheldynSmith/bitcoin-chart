var currency = "USD";

function getCurrentPrice(newCurrency = currency) {
    currency = newCurrency;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.response)
            var parsedResponse = JSON.parse(this.response);
            var currentPrice = parsedResponse.bpi[currency].rate;
            document.getElementById("current-price").innerHTML = currency + " " + currentPrice;
        }
    };
    var url = "https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json";
    xhttp.open("GET", url, true);
    xhttp.send();
}

getCurrentPrice();
setInterval(getCurrentPrice, 15000);