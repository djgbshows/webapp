
// Options Web Application
// The ideal is to create a website that finds the best possible entry and exit points for a stock option

// use thinkorswim to scan for stocks that meet my parameters
/* candidates for stocks 
   upcoming earnings report
   high volume
   high market cap */

/*Algorithm:
  Focus on uptrending stock options
  check for trends in the year, month, week, & day timeframes
  look at 52 week high
  unusual volume with in the past #x days
  look for gaps in price on open
*/

/* Print out 
  entry and exit limit orders
  contract time frames
  best strategy
 */

//Algorithm ==============================================================================

function wait() {
    setTimeout(function () { }, 3000);
}

class Algo {

    constructor(sym) {

        // Stock Symbol
        this.sym = $('#symbol').val()

        //Watch List
        this.watchList = [];

        // Present Time
        this.currentTime = new Date.now().toString("hh:mm:ss")
        this.presentTime = Date.now().toString("yyyy-MM-dd hh:mm:ss");
        this.timeCheck = Date.now().toString("hh:mm:ss");

        //Api Key
        this.apiKey = "JSEZ8SK1RA528ZXU";

        // Time Series 
        this.dailyTimeSeries = "Time Series (Daily)";
        this.weeklyTimeSeries = "Weekly Time Series";
        this.monthlyTimeSeries = "Monthly Time Series";

        this.open = "1. open";
        this.high = "2. high";
        this.low = "3. low";
        this.close = "4. close";
        this.volume = "5. volume";

        // Days
        this.day = Date.today().toString()[0] + Date.today().toString()[1] + Date.today().toString()[2];
        this.today = Date.today().toString("yyyy-MM-dd");
        this.day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
        this.day_3 = Date.today().add(-2).days().toString("yyyy-MM-dd");

        // Weeks
        this.friday_1 = Date.today().friday().addWeeks(-3).toString("yyyy-MM-dd");
        this.friday_2 = Date.today().friday().addWeeks(-2).toString("yyyy-MM-dd");

        // Month
        this.month_1 = Date.today().add(-2).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");
        this.month_2 = Date.today().add(-1).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");

        this.init()
    }

    //Checking if its a Holiday
    ifHoliday() {
        if (this.today == Date.today().toString("yyyy-01-01") || this.today == Date.today().toString("yyyy-01-15") || this.today == Date.today().toString("yyyy-02-19") || this.today == Date.today().toString("yyyy-03-29") || this.today == Date.today().toString("yyyy-03-30") || this.today == Date.today().toString("yyyy-05-27") || this.today == Date.today().toString("yyyy-05-28") || this.today == Date.today().toString("yyyy-07-03") || this.today == Date.today().toString("yyyy-07-04") || this.today == Date.today().toString("yyyy-05-08") || this.today == Date.today().toString("yyyy-09-03") || this.today == Date.today().toString("yyyy-11-12") || this.today == Date.today().toString("yyyy-11-22") || this.today == Date.today().toString("yyyy-11-23") || this.today == Date.today().toString("yyyy-12-24") || this.today == Date.today().toString("yyyy-12-25") || this.today == Date.today().toString("yyyy-12-31")) {

            this.today = Date.today().add(-1).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            console.log("Its a holiday, converting to testing mood");

        } else {

            console.log("Its not a holiday");
        }
    }

    // Check if today is a weekend
    ifWeekend() {

        //Checking Day TimeFrame
        if (this.day == "Mon") {
            console.log("Today is Monday, executing ifWeekend function")
            this.today = Date.today().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

        } else if (this.day == "Sat") {
            console.log("Today is Saturday, executing ifWeekend function")
            this.presentTime = Date.today().add(-1).days().toString("yyyy-MM-dd 16:00:00");
            this.today = Date.today().add(-1).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");

        } else if (this.day == "Sun") {
            console.log("Today is Sunday, executing ifWeekend function")
            this.today = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

        } else {
            console.log('Checking if today is Monday... Looks like Today TimeFrame is ' + this.day);
        }

        //Checking Month_1 TimeFrame
        if (this.month_1 == "Mon") {
            console.log("Today is Monday, executing ifWeekend function")
            this.today = Date.today().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

        } else if (this.month_1 == "Sat") {
            console.log("Today is Saturday, executing ifWeekend function")
            this.presentTime = Date.today().add(-1).days().toString("yyyy-MM-dd 16:00:00");
            this.today = Date.today().add(-1).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");

        } else if (this.month_1 == "Sun") {
            console.log("Today is Sunday, executing ifWeekend function")
            this.today = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

        } else {
            console.log('Checking if today is Monday... Looks like Month_1 TimeFrame is ' + this.day);
        }

        //Checking Month_2 TimeFrame
        if (this.month_2 == "Mon") {
            console.log("Today is Monday, executing ifWeekend function")
            this.today = Date.today().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

        } else if (this.month_2 == "Sat") {
            console.log("Today is Saturday, executing ifWeekend function")
            this.presentTime = Date.today().add(-1).days().toString("yyyy-MM-dd 16:00:00");
            this.today = Date.today().add(-1).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");

        } else if (this.month_2 == "Sun") {
            console.log("Today is Sunday, executing ifWeekend function")
            this.today = Date.today().add(-2).days().toString("yyyy-MM-dd");
            this.day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
            this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

        } else {
            console.log('Checking if today is Monday... Looks like Month_2 TimeFrame is ' + this.day);
        }
    }

