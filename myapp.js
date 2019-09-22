/*The theology is to trade the pullbacks within the reversals

1. First predict the reversal on the monthly trendline
2. Find the pullbacks within the weekly trendlines
3. Triggers buy or sell signals 
4. Calculates limit orders on when to buy and when to sell*/


function progress(percent, text, id) {

    //Reset progress bar back to 0%
    $("#symbol").click(function () {
        $(".progress-bar").css("width", "0%").text("0% COMPLETE")
    })

    //Expand main progress bar to desired length
    $(".progress-bar").css("width", percent).text(text);

    //Expand current progress bar to desired length
    $(id).css("width", percent).text(text);
}

function progressCol2(id) {

    //Reset progress bar back to 0%
    $("#symbol").click(function () {
        $(id).css("width", "0%").text("0% COMPLETE")
    })

    //Expand current progress bar to desired length
    $(id).css("width", "100%").text("100% COMPLETE");
}

class Algo {

    constructor(sym) {

        // Stock Symbol
        this.sym = $('#symbol').val()

        //Watch List
        this.watchList = [];

        //Market Hours
        this.MarketHours = "unknown"

        // Present Time
        this.currentTime = new Date.now().toString("hh:mm:ss")
        this.presentTime = Date.now().toString("hh:mm:ss");
        this.timeCheck = Date.now().toString("HH:MM:ss");

        //Api Key
        this.apiKey = "JSEZ8SK1RA528ZXU";
        this.apiKeyDay = "CCEPGL1HNEPTKDWQ"
        this.apiKeyWeek = "CIH0JUFAPPVA97BP";

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
        this.week_1 = Date.today().friday().addWeeks(-3).toString("yyyy-MM-dd");
        this.week_2 = Date.today().friday().addWeeks(-2).toString("yyyy-MM-dd");

        // Month
        this.month_1 = Date.today().add(-2).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");
        this.month_2 = Date.today().add(-1).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");

        $("#signal_des").text();
        $("#signal").text("SCANNING");

        this.init()
    }

    dates() {

        $("#low_date_1").text(this.month_1)
        $("#low_date_2").text(this.month_2)

        $("#high_date_1").text(this.month_1)
        $("#high_date_2").text(this.month_2)

        $("#gap_date_1").text(this.month_1)
        $("#gap_date_2").text(this.month_2)
        $("#gap_date_3").text(this.today)
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

        progress("20%", "20% COMPLETE")

    }

    // Check if the Stock Market is open or closed, 9:30am - 4pm est
    ifMarketHours() {

        //If opened
        if (this.presentTime > "09:30:00" && this.presentTime < "16:00:00") {
            console.log("Markethours opened")

            this.MarketHours = 'opened';

            if (this.MarketHours == "opened" && Date.today().is().monday()) {

                this.day_2 = Date.today().add(-4).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-5).days().toString("yyyy-MM-dd");
            }

            console.log("Market Is Opened, current time is " + this.currentTime);

            //If closed
        } else {
            console.log("Markethours closed")
            this.MarketHours = 'closed';

            if (this.MarketHours == "closed" && Date.today().is().monday()) {

                this.today = Date.today().add(-3).days().toString("yyyy-MM-dd");
                this.day_2 = Date.today().add(-4).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-5).days().toString("yyyy-MM-dd");

            } else if (this.MarketHours == "closed" && Date.today().is().tuesday()) {

                this.day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-4).days().toString("yyyy-MM-dd");

            } else if (this.MarketHours == "closed" && Date.today().is().wednesday()) {

                this.day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-2).days().toString("yyyy-MM-dd");

            } else if (this.MarketHours == "closed" && Date.today().is().thursday()) {

                this.day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-2).days().toString("yyyy-MM-dd");

            } else if (this.MarketHours == "closed" && Date.today().is().friday()) {

                this.day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-2).days().toString("yyyy-MM-dd");

            }
            //if time is past midnight but before opening bell
            console.log("time function has been removed for now")
            //TESTING PURPOSES!!!======================================
            /* if (this.timeCheck > "00:00:00" && this.timeCheck < "09:30:00") {
                 this.today = Date.today().add(-1).days().toString("yyyy-MM-dd");
                 this.day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
                 this.day_3 = Date.today().add(-5).days().toString("yyyy-MM-dd");
 
             }*/

            this.presentTime = new Date.now().toString(this.today + " 16:00:00");

            console.log("Market is closed, will revert to 4:00 pm yesterday for testing purposes");
            console.log(this.presentTime)
            console.log("Today " + this.today, "Day 2 " + this.day_2, "Day 3 " + this.day_3)
        }

        progress("40%", "40% COMPLETE")
        console.log(this.presentTime);

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
            console.log('Checking if today is a weekend... Looks like Today is ' + this.day);
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
            console.log('Checking if the day is the weekend on the month 1 timeframe... Looks like its ' + this.day);
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
            console.log('Checking if the day is the weekend on the month 2 timeframe... Looks like its ' + this.day);
        }

        progress("60%", "60% COMPLETE")

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

        progress("80%", "80% COMPLETE")

    }

    //Request logo via api call DISCONTINUED:
    /*getLogo() {

        $.get("https://api.iextrading.com/1.0/stock/" + this.sym + "/logo", function (data, status) {
            console.log(data.url)

            if (data.message == "data is not defined") {

                alert("invalid stock, please check spelling and try again.")
            } else {

                $("img#logo").attr('src', data.url);

            }

        })

    }*/

    //Determine monthly trendline by analyzing the stock ohlc data via api call
    getMonth() {

        //api call for the month timeframe
        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data, status) => {

            if (data.Information) {
                console.log("rate limit hit for " + this.sym + " Please use another symbol")
                alert("Rate limit has been reached for " + this.sym.toUpperCase() + " Please check your list for previously checked symbols. Use another stock symbol")
            }

            //If stock is not supported
            if (data["Meta Data"]["3. Last Refreshed"] < this.today) {
                $("#signal").text("UNAVAILABLE")
                $("#signal_des").text("Our apologizes, it seems " + this.sym + " is not supported with our app. Usually this error happens if the stock / option has went to otc or nyse has simply removed it from trading. If you find this error incorrect please contact us.")
            }

            console.log(this.today)

            //Get MONTH ohlc data
            this.month = {

                ticker: data["Meta Data"]["2. Symbol"],

                open_1: Number(data[this.monthlyTimeSeries][this.month_1][this.open]),
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
                volume_3: Number(data[this.monthlyTimeSeries][this.today][this.volume])
            }

            /*===================================================================================================== */

            //Limit order formulas

            //Uptrend
            this.uptrend_Buy = (Number(this.month.open_3).toFixed(2));
            this.uptrend_Sell = (Number(this.month.high_2 - this.month.low_2 + this.month.close_2) - .05).toFixed(2);
            this.uptrend_Profit = "$" + (Number(this.month.high_2 - this.month.low_2) - .05).toFixed(2);

            //Downtrend
            this.downtrend_Buy = (Number(this.month.open_3)).toFixed(2);
            this.downtrend_Sell = Number(this.month.close_2 - (this.month.high_2 - this.month.low_2)).toFixed(2);
            this.downtrend_Profit = "$" + Number(this.month.high_2 - this.month.low_2).toFixed(2);

            //Formulas
            this.high = this.month.high_1 > this.month.high_2
            this.low = this.month.low_1 > this.month.low_2
            this.close = this.month.close_1 > this.month.close_2
            this.gap = this.month.close_2 < this.month.open_3

            /*===================================================================================================== */

            // Checking for Uptrend
            if (this.high == true && this.low == true && this.close == true && this.gap == true) {

                $("#signalMonth").text("CALL")

                //ADDING TO WATCHLIST
                this.watchList.push(this.sym)

                $("tbody").append(
                "<tr> <td> MONTHLY </td> <td> CALL - only trade uptrends  </td> <td>"
                + this.sym.toUpperCase() + "</td> <td>"
                + this.uptrend_Buy + "</td> <td>"
                + this.uptrend_Sell + "</td><td>"
                + this.uptrend_Profit + "</tr></td>")                
                console.log("monthly uptrend found, now executing weekly trend")
                this.getWeek()
                /*===================================================================================================== */


            }

            //Checking for Downtrend
            else if (this.high == false && this.low == false && this.close == false && this.gap == false) {
                debugger;
                $("#signalMonth").text("PUT")

                this.watchList.push(this.sym)
                $("tbody").append(
                "<tr> <td> MONTHLY </td> <td> CALL </td> <td>"
                + this.sym.toUpperCase() + "</td> <td>"
                + this.downtrend_Buy + "</td> <td>"
                + this.downtrend_Sell + "</td><td>"
                + this.downtrend_Profit + "</tr></td>") 
                console.log("monthly downtrend found, now executing weekly trend")
                this.getWeek()

            } else {
                $("#signalMonth").text("NO SIGNAL FOUND")
                // $("#signal_des").text("No setup found for this stock / option. Will not add to watchlist, please check another stock / option")

            }
        })

        progress("33%", "33% COMPLETE")

}
    
    getWeek() {

        //api call for the month timeframe
        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" + this.sym + "&apikey=" + this.apiKeyWeek, (data, status) => {

            //Check for errors
            if (data.Information) {
                console.log("rate limit hit for " + this.sym + " Please use another symbol")
                alert("Rate limit has been reached for " + this.sym.toUpperCase() + " Please check your list for previously checked symbols. Use another stock symbol")
            }

            //Get WEEK ohlc data
            this.week = {

                ticker: data["Meta Data"]["2. Symbol"],

                open_1: Number(data[this.weeklyTimeSeries][this.week_1][this.open]),
                high_1: Number(data[this.weeklyTimeSeries][this.week_1][this.high]),
                low_1: Number(data[this.weeklyTimeSeries][this.week_1][this.low]),
                close_1: Number(data[this.weeklyTimeSeries][this.week_1][this.close]),
                volume_1: Number(data[this.weeklyTimeSeries][this.week_1][this.volume]),

                open_2: Number(data[this.weeklyTimeSeries][this.week_2][this.open]),
                high_2: Number(data[this.weeklyTimeSeries][this.week_2][this.high]),
                low_2: Number(data[this.weeklyTimeSeries][this.week_2][this.low]),
                close_2: Number(data[this.weeklyTimeSeries][this.week_2][this.close]),
                volume_2: Math.round(Number(data[this.weeklyTimeSeries][this.week_2][this.volume])),

                open_3: Number(data[this.weeklyTimeSeries][this.today][this.open]),
                high_3: Number(data[this.weeklyTimeSeries][this.today][this.high]),
                low_3: Number(data[this.weeklyTimeSeries][this.today][this.low]),
                close_3: Number(data[this.weeklyTimeSeries][this.today][this.close]),
                volume_3: Number(data[this.weeklyTimeSeries][this.today][this.volume])
            }

            //Limit order formulas

            //Uptrend
            this.uptrend_Buy = (Number(this.week.open_3).toFixed(2));
            this.uptrend_Sell = (Number(this.week.high_2 - this.week.low_2 + this.week.close_2) - .05).toFixed(2);
            this.uptrend_Profit = "$" + (Number(this.week.high_2 - this.week.low_2) - .05).toFixed(2);

            //Downtrend
            this.downtrend_Buy = (Number(this.week.open_3)).toFixed(2);
            this.downtrend_Sell = Number(this.week.close_2 - (this.week.high_2 - this.week.low_2)).toFixed(2);
            this.downtrend_profit = "$" + Number(this.week.high_2 - this.week.low_2).toFixed(2);

            //Formulas
            this.high = this.week.high_1 > this.week.high_2
            this.low = this.week.low_1 > this.week.low_2
            this.close = this.week.close_1 > this.week.close_2
            this.gap = this.week.close_2 < this.week.open_3

            // Checking for Uptrend
            if (this.high == true && this.low == true && this.close == true && this.gap == true) {

                //GAP OHLC     
                $("#signalWeek").text("CALL")
                progressCol2("close_progress")

                //SIGNAL
                console.log("uptrend found, now executing day trend")
                this.getDay()

                progress("75%", "75% COMPLETE")

                // Adding to watchlist
                this.watchList.push(this.sym)
                console.log("added " + this.watchList + " to watchlist");
                console.log("uptrend found " + this.uptrend_Sell)
                console.log("weekly downtrend now!")

                //Checking for trend    

                //====================================================================

                //Checking for Downtrend
            } else if (this.high == false && this.low == false && this.close == false && this.gap == false) {

                //GAP OHLC     
                $("#signalWeek").text("PUT")
                progressCol2("close_progress")

                //SIGNAL

                console.log("downtrend found, now executing day trend")
                this.getDay()

                // Adding to watchlist
                this.watchList.push(this.sym)
                console.log("added " + this.watchList + " to watchlist");
                console.log("downtrend found " + this.downtrend_Sell)
                console.log("weekly downtrend found!")

                //Checking for trend    
            } else {
                console.log("no weekly signal found")
                $("#signalWeek").text("NO WEEKLY SIGNAL FOUND")
                $("#signal_des").text("No setup found for this stock / option. Will not add to watchlist, please check another stock / option")

            }
        })

        progress("75%", "75% COMPLETE")

    }

    getDay() {
        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.sym + "&apikey=" + this.apiKeyDay, (data) => {

            this.now = {

                ticker: data["Meta Data"]["2. Symbol"],

                open_1: Number(data[this.dailyTimeSeries][this.day_3][this.open]),
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

            //Daily Downtrend
            this.downtrend_Day_Buy = (Number(this.now.open_3)).toFixed(2);
            this.downtrend_Day_Sell = Number(this.month.close_2 - (this.month.high_2 - this.month.low_2) * 0.1).toFixed(2);
            this.downtrend_Current_Price = Number(data[this.dailyTimeSeries][this.today][this.close])

            //Formulas
            this.high = this.day.high_1 > this.day.high_2
            this.low = this.day.low_1 > this.day.low_2
            this.close = this.day.close_1 > this.day.close_2
            this.gap = this.day.close_2 < this.day.open_3

            if (this.high == true && this.low == true && this.close == true && this.gap == true) {

                //GAP OHLC     
                $("#close_1").text(this.month.close_1)

                this.dates()

                $("#signalDay").text("PUT")
                $("#signal_des").text("Ready to sell. We added it to the watchlist. Please review your stock chart to confirm the reversal. Sell at your own risk")

                progress("100%", "100% COMPLETE")

                $("tbody").append("<tr><td> PUT / SELL </td> <td>"
                    + this.sym.toUpperCase() + "</td> <td>"
                    + this.downtrend_Buy + "</td> <td>"
                    + this.downtrend_Sell + "</td><td>"
                    + this.downtrend_profit + "</tr></td>")
                console.log(true, "signal found")

            } else {

                this.dates()

                $("#signalDay").text("ALMOST")
                $("#signal_des").text("This stock checks off on our monthly setup but not our daily setup. We added it to the watchlist. Run it again tomorrow to check for a sell signal")

                progress("100%", "100% COMPLETE")

                $("tbody").append("<tr><td> DONT TRADE YET </td> <td>"
                    + this.sym.toUpperCase() + "</td> <td>"
                    + this.downtrend_Day_Sell + "</td> <td>"
                    + this.downtrend_Sell + "</td><td>"
                    + this.downtrend_profit + "</tr></td>")

                console.log(false, "No day signal found yet")

            }

            // Check if the buy limit is less then the sell limit
            if (this.downtrend_Current_Price < this.downtrend_Day_Sell) {
                $("#signalDay").text("MISSED PUT / SELL")
                $("#signal_des").text("ATTENTION!!! You have missed any of our suggested entry points for this stock / option. We advise to check beginning of next month or try another stock / option")
                progress("100%", "100% COMPLETE")
            }

        });
    }

    init() {

        this.ifWeekend()
        this.ifHoliday()
        this.ifMarketHours()
        this.ifLastDayOfMonth()
        //this.getLogo()
        this.getMonth()

    }
}








