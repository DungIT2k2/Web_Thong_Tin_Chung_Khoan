var apikey = "KKBF7ALFUCZ0I7KY";
//QLDFZE6QORFTOZY7 
//DQ2V9Y2SMDP1EV1J 
//KKBF7ALFUCZ0I7KY
var data_tb = [];
var offer_data_tb = [];
var dataPoints = [];
var chart = null;
var current_name = "";
var flag = 0;
var api_current = "";
var dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];
var Check_Format_Date = false;
var current_view_type = "daily";
const loading = document.getElementsByClassName("loading");
const chartContainer = document.getElementById("chartContainer");
// Khai bao kieu du lieu cua col chart
// console.warn(loading);
function create_col_chart() {

    var totalDataPoints = dataPoints3.length; // Số lượng điểm dữ liệu từ API
    var timeRange = dataPoints3[totalDataPoints - 1].x.getTime() - dataPoints3[0].x.getTime(); // Tổng thời gian từ API
    var oneThirdTime;
    // Tính thời gian của tổng thời gian
    if (current_view_type === "daily" || current_view_type === "monthly" || current_view_type === "weekly") {
        oneThirdTime = timeRange / 3;
    }
    if (current_view_type === "1min") {
        oneThirdTime = timeRange / 50;
    }
    if (current_view_type === "5min") {
        oneThirdTime = timeRange / 32;
    }
    if (current_view_type === "15min") {
        oneThirdTime = timeRange / 33;
    }
    if (current_view_type === "30min") {
        oneThirdTime = timeRange / 35;
    }
    if (current_view_type === "60min") {
        oneThirdTime = timeRange / 38;
    }

    // Tính thời gian bắt đầu và kết thúc cho slider
    var sliderStart = dataPoints3[0].x;
    var sliderEnd = new Date(dataPoints3[0].x.getTime() + oneThirdTime);

    var col_Chart = new CanvasJS.StockChart("chartContainer", {
        exportEnabled: true,
        theme: "light2",
        title: {
            text: current_name
        },
        charts: [{
            toolTip: {
                shared: true,
                contentFormatter: function (e) {
                    var content = "";
                    for (var i = 0; i < e.entries.length; i++) {
                        if (Check_Format_Date == true) {
                            content += "<strong>" + e.entries[i].dataPoint.x.toLocaleString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) + "</strong><br/>";
                        }
                        else {
                            content += "<strong>" + e.entries[i].dataPoint.x.toLocaleString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + "</strong><br/>";
                        }
                        content += "<span style='color:" + e.entries[i].dataSeries.color + "'>Open: </span>" + e.entries[i].dataPoint.y[0] + "<br/>";
                        content += "<span style='color:" + e.entries[i].dataSeries.color + "'>High: </span>" + e.entries[i].dataPoint.y[1] + "<br/>";
                        content += "<span style='color:" + e.entries[i].dataSeries.color + "'>Low: </span>" + e.entries[i].dataPoint.y[2] + "<br/>";
                        content += "<span style='color:" + e.entries[i].dataSeries.color + "'>Close: </span>" + e.entries[i].dataPoint.y[3] + "<br/>";
                    }
                    return content;
                }
            },
            axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function (e) {
                    return "";
                },
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function (e) {
                        return ""
                    }
                },
            },
            axisY2: {
                title: "Price",
                prefix: "$"
            },
            legend: {
                verticalAlign: "top",
                horizontalAlign: "left"
            },
            data: [{
                name: "Price (in USD)",
                yValueFormatString: "$#,###.##",
                axisYType: "secondary",
                type: "candlestick",
                risingColor: "green",
                fallingColor: "red",
                dataPoints: dataPoints1
            }]
        }, {
            height: 100,
            toolTip: {
                shared: true
            },
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY2: {
                prefix: "",
                title: "Volume"
            },
            legend: {
                horizontalAlign: "left"
            },
            data: [{
                yValueFormatString: "#,###.##",
                axisYType: "secondary",
                name: "Volume",
                dataPoints: dataPoints2
            }]
        }],
        navigator: {
            data: [{
                color: "grey",
                dataPoints: dataPoints3
            }],
            slider: {
                minimum: sliderStart,
                maximum: sliderEnd
            }
        }
    });
    return col_Chart;
}
//Khai bao kieu du lieu cua line chart
function create_line_chart() {

    var totalDataPoints = dataPoints.length; // Số lượng điểm dữ liệu từ API
    var timeRange = dataPoints[totalDataPoints - 1].x.getTime() - dataPoints[0].x.getTime(); // Tổng thời gian từ API

    // Tính thời gian phần của tổng thời gian
    if (current_view_type === "daily" || current_view_type === "monthly" || current_view_type === "weekly") {
        oneThirdTime = timeRange / 3;
    }
    if (current_view_type === "1min") {
        oneThirdTime = timeRange / 50;
    }
    if (current_view_type === "5min") {
        oneThirdTime = timeRange / 32;
    }
    if (current_view_type === "15min") {
        oneThirdTime = timeRange / 33;
    }
    if (current_view_type === "30min") {
        oneThirdTime = timeRange / 35;
    }
    if (current_view_type === "60min") {
        oneThirdTime = timeRange / 38;
    }

    // Tính thời gian bắt đầu và kết thúc cho slider
    var sliderStart = dataPoints[0].x;
    var sliderEnd = new Date(dataPoints[0].x.getTime() + oneThirdTime);

    var line_Chart = new CanvasJS.StockChart("chartContainer", {
        exportEnabled: true,
        title: {
            text: current_name
        },
        charts: [{
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: Check_Format_Date ? "DD MMM YYYY HH:mm" : "MMM YYYY"
                }
            },
            axisY: {
                title: "Dollars",
                prefix: "$",
                suffix: "",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    // valueFormatString: "#,####.00",
                }
            },
            data: [{
                type: "line",
                xValueFormatString: Check_Format_Date ? "DD MMM YYYY HH:mm" : "MMM YYYY",
                // yValueFormatString: "#,###.##",
                dataPoints: dataPoints
            }]
        }],
        navigator: {
            slider: {
                minimum: sliderStart,
                maximum: sliderEnd
            }
        }
    });
    return line_Chart;
}
function getting_data_top_gainers_losers_mosttraded() {
    var api = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=" + apikey;
    api = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";
    $.getJSON(api)
        .done(function (data) {
            var gainers = data["top_gainers"];
            for (var temp in gainers) {
                // console.log(gainers[temp]);
                var name = gainers[temp]["ticker"];
                var price = gainers[temp]["price"];
                var change_price = gainers[temp]["change_amount"];
                var change_percent = gainers[temp]["change_percentage"];
                var volume = gainers[temp]["volume"]
                let row = [name, price, change_price, change_percent, volume];
                data_tb.push(row);
                offer_data_tb.push(row);
            }
            draw_table("tb_gainers");
            data_tb = [];
            var losers = data["top_losers"];
            for (var temp in losers) {
                // console.log(losers[temp]);
                var name = losers[temp]["ticker"];
                var price = losers[temp]["price"];
                var change_price = losers[temp]["change_amount"];
                var change_percent = losers[temp]["change_percentage"];
                var volume = losers[temp]["volume"]
                let row = [name, price, change_price, change_percent, volume];
                data_tb.push(row);
                offer_data_tb.push(row);
            }
            draw_table("tb_losers");
            data_tb = [];
            var most_traded = data["most_actively_traded"];
            for (var temp in most_traded) {
                // console.log(most_traded[temp]);
                var name = most_traded[temp]["ticker"];
                var price = most_traded[temp]["price"];
                var change_price = most_traded[temp]["change_amount"];
                var change_percent = most_traded[temp]["change_percentage"];
                var volume = most_traded[temp]["volume"]
                let row = [name, price, change_price, change_percent, volume];
                data_tb.push(row);
                offer_data_tb.push(row);
            }
            draw_table("tb_most_traded")
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function draw_table(name) {
    var table = document.getElementById(name);
    var row = document.createElement("tr");
    var col = document.createElement("td");
    for (i = 0; i < data_tb.length; i++) {
        row = document.createElement("tr");
        row.setAttribute("onclick", "choose('" + data_tb[i][0] + "');");
        for (let j = 0; j < 5; j++) {
            col = document.createElement("td");
            cell = document.createTextNode(data_tb[i][j]);
            if (j == 2) {
                temp = data_tb[i][j];
                // console.warn(temp);
                if (temp >= 0) {
                    col.setAttribute('class', 'up');
                }
                else {
                    col.setAttribute('class', 'down');
                }
            }
            span = document.createElement('span');

            if (j == 2) {
                if (temp >= 0) {
                    span.setAttribute('class', 'market-positive-image');
                }
                else {
                    span.setAttribute('class', 'market-negative-image');
                }
                col.appendChild(span);
            }
            col.appendChild(cell);
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    loading[0].classList.add("disable");
    loading[1].classList.add("disable");
    loading[2].classList.add("disable");
}

function shuffleArray(array) {
    // Sử dụng hàm so sánh ngẫu nhiên
    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    // Sử dụng phương thức sort() kết hợp với hàm so sánh ngẫu nhiên
    return array.sort(compareRandom);
}

function draw_table_offer() {
    var table = document.getElementById("tb_offer");
    // if (table != null) {
    //     var rows = table.getElementsByTagName("tr");
    //     for (var i = rows.length - 1; i >= 2; i--) {
    //         table.removeChild(rows[i]);
    //     }
    // }
    var row = document.createElement("tr");
    var col = document.createElement("td");
    for (i = 0; i < 7; i++) {
        row = document.createElement("tr");
        row.setAttribute("onclick", "choose('" + offer_data_tb[i][0] + "');");
        for (let j = 0; j < 4; j++) {
            col = document.createElement("td");
            cell = document.createTextNode(offer_data_tb[i][j]);
            if (j == 2) {
                temp = data_tb[i][j];
                // console.warn(temp);
                if (temp >= 0) {
                    col.setAttribute('class', 'up');
                }
                else {
                    col.setAttribute('class', 'down');
                }
            }
            span = document.createElement('span');

            if (j == 2) {
                if (temp >= 0) {
                    span.setAttribute('class', 'market-positive-image');
                }
                else {
                    span.setAttribute('class', 'market-negative-image');
                }
                col.appendChild(span);
            }
            col.appendChild(cell);
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    loading[3].classList.add("disable");
}

function choose(name) {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    var table = document.getElementById("tb_offer");
    if (table != null) {
        var rows = table.getElementsByTagName("tr");
        for (var i = rows.length - 1; i >= 2; i--) {
            table.removeChild(rows[i]);
        }
        loading[3].classList.remove("disable");
    }
    stock_table.classList.add("disable");
    chart_content.classList.remove("disable");
    var selectElement = document.getElementById("time_option");
    selectElement.value = "daily";
    current_name = name;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + current_name + "&apikey=" + apikey;
    console.error(api);
    //demo
    api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";
    console.warn(api);
    api_current = api;

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var daily = data["Time Series (Daily)"];
            Check_Format_Date = false;
            for (var temp in daily) {
                var d = temp.split('-');
                var value = daily[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["4. close"]) });

            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }

            shuffleArray(offer_data_tb);
            draw_table_offer();
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
//Bieu do duong
function line_graph() {
    var line_chart = create_line_chart();
    line_chart.render();
}
//Bieu do cot
function col_graph() {
    var col_Chart = create_col_chart();
    col_Chart.render();
}

function getdata_1min() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + current_name + "&interval=1min&outputsize=full&apikey=" + apikey;
    console.error(api);
    //demo
    // api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var daily = data["Time Series (1min)"];
            Check_Format_Date = true;
            current_view_type = "1min";
            for (var temp in daily) {
                var d = temp.split(" ")[0].split("-");
                var h = temp.split(" ")[1].split(":");

                var value = daily[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["4. close"]) });

            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_5min() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + current_name + "&interval=5min&outputsize=full&apikey=" + apikey;
    console.error(api);
    //demo
    // api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var daily = data["Time Series (5min)"];
            Check_Format_Date = true;
            current_view_type = "5min"
            for (var temp in daily) {
                var d = temp.split(" ")[0].split("-");
                var h = temp.split(" ")[1].split(":");

                var value = daily[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["4. close"]) });

            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_15min() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + current_name + "&interval=15min&outputsize=full&apikey=" + apikey;
    console.error(api);

    //demo
    // api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var daily = data["Time Series (15min)"];
            Check_Format_Date = true;
            current_view_type = "15min"
            for (var temp in daily) {
                var d = temp.split(" ")[0].split("-");
                var h = temp.split(" ")[1].split(":");

                var value = daily[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["4. close"]) });

            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_30min() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + current_name + "&interval=30min&outputsize=full&apikey=" + apikey;
    console.error(api);

    //demo
    // api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var daily = data["Time Series (30min)"];
            Check_Format_Date = true;
            current_view_type = "30min"
            for (var temp in daily) {
                var d = temp.split(" ")[0].split("-");
                var h = temp.split(" ")[1].split(":");

                var value = daily[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["4. close"]) });

            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_60min() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + current_name + "&interval=60min&outputsize=full&apikey=" + apikey;
    console.error(api);

    //demo
    // api = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var daily = data["Time Series (60min)"];
            Check_Format_Date = true;
            current_view_type = "60min"
            for (var temp in daily) {
                var d = temp.split(" ")[0].split("-");
                var h = temp.split(" ")[1].split(":");

                var value = daily[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), h[0], h[1], h[2]), y: Number(value["4. close"]) });

            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_daily() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + current_name + "&apikey=" + apikey;
    console.error(api);
    //demo
    api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var weekly = data["Time Series (Daily)"];
            Check_Format_Date = false;
            current_view_type = "daily"
            for (var temp in weekly) {
                var d = temp.split('-');
                var value = weekly[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["4. close"]) });
            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_weekly() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" + current_name + "&apikey=" + apikey;
    console.error(api);

    //demo
    api = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var weekly = data["Weekly Time Series"];
            Check_Format_Date = false;
            current_view_type = "weekly"
            for (var temp in weekly) {
                var d = temp.split('-');
                var value = weekly[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["4. close"]) });
            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
