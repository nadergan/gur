let index = 0;
let arraySize = 10;
let priceInterval = 60000;  // ms
let averageInterval = 600000; // ms
let lastPrice = 0;
let lastAverage = 0;
let prices = [];


updatetBitcoinPrice();
// Update Price Every Minute
setInterval(function(){updatetBitcoinPrice()}, priceInterval);
// Update Average Price for the last 10 Minutes
setInterval(function(){updateAverage()}, 10 * interval);


function updatetBitcoinPrice() {
    var xhr = new XMLHttpRequest();
    
    now = new Date(); 
    document.getElementById("nowDiv").innerText = new Date();   

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            j = JSON.parse(xhr.responseText);  

            currentPrice=j.bpi.USD.rate_float;

            if ( index < arraySize ) {
                prices[index] = currentPrice;
                index++;
            } else {
                tempArray = [];
                for (i=0; i < prices.length -1 ; i++) {
                    tempArray[i] = prices[i+1];
                }  
                prices = tempArray;
                prices[index - 1] = currentPrice;
            }

            if (lastPrice == 0) { lastPrice = currentPrice}

            plotPrice('priceDiv', currentPrice, lastPrice);
            
            lastPrice = currentPrice;
            }
        }

    xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/CNY.json', true);
    xhr.send(null);
}


function updateAverage() {
    avg = average(prices);
    if (lastAverage == 0) {lastAverage = avg; }
    plotPrice('avgDiv', avg, lastAverage);
}

function plotPrice(div, value, lastValue) {

            var data = [
            {
                type: "indicator",
                mode: "number+delta",
                value: value,
                number: { prefix: "$",
                            valueformat: "5.2f",
                            font:{size: 40}
                    },
                delta: {
                        position: "top",
                        reference: lastValue,
                        valueformat: "5.2f",

                        },
                domain: { x: [0, 1], y: [0, 1] }
            }
            ];

            var layout = {
                paper_bgcolor: "white",
                width: 450,
                height: 150,
                margin: { t: 0, b: 0, l: 0, r: 0 }
                };
            Plotly.newPlot(div, data, layout);
}

function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}


