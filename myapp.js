
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


//Option Symbols
var gainers = [];

//Api Key
var apiKey = "JSEZ8SK1RA528ZXU";

// Present Time
var presentTime = Date.now().toString("yyyy-MM-dd H:mm:ss")
var timeCheck = Date.now().toString("H");

// Days
var day = Date.today().toString()[0] + Date.today().toString()[1] + Date.today().toString()[2];
var today = Date.today().toString("yyyy-MM-dd");
var day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
var day_3 = Date.today().add(-2).days().toString("yyyy-MM-dd");

// Weeks
var friday_1 = Date.today().friday().addWeeks(-3).toString("yyyy-MM-dd");
var friday_2 = Date.today().friday().addWeeks(-2).toString("yyyy-MM-dd");

// Month
var month_1 = Date.today().add(-2).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");
var month_2 = Date.today().add(-1).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");



//Checking if its a Holiday
function ifHoliday() {
    if (today == Date.today().toString("yyyy-01-01") || today == Date.today().toString("yyyy-01-15") || today == Date.today().toString("yyyy-02-19") || today == Date.today().toString("yyyy-03-29") || today == Date.today().toString("yyyy-03-30") || today == Date.today().toString("yyyy-05-27") || today == Date.today().toString("yyyy-05-28") || today == Date.today().toString("yyyy-07-03") || today == Date.today().toString("yyyy-07-04") || today == Date.today().toString("yyyy-05-08") || today == Date.today().toString("yyyy-09-03") || today == Date.today().toString("yyyy-11-12") || today == Date.today().toString("yyyy-11-22") || today == Date.today().toString("yyyy-11-23") || today == Date.today().toString("yyyy-12-24") || today == Date.today().toString("yyyy-12-25") || today == Date.today().toString("yyyy-12-31")) {

        today = Date.today().add(-1).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        console.log("Its a holiday, converting to testing mood");

    } else {

        console.log("Its not a holiday");
    }
}

// Checking if time ranges between midnight and 8:00am - for testing purposes only
function ifTimeRange() {
    if (Date.now().toString("hh:mm:ss") > "00:00:00" && Date.now().toString("hh:mm:ss") < "08:00:00") {
        today = Date.today().add(-1).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        console.log(today)

    } else {
        console.log("Is it 12am - 8am? " + false)
    }
}

// Check if today is a weekend
function ifWeekend() {

    //Checking Day TimeFrame
    if (day == "Mon") {
        console.log("Today is Monday, executing ifWeekend function")
        today = Date.today().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

    } else if (day == "Sat") {
        console.log("Today is Saturday, executing ifWeekend function")
        presentTime = Date.today().add(-1).days().toString("yyyy-MM-dd 16:00:00");
        today = Date.today().add(-1).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");

    } else if (day == "Sun") {
        console.log("Today is Sunday, executing ifWeekend function")
        today = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

    } else {
        console.log('Checking if today is Monday... Looks like Today TimeFrame is ' + day);
    }

    //Checking Month_1 TimeFrame
    if (month_1 == "Mon") {
        console.log("Today is Monday, executing ifWeekend function")
        today = Date.today().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

    } else if (month_1 == "Sat") {
        console.log("Today is Saturday, executing ifWeekend function")
        presentTime = Date.today().add(-1).days().toString("yyyy-MM-dd 16:00:00");
        today = Date.today().add(-1).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");

    } else if (month_1 == "Sun") {
        console.log("Today is Sunday, executing ifWeekend function")
        today = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

    } else {
        console.log('Checking if today is Monday... Looks like Month_1 TimeFrame is ' + day);
    }

    //Checking Month_2 TimeFrame
    if (month_2 == "Mon") {
        console.log("Today is Monday, executing ifWeekend function")
        today = Date.today().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

    } else if (month_2 == "Sat") {
        console.log("Today is Saturday, executing ifWeekend function")
        presentTime = Date.today().add(-1).days().toString("yyyy-MM-dd 16:00:00");
        today = Date.today().add(-1).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-3).days().toString("yyyy-MM-dd");

    } else if (month_2 == "Sun") {
        console.log("Today is Sunday, executing ifWeekend function")
        today = Date.today().add(-2).days().toString("yyyy-MM-dd");
        day_2 = Date.today().add(-3).days().toString("yyyy-MM-dd");
        day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

    } else {
        console.log('Checking if today is Monday... Looks like Month_2 TimeFrame is ' + day);
    }
}

// Check if the time is above 16:00:00
function ifTimeAbove() {
    if (timeCheck > "16" || timeCheck < "09") {
        console.log("Present Time is greater than 16, will revert to 16:00:00");
        presentTime = new Date.now().toString("yyyy-MM-dd 16:00:00");
    } else {
        console.log("Present Time is " + presentTime);
    }
}

