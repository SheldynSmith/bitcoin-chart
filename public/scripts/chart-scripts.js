function getPrices() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("price-list").innerHTML = this.responseText;
            var jsonObj = JSON.parse(this.response);
            var prices = jsonObj.bpi;
            //document.getElementById("price-list").innerHTML = JSON.stringify(prices);
            for (var key in prices) {
                var price = prices[key];
                var listItem = document.createElement("LI");
                var text = document.createTextNode("Date " + key + " Price: " + price.toFixed(2));
                listItem.appendChild(text);

                var priceList = document.getElementById("price-list");
                priceList.appendChild(listItem);
            }
        }
    };
    xhttp.open("GET", "https://api.coindesk.com/v1/bpi/historical/close.json", true);
    xhttp.send();
}