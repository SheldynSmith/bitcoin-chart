const numInvervals = 5;

function getData(currency) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.response)
            var dateArray = [];
            var priceArray = [];
            var prices = JSON.parse(this.response);
            for (var key in prices) {
                var price = prices[key];
                dateArray.push(key);
                priceArray.push(price);
            }
            // console.log(dateArray);
            dateArray = dateArray.reverse();
            priceArray = priceArray.reverse();
            loadChart(dateArray, priceArray, currency)
        }
    };
    xhttp.open("GET", "/get-prices?currency=" + currency, true);
    xhttp.send();
}


function loadChart(dateArray, priceArray, currency) {
    console.log(dateArray, priceArray);
    zingchart.THEME = "classic";

    var maxPrice = Math.max.apply(null, priceArray);
    var minPrice = Math.min.apply(null, priceArray);
    var priceInterval = (maxPrice - minPrice) / numInvervals;
    var priceRangeString = minPrice.toString() + ":" + maxPrice.toString() + ":" + priceInterval.toString();
    console.log(priceRangeString);
    var myConfig = {
        "gui": {
        "behaviors": [{
            "id": "SaveAsImage",
            "enabled": "none"
        }, {
            "id": "Print",
            "enabled": "none"
        }, {
            "id": "BugReport",
            "enabled": "none"
        }, {
            "id": "FullScreen",
            "enabled": "none"
        }, {
            "id": "ZoomIn",
            "enabled": "none"
        }, {
            "id": "ZoomOut",
            "enabled": "none"
        }, {
            "id": "LogScale",
            "enabled": "none"
        }, {
            "id": "DownloadPDF",
            "enabled": "none"
        }, {
            "id": "3D",
            "enabled": "none"
        }, {
            "id": "HideGuide",
            "enabled": "none"
        }],
        "context-menu": {
            "button": {
            "visible": 0
            },
            "gear": {
            "visible": 0
            }
        }
        },
        "graphset": [{
        "type": "mixed",
        "background-color": "#f4f4f4",
        "title": {
            "text": "Bitcoin Prices",
            "background-color": "none",
            "height": "40px",
            "color": "#818181",
            "font-family": "Roboto",
            "font-size": "16px"
        },
        "subtitle": {
            "text": currency,
            "color": "#818181",
            "font-family": "Roboto",
            "font-size": "11px",
            "padding-top": "20px"
        },
        "plotarea": {
            "background-color": "#fbfbfb",
            "margin-top": "45px",
            "margin-left": "60px",
            "margin-right": "55px",
            "margin-bottom": "65px"
        },
        "legend": {
            "visible": false
        },
        "labels": [{
        }],
        "plot": {
            "max-trackers": 0,
            "mode": "fast",
            "line-color": "#00baf0",
            "line-width": 1,
            "shadow": false,
            "marker": {
            "size": 3,
            "shadow": false,
            "background-color": "#fbfbfb",
            "border-width": "2px",
            "border-color": "#00baf0"
            }
        },
        "scale-x": {
            "max-items": 7,
            "max-labels": 7,
            "labels": dateArray,
            "line-width": "1px",
            "line-color": "#c7c9c9",
            "tick": {
            "line-color": "#c7c9c9",
            "line-width": "1px"
            },
            "guide": {
            "line-color": "#c7c9c9",
            "line-style": "solid"
            },
            "item": {
            "font-size": "10px",
            "font-color": "#818181",
            "padding-top": "5px"
            },
            "label": {
            "visible": false
            },
            "zooming": true,
            "mirrored": true
        },
        "scroll-x": {
            "bar": {
            "background-color": "#fff"
            },
            "handle": {
            "background-color": "#ccc",
            "alpha": 0.7,
            "border-width": 0,
            "height": "5px"
            }
        },
        "scale-y": {
            "values": priceRangeString,
            "line-color": "#c7c9c9",
            "line-width": "1px",
            "format": "$%v",
            "shadow": 0,
            "decimals": 0,
            "tick": {
            "line-color": "#c7c9c9",
            "line-width": "1px"
            },
            "guide": {
            "line-color": "#c7c9c9",
            "line-style": "solid"
            },
            "item": {
            "font-size": "10px",
            "font-color": "#818181",
            "padding-right": "5px"
            },
            "ref-line": {
            "visible": true,
            "line-color": "#c7c9c9",
            "alpha": 0.25
            }
        },
        "scale-y-2": {
            "values": priceRangeString,
            "line-color": "#c7c9c9",
            "line-width": "1px",
            "format": "$%v",
            "shadow": 0,
            "decimals": 0,
            "tick": {
            "line-color": "#c7c9c9",
            "line-width": "1px"
            },
            "guide": {
            "line-color": "#c7c9c9",
            "line-style": "solid"
            },
            "item": {
            "font-size": "10px",
            "font-color": "#818181",
            "padding-right": "5px"
            },
            "ref-line": {
            "visible": true,
            "line-color": "#c7c9c9",
            "alpha": 0.25
            }
        },
        "crosshair-x": {
            "plot-label": {
            "text": "%t was %v<br>on %kl",
            "border-radius": 5,
            "padding": "8px"
            }
        },
        "source": {
            "text": "Source: CoinDesk.com",
            "font-size": "9px",
            "font-color": "#818181",
            "font-family": "Roboto"
        },
        "series": [{
            "values": priceArray,
            "type": "area",
            "background-color": "#00baf0 #fbfbfb",
            "decimals": 2,
            "text": "Price"
        }, {
            "values": [],
            "type": "bar",
            "background-color": "#003849",
            "text": "Volume",
            "scales": "scale-x,scale-y-2"
        }]
        }]
    };

    zingchart.render({
        id: 'myChart',
        data: myConfig,
        hideprogresslogo: true,
        height: 800
    });

    zingchart.label_click = function(p) {
        zingchart.exec(p.id, 'reload');
    };
}