function getPrices() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            var prices = JSON.parse(this.response);
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
    xhttp.open("GET", "/get-prices", true);
    xhttp.send();
}