    // Check if the Stock Market is open or closed, 9:30am - 4pm est
    ifMarketHours() {
        if (this.timeCheck > "09:30:00" && this.timeCheck < "16:00:00" && this.day == "Sat" || this.day == "Sun") {
            console.log("Market Is closed, current time is " + this.currentTime + " today is " + this.day);
        }
        else if (this.timeCheck > "09:30:00" || this.timeCheck < "16:00:00" && this.day != "Sat" || "Sun") {
            console.log("Market Is Opened, current time is " + this.currentTime);
        }
        else {
            console.log("Market is closed, will revert to 4pm for testing purposes");
            this.presentTime = new Date.now().toString("yyyy-MM-dd 16:00:00");
        }
    }

    // Checking if the last day of month is a friday to compare timeframes
    ifLastDayOfMonth() {
        if (Date.parse(this.month_1).is().sun() || Date.parse(this.month_1).is().sat() == true) {
            this.month_1 = Date.parse(this.month_1).last().friday().toString("yyyy-MM-dd");
        } else {
            console.log("month_1 is friday");
        }

        if (Date.parse(this.month_2).is().sun() || Date.parse(this.month_2).is().sat() == true) {
            this.month_2 = Date.parse(this.month_2).last().friday().toString("yyyy-MM-dd");
        } else {
            console.log("month_2 is friday")
        }

    }

    getLogo() {

        $.get("https://api.iextrading.com/1.0/stock/" + this.sym + "/logo", function (data, status) {
            console.log(data.url)

            if (data.message == "data is not defined") {

                alert("invalid stock, please check spelling and try again.")
            } else {

                $("img#logo").attr('src', data.url);

            }

        })

    }

