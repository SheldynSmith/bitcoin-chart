function getCurrentPrice() {
    currency = document.getElementById("select-currency").value;
    //alert(currency);
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

setInterval(getCurrentPrice, 15000);