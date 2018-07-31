
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

class Algo {

    constructor(sym) {

        // Stock Symbol
        this.sym = sym;

        //Watch List
        this.watchList = [];

        // Present Time
        this.currentTime = new Date.now().toString("h:mm:s")
        this.presentTime = Date.now().toString("yyyy-MM-dd H:mm:ss");
        this.timeCheck = Date.now().toString("H:mm");

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

        this.td = "<td>";
        this.tdC = "</td>";
        this.tr = "<tr>";
        this.trC = "</tr>";
        this.next = "";

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
        if (this.timeCheck > "09:30" || this.timeCheck < "16:00" && this.day != "Sat" || "Sun") {
            console.log("Market Is closed, current time is " + this.currentTime + " but today is " + this.day);
        }
        else if (this.timeCheck > "09:30" || this.timeCheck < "16:00") {
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

    init() {

        this.ifWeekend()
        this.ifHoliday()
        this.ifMarketHours()
        this.ifLastDayOfMonth()
    }

    getMonth() {

        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data) => {

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

                mclose: "",
                mlow: "",
                mpullback: "",
                gap: "",
                mvolume: ""
            }

            //Algorithm: ===========================================================================================
            //Check if candle 1 high and lows are higher than candle 2
            //Check if candle 2 close is less than candle 3 open


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

            //Calculate Decision
            this.decision = +this.month.mpullback + +this.month.mlow;

            //If Stock is found then add it to a watchlist
            if (this.decision == 1) {
                this.watchList.push(this.sym) 
                console.log(true)
                console.log("added " + this.watchList + " to watchlist");
                console.log(this.watchList);
            } else {
                console.log(false)
            }
        });
    }

    getDay() {

        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data) => {

            this.month = {

                ticker: data["Meta Data"]["2. Symbol"],

                open: Number(data[this.dailyTimeSeries][this.month_1][this.open]),
                high_1: Number(data[this.dailyTimeSeries][this.month_1][this.high]),
                low_1: Number(data[this.dailyTimeSeries][this.month_1][this.low]),
                close_1: Number(data[this.dailyTimeSeries][this.month_1][this.close]),
                volume_1: Number(data[this.dailyTimeSeries][this.month_1][this.volume]),

                open_2: Number(data[this.dailyTimeSeries][this.month_2][this.open]),
                high_2: Number(data[this.dailyTimeSeries][this.month_2][this.high]),
                low_2: Number(data[this.dailyTimeSeries][this.month_2][this.low]),
                close_2: Number(data[this.dailyTimeSeries][this.month_2][this.close]),
                volume_2: Math.round(Number(data[this.dailyTimeSeries][this.month_2][this.volume])),

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

            //Calculate Decision
            this.decision = +this.month.mpullback + +this.month.mlow;

            if (this.decision == 2) {
                console.log(true)
            } else {
                console.log(false)
                console.log("No signal found yet")
            }

        });
    }
}