    getMonth() {



        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data, status) => {

            if (data.Information) {
                console.log("rate limit hit for " + this.sym + " Please use another symbol")
                alert("Rate limit has been reached for " + this.sym.toUpperCase() + " Please check your list for previously checked symbols. Use another stock symbol")
            } else {
            }

            $("#analyzeStock").text("COMPLETE")



            this.month = {

                ticker: data["Meta Data"]["2. Symbol"],

                open: Number(data[this.monthlyTimeSeries][this.month_1][this.open]),
                high_1: Number(data[this.monthlyTimeSeries][this.month_1][this.high]),
                low_1: Number(data[this.monthlyTimeSeries][this.month_1][this.low]),
                close_1: Number(data[this.monthlyTimeSeries][this.month_1][this.close]),
                volume_1: Number(data[this.monthlyTimeSeries][this.month_1][this.volume]),

                open_2: Number(data[this.monthlyTimeSeries][this.month_2][this.open]),
                high_2: Number(data[this.monthlyTimeSeries][this.month_2][this.high]),
                low_2: Number(data[this.monthlyTimeSeries][this.month_2][this.low]),
                close_2: Number(data[this.monthlyTimeSeries][this.month_2][this.close]),
                volume_2: Math.round(Number(data[this.monthlyTimeSeries][this.month_2][this.volume])),

                open_3: Number(data[this.monthlyTimeSeries][this.today][this.open]),
                high_3: Number(data[this.monthlyTimeSeries][this.today][this.high]),
                low_3: Number(data[this.monthlyTimeSeries][this.today][this.low]),
                close_3: Number(data[this.monthlyTimeSeries][this.today][this.close]),
                volume_3: Number(data[this.monthlyTimeSeries][this.today][this.volume]),

                uptrend: "",
                pullback: "",
                trend: ""
            }



            //Algorithm: ==========================================================================================

            this.sellLimit = Number(this.month.high_2 - this.month.low_2 + this.month.close_2) - .05;
            this.buyLimit = Number(this.month.high_2 - (this.month.high_2 - this.month.close_2) - .6);
            this.downtrendSellLimit = Number(this.month.close_2 - (this.month.high_2 - this.month.low_2));
            this.downtrendBuyLimit = Number(this.month.close_2 - (this.month.high_2 - this.month.low_2));

            console.log(this.sellLimit.toFixed(2));
            console.log(this.buyLimit)

            // Checking for the trend

            // if uptrend
            if (this.month.close_1 > this.month.open_2 && this.month.close_2 < this.month.open_3) {
                console.log("uptrend found")

                //If Stock is found then add it to a watchlist

                $("#condition").text("uptrend found")
                $("#monthFormula").text("Monthly Sell Limit ", this.sellLimit)

                this.watchList.push(this.sym)
                console.log("added " + this.watchList + " to watchlist");


                $.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data) => {

                    this.now = {

                        ticker: data["Meta Data"]["2. Symbol"],

                        open: Number(data[this.dailyTimeSeries][this.day_3][this.open]),
                        high_1: Number(data[this.dailyTimeSeries][this.day_3][this.high]),
                        low_1: Number(data[this.dailyTimeSeries][this.day_3][this.low]),
                        close_1: Number(data[this.dailyTimeSeries][this.day_3][this.close]),
                        volume_1: Number(data[this.dailyTimeSeries][this.day_3][this.volume]),

                        open_2: Number(data[this.dailyTimeSeries][this.day_2][this.open]),
                        high_2: Number(data[this.dailyTimeSeries][this.day_2][this.high]),
                        low_2: Number(data[this.dailyTimeSeries][this.day_2][this.low]),
                        close_2: Number(data[this.dailyTimeSeries][this.day_2][this.close]),
                        volume_2: Math.round(Number(data[this.dailyTimeSeries][this.day_2][this.volume])),

                        open_3: Number(data[this.dailyTimeSeries][this.today][this.open]),
                        high_3: Number(data[this.dailyTimeSeries][this.today][this.high]),
                        low_3: Number(data[this.dailyTimeSeries][this.today][this.low]),
                        close_3: Number(data[this.dailyTimeSeries][this.today][this.close]),
                        volume_3: Number(data[this.dailyTimeSeries][this.today][this.volume]),

                        mclose: "",
                        mlow: "",
                        mpullback: "",
                        gap: "",
                        mvolume: ""
                    }

                    //Algorithm: ===========================================================================================
                    //Check if candle 1 high and lows are higher than candle 2
                    //Check if candle 2 close is less than candle 3 open


                    if (this.now.close_1 > this.now.open_2 && this.now.low_1 < this.now.low_2) {
                        this.now.mtrend = +1
                        this.trend = "UP"
                    } else {
                        this.now.mtrend = 0
                        this.trend = "DOWN"

                    }

                    // Check if candle 2 close is less than candle 3 open
                    if (this.now.close_2 < this.now.open_3 && this.now.low_2 < this.now) {
                        this.now.mpullback = +1
                        this.reversal = "TRUE"
                    } else {
                        this.now.mpullback = 0
                        this.reversal = "FALSE"
                    }

                    //Calculate Decision
                    this.ddecision = +this.now.mpullback + +this.now.mtrend;

                    if (this.ddecision && this.mdecision == 2) {

                        $("#checkSetup").text("check")
                        console.log(true, "signal found")
                        this.signal = "BUY"
                        $("$signal").text("BUY")
                        $("#stock").text(this.sym.toUpperCase())

                        $("thead").append("<tr> <td id='shade'>" + this.sym.toUpperCase() + "</td> <td>" + this.today + "</td> <td>" + this.month.close_1 + "</td> <td>" + this.month.open_2 + "</td> <td>" + this.month.close_2 + "</td> <td>" + this.month.open_3 + "</td> <td>" + this.month.low_1 + "</td> <td>" + this.month.low_2 + "</td> <td>" + this.now.close_1 + "</td> <td>" + this.now.open_2 + "</td> <td>" + this.now.close_2 + "</td> <td>" + this.now.open_3 + "</td> <td>" + this.now.low_1 + "</td> <td>" + this.now.low_2 + "</td> <td>" + this.trend + "</td> <td>" + this.reversal + "</td> <td>" + this.signal + "</tr>")



                    } else {

                        $("#checkSetup").text("WAIT")
                        console.log(false, "No day signal found yet")
                        this.signal = "WAIT"

                        $("#signal").text("WAIT")
                        $("#stock").text(this.sym.toUpperCase())

                        $("thead").append("<tr> <td id='shade'>" + this.sym.toUpperCase() + "</td> <td>" + this.today + "</td> <td>" + this.month.close_1 + "</td> <td>" + this.month.open_2 + "</td> <td>" + this.month.close_2 + "</td> <td>" + this.month.open_3 + "</td> <td>" + this.month.low_1 + "</td> <td>" + this.month.low_2 + "</td> <td>" + this.now.close_1 + "</td> <td>" + this.now.open_2 + "</td> <td>" + this.now.close_2 + "</td> <td>" + this.now.open_3 + "</td> <td>" + this.now.low_1 + "</td> <td>" + this.now.low_2 + "</tr>")
                    }

                });
            }



            // if downtrend
            if (this.month.close_1 < this.month.open_2 && this.month.close_2 > this.month.open_3) {
                $("#condition").text("DOWNTREND");
                $("#results").text("BUY " + this.downtrendBuyLimit + " SELL " + this.downtrendSellLimit)
                console.log("downtrend found " + this.downtrendSellLimit);


                $.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data) => {

                    this.now = {

                        ticker: data["Meta Data"]["2. Symbol"],

                        open: Number(data[this.dailyTimeSeries][this.day_3][this.open]),
                        high_1: Number(data[this.dailyTimeSeries][this.day_3][this.high]),
                        low_1: Number(data[this.dailyTimeSeries][this.day_3][this.low]),
                        close_1: Number(data[this.dailyTimeSeries][this.day_3][this.close]),
                        volume_1: Number(data[this.dailyTimeSeries][this.day_3][this.volume]),

                        open_2: Number(data[this.dailyTimeSeries][this.day_2][this.open]),
                        high_2: Number(data[this.dailyTimeSeries][this.day_2][this.high]),
                        low_2: Number(data[this.dailyTimeSeries][this.day_2][this.low]),
                        close_2: Number(data[this.dailyTimeSeries][this.day_2][this.close]),
                        volume_2: Math.round(Number(data[this.dailyTimeSeries][this.day_2][this.volume])),

                        open_3: Number(data[this.dailyTimeSeries][this.today][this.open]),
                        high_3: Number(data[this.dailyTimeSeries][this.today][this.high]),
                        low_3: Number(data[this.dailyTimeSeries][this.today][this.low]),
                        close_3: Number(data[this.dailyTimeSeries][this.today][this.close]),
                        volume_3: Number(data[this.dailyTimeSeries][this.today][this.volume]),

                        mclose: "",
                        mlow: "",
                        mpullback: "",
                        gap: "",
                        mvolume: ""
                    }

                    //Algorithm: ===========================================================================================
                    //Check if candle 1 high and lows are higher than candle 2
                    //Check if candle 2 close is less than candle 3 open


                    if (this.now.close_1 < this.now.open_2 && this.now.close_2 > this.now.open_3) {
                        this.dailyTrend = true;
                    } else {
                        this.dailyTrend = false;
                    }


                    if (this.ddecdailyTrend == true) {

                        $("#checkSetup").text("check")
                        console.log(true, "Signal found")
                        this.signal = "BUY PUT"
                        $("$signal").text("BUY PUT")
                        $("#stock").text(this.sym.toUpperCase())

                        $("thead").append("<tr> <td id='shade'>" + this.sym.toUpperCase() + "</td> <td>" + this.today + "</td> <td>" + this.month.close_1 + "</td> <td>" + this.month.open_2 + "</td> <td>" + this.month.close_2 + "</td> <td>" + this.month.open_3 + "</td> <td>" + this.month.low_1 + "</td> <td>" + this.month.low_2 + "</td> <td>" + this.now.close_1 + "</td> <td>" + this.now.open_2 + "</td> <td>" + this.now.close_2 + "</td> <td>" + this.now.open_3 + "</td> <td>" + this.now.low_1 + "</td> <td>" + this.now.low_2 + "</td> <td>" + this.trend + "</td> <td>" + this.reversal + "</td> <td>" + this.signal + "</tr>")

                    } else {

                        $("#checkSetup").text("CHECK TOMORROW")
                        console.log(false, "No day signal found yet")
                        this.signal = "NO BUY"

                        $("#signal").text("CHECK TOMORROW")
                        $("#stock").text(this.sym.toUpperCase())

                        $("thead").append("<tr> <td id='shade'>" + this.sym.toUpperCase() + "</td> <td>" + this.today + "</td> <td>" + this.month.close_1 + "</td> <td>" + this.month.open_2 + "</td> <td>" + this.month.close_2 + "</td> <td>" + this.month.open_3 + "</td> <td>" + this.month.low_1 + "</td> <td>" + this.month.low_2 + "</td> <td>" + this.now.close_1 + "</td> <td>" + this.now.open_2 + "</td> <td>" + this.now.close_2 + "</td> <td>" + this.now.open_3 + "</td> <td>" + this.now.low_1 + "</td> <td>" + this.now.low_2 + "</tr>")
                    }

                });

            } else {
                $("#signal").text("BAD APPLE")
                $("#results").text("BUY " + this.downtrendBuyLimit, "SELL " + this.downtrendSellLimit)
            }




            //If Stock is found then add it to a watchlist


        })
    }

    init() {

        this.ifWeekend()
        this.ifHoliday()
        this.ifMarketHours()
        this.ifLastDayOfMonth()
        this.getLogo()
        this.getMonth()

    }

}