function getdata_monthly() {
    var html = `<div class="loading_chart">
    <img src="./icon/loading.gif">
    </div>`;
    chartContainer.innerHTML = html;
    //real
    var api = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + current_name + "&apikey=" + apikey;
    console.error(api);

    //demo
    api = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo";
    console.warn(api);

    dataPoints = [];
    dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    $.getJSON(api)
        .done(function (data) {
            var monthly = data["Monthly Time Series"];
            Check_Format_Date = false;
            current_view_type = "monthly"
            for (var temp in monthly) {
                var d = temp.split('-');
                var value = monthly[temp];
                dataPoints.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: parseFloat(value["1. open"]) });

                dataPoints1.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: [Number(value["1. open"]), Number(value["2. high"]), Number(value["3. low"]), Number(value["4. close"])], color: value["1. open"] < value["4. close"] ? "green" : "red" });;
                dataPoints2.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["5. volume"]), color: value["1. open"] < value["4. close"] ? "green" : "red" });
                dataPoints3.push({ x: new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])), y: Number(value["4. close"]) });
            }
            if (flag == 0) {
                line_graph();
            }
            else {
                col_graph();
            }
        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
}
//Chon loai bieu do cot
function choose_col_graph() {
    if (flag != 1) {
        flag = 1;
        col_graph();
    }
}

//Chon loai bieu do duong
function choose_line_graph() {
    if (flag != 0) {
        flag = 0;
        line_graph();
    }
}

getting_data_top_gainers_losers_mosttraded();