// Checking if last day of month is a friday
function ifLastDayOfMonth() {
    if (Date.parse(month_1).is().sun() || Date.parse(month_1).is().sat() == true) {
        month_1 = Date.parse(month_1).last().friday().toString("yyyy-MM-dd");
    } else {
        console.log("month_1 is friday");
    }

    if (Date.parse(month_2).is().sun() || Date.parse(month_2).is().sat() == true) {
        month_2 = Date.parse(month_2).last().friday().toString("yyyy-MM-dd");
    } else {
        console.log("month_2 is friday")
    }
}

// Self execute all error checking functions
(function errorCheck() {
    ifHoliday()
    // ifTimeRange()
    ifTimeAbove()
    ifLastDayOfMonth()
})()



// Time Series 
var dailyTimeSeries = "Time Series (Daily)";
var weeklyTimeSeries = "Weekly Time Series";
var monthlyTimeSeries = "Monthly Time Series";

var open = "1. open";
var open1 = "1. open";
var high = "2. high";
var low = "3. low";
var close = "4. close";
var volume = "5. volume";

var td = "<td>";
var tdC = "</td>";
var tr = "<tr>";
var trC = "</tr>";
var next = "";

//Sleep Function
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

//Algorithm ==============================================================================
class Algo {
    constructor(sym) {
        this.sym = sym;
    }

    run() {
        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + this.sym + "&apikey=" + apiKey, function (data) {

            this.month = {

                ticker: data["Meta Data"]["2. Symbol"],
                open: Number(data["Monthly Time Series"]["2018-05-31"]["1. open"]),

                high_1: Number(data[monthlyTimeSeries][month_1][high]),
                low_1: Number(data[monthlyTimeSeries][month_1][low]),
                close_1: Number(data[monthlyTimeSeries][month_1][close]),
                volume_1: Number(data[monthlyTimeSeries][month_1][volume]),

                open_2: Number(data[monthlyTimeSeries][month_2][open]),
                high_2: Number(data[monthlyTimeSeries][month_2][high]),
                low_2: Number(data[monthlyTimeSeries][month_2][low]),
                close_2: Number(data[monthlyTimeSeries][month_2][close]),
                volume_2: Math.round(Number(data[monthlyTimeSeries][month_2][volume])),

                open_3: Number(data[monthlyTimeSeries][today][open]),
                high_3: Number(data[monthlyTimeSeries][today][high]),
                low_3: Number(data[monthlyTimeSeries][today][low]),
                close_3: Number(data[monthlyTimeSeries][today][close]),
                volume_3: Number(data[monthlyTimeSeries][today][volume]),

                mclose: "",
                mlow: "",
                mpullback: "",
                gap: "",
                mvolume: ""

            }

            var diff = this.month.close_2 * 0.0044;
            var equate = diff + this.month.close_2;
            var gap = equate.toFixed(2);
            console.log("gap " + gap)

            //Algorithm: ===========================================================================================
            //Call pattern checks 3 candles. If candle 1 close & low is greater than candle 2 close & low and candle 2 close is less than candle 3 open.       

            // Check if candle 1 low is greater than candle 2 low
            if (this.month.low_1 > this.month.low_2) {
                this.month.mlow = +1
            } else {
                this.month.mlow = 0
            }

            // Check if candle 2 close is less than candle 3 open
            if (this.month.close_2 < this.month.open_3) {
                this.month.mpullback = +1
            } else {
                this.month.mpullback = 0
            }

            //Check if candle 3 open is greater than or equal to candle close 2 with a gap of minimum 0.44%
            if (gap >= this.month.open_3) {
                this.month.gap = +1
            } else {
                this.month.gap = 0
            }

            //Check if volume is over 9 million
            if (this.month.volume_2 > 90000) {
                this.month.mvolume = +1
            } else {
                this.month.mvolume = +1
                this.month.mvolume = 0
            }

            //Calculate Decision
            var decision = +this.month.mpullback + +this.month.mlow + +this.month.gap + +this.month.mvolume;

            if (decision == 4) {
                console.log("Month Symbol Match Found! CALL " + this.month.ticker, this.month.mpullback, this.month.mlow, this.month.gap, this.month.mvolume + " Decision " + decision + " CALL <<<====================================")
                this.monthSymbol.push(this.month.ticker);
                $("#table").append(
                    tr +
                    td + this.month.ticker + tdC +
                    td + "CALL " + tdC +
                    td + "MONTH " + tdC +
                    td + "FOUND SIGNAL " + tdC +
                    trC
                );

            } else if (decision == 20) {
                console.log("Month Symbol Match Found! " + this.month.ticker, this.month.mpullback, this.month.mlow, this.month.gap, this.month.mvolume, " Decision " + decision, " PUT <<<====================================")
                this.monthSymbol.push(this.month.ticker);
                $("#table").append(
                    tr +
                    td + this.month.ticker + tdC +
                    td + "PUT " + tdC +
                    td + "MONTH " + tdC +
                    td + "FOUND SIGNAL " + tdC +
                    trC
                );

            } else {
                console.log("No Signal Found! " + this.month.ticker, this.month.mpullback, this.month.mlow, this.month.mclose, this.month.gap, this.month.mvolume, " Decision " + decision)
            }
        });
    }
}
