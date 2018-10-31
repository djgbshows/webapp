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
        this.presentTime = Date.now().toString("yyyy-MM-dd hh:mm:ss");
        this.timeCheck = Date.now().toString("HH:MM:ss");


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

        $("#signal_des").text();
        $("#signal").text("SCANNING");

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



        progress("20%", "20% COMPLETE")

    }

    // Check if the Stock Market is open or closed, 9:30am - 4pm est
    ifMarketHours() {

        //If opened
        if (this.timeCheck > "09:30:00" && this.timeCheck < "16:00:00") {

            this.MarketHours = 'opened';

            if (this.MarketHours == "opened" && Date.today().is().monday()) {

                this.day_2 = Date.today().add(-4).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-5).days().toString("yyyy-MM-dd");
            }

            console.log("Market Is Opened, current time is " + this.currentTime);

            //If closed
        } else {

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
            //TESTING PURPOSES!!!======================================
            if (this.timeCheck > "00:00:00" && this.timeCheck < "09:30:00") {
                this.today = Date.today().add(-1).days().toString("yyyy-MM-dd");
                this.day_2 = Date.today().add(-2).days().toString("yyyy-MM-dd");
                this.day_3 = Date.today().add(-5).days().toString("yyyy-MM-dd");

            }

            this.presentTime = new Date.now().toString(this.today + " 16:00:00");

            console.log("Market is closed, will revert to 4:00 pm yesterday for testing purposes");
            console.log(this.presentTime)
            console.log("Today " + this.today, "Day 2 " + this.day_2, "Day 3 " + this.day_3)
        }

        progress("40%", "40% COMPLETE")

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

    //Request logo via api call
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

    //Determine trend by analyzing stock ohlc data for the month via api call
    getMonth() {

        //api call
        $.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data, status) => {


            //Check for errors
            if (data.Information) {
                console.log("rate limit hit for " + this.sym + " Please use another symbol")
                alert("Rate limit has been reached for " + this.sym.toUpperCase() + " Please check your list for previously checked symbols. Use another stock symbol")
            }

            
           if(data["Meta Data"]["3. Last Refreshed"] < this.today ){
            $("#signal").text("UNAVAILABLE")
            $("#signal_des").text("Our apologizes, it seems " + this.sym + " is not supported with our app. Usually this error happens if the stock / option has went to otc or nyse has simply removed it from trading. If you find this error incorrect please contact us.")
           }
            

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

            //Limit order formulas

            //Uptrend
            this.uptrend_Buy = (Number(this.month.open_3).toFixed(2));
            this.uptrend_Sell = (Number(this.month.high_2 - this.month.low_2 + this.month.close_2) - .05).toFixed(2);
            this.uptrend_Profit = "$" + (Number(this.month.high_2 - this.month.low_2) - .05).toFixed(2);


            //Downtrend
            this.downtrend_Buy = (Number(this.month.open_3)).toFixed(2);
            this.downtrend_Sell = Number(this.month.close_2 - (this.month.high_2 - this.month.low_2)).toFixed(2);
            this.downtrend_profit = "$" + Number(this.month.high_2 - this.month.low_2).toFixed(2);

            console.log("uptrend buy " + this.uptrend_Buy)
            console.log("uptrend sell " + this.uptrend_Sell)
            console.log("downtrend buy " + this.downtrend_Buy)
            console.log("downtrend sell " + this.downtrend_Sell)
            // Checking for Uptrend
            if (this.month.high_1 && this.month.low_1 && this.month.close_1 > this.month.high_2 && this.month.low_2 && this.month.close_2 && this.month.close_2 < this.month.open_3) {

                //HIGH OHLC
                $("#trend").text("UPTREND")
                $("#high_1").text(this.month.high_1)
                $("#high_2").text(this.month.high_2)
                $("#open_3").text(this.month.open_3)

                //LOW OHLC
                $("#low_trend").text("UPTREND")
                $("#low_1").text(this.month.low_1)
                $("#low_2").text(this.month.low_2)
                progressCol2("low_progress")

                //GAP OHLC     
                $("#close_trend").text("UPTREND")
                $("#close_1").text(this.month.close_1)
                $("#close_2").text(this.month.close_2)
                $("#open_3").text(this.month.open_3)
                progressCol2("close_progress")

                // Adding to watchlist
                this.watchList.push(this.sym)
                console.log("added " + this.watchList + " to watchlist");
                console.log("uptrend found " + this.sellLimit)

                //Daily timeframe api call=======================================================================================
                $.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data) => {

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

                    //Daily Uptrend
                    this.uptrend_Day_Buy = (Number(this.now.open_3).toFixed(2));
                    this.uptrend_Day_Sell = (Number(this.now.high_2 - this.now.low_2 + this.now.close_2) - .05).toFixed(2);

                    if (this.now.high_1 && this.now.low_1 && this.now.close_1 > this.now.high_2 && this.now.low_2 && this.now.close_2 && this.now.close_2 < this.now.open_3) {

                        //GAP OHLC     
                        $("#close_1").text(this.month.low_1)
                        $("#close_2").text(this.month.low_2)
                        $("#open_3").text(this.now.open_3)
                        $("#stock").text(this.sym.toUpperCase())
                        $("#stock").text(this.sym.toUpperCase())
                        $("#signal").text("CALL / BUY")
                        $("#signal_des").text("This stock checks off on our monthly setup and our daily setup. We added it to the watchlist. Please review your stock chart to confirm the reversal. Purchase at your own risk")

                        progressCol2("close_progress")

                        $("thead").append("<tr><td> CALL / BUY </td> <td>"
                            + this.sym.toUpperCase() + "</td> <td>"
                            + this.uptrend_Day_Buy + "</td> <td>"
                            + this.uptrend_Sell + "</td><td>"
                            + this.uptrend_Profit + "</tr></td>")

                        console.log(true, "signal found")

                    } else {

                        //GAP OHLC     
                        $("#close_1").text(this.month.low_1)
                        $("#close_2").text(this.month.low_2)
                        $("#open_3").text(this.now.open_3)
                        $("#stock").text(this.sym.toUpperCase())
                        $("#stock").text(this.sym.toUpperCase())
                        $("#signal").text("ALMOST")
                        $("#signal_des").text("This stock checks off on our monthly setup but not our daily setup. We added it to the watchlist. Run it again tomorrow to check for a buy signal")

                        progressCol2("close_progress")

                        $("thead").append("<tr><td> DONT TRADE YET </td> <td>"
                            + this.sym.toUpperCase() + "</td> <td>"
                            + this.uptrend_Day_Buy + "</td> <td>"
                            + this.uptrend_Sell + "</td><td>"
                            + this.uptrend_Profit + "</tr></td>")
                        console.log(false, "No day signal found yet")

                    }

                });

                //Checking for trend    
            }
            //====================================================================

            //Checking for Downtrend
            else if (this.month.high_1 && this.month.low_1 && this.month.close_1 < this.month.high_2 && this.month.low_2 && this.month.close_2 && this.month.close_2 > this.month.open_3) {

                //HIGH OHLC
                $("#trend").text("DOWNTREND")
                $("#high_1").text(this.month.high_1)
                $("#high_2").text(this.month.high_2)
                $("#open_3").text(this.month.open_3)

                //LOW OHLC
                $("#low_trend").text("DOWNTREND")
                $("#low_1").text(this.month.low_1)
                $("#low_2").text(this.month.low_2)
                progressCol2("low_progress")

                //GAP OHLC     
                $("#close_trend").text("DOWNTREND")
                $("#close_1").text(this.month.close_1)
                $("#close_2").text(this.month.close_2)
                $("#open_3").text(this.month.open_3)
                progressCol2("close_progress")

                // Adding to watchlist
                this.watchList.push(this.sym)
                console.log("added " + this.watchList + " to watchlist");
                console.log("downtrend found " + this.downtrend_Sell)

                //Daily timeframe api call=======================================================================================
                $.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.sym + "&apikey=" + this.apiKey, (data) => {

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


                    if (this.now.high_1 && this.now.low_1 && this.now.close_1 < this.now.high_2 && this.now.low_2 && this.now.close_2 && this.now.close_2 > this.now.open_3) {

                        //GAP OHLC     
                        $("#close_1").text(this.month.close_1)
                        $("#close_2").text(this.month.close_2)
                        $("#open_3").text(this.month.open_3)
                        $("#stock").text(this.sym.toUpperCase())
                        $("#stock").text(this.sym.toUpperCase())

                        $("#signal").text("PUT / SELL")
                        $("#signal_des").text("This stock checks off on our monthly setup and our daily setup. We added it to the watchlist. Please review your stock chart to confirm the reversal. Purchase at your own risk")

                        progressCol2("close_progress")

                        $("thead").append("<tr><td> PUT / SELL </td> <td>"
                            + this.sym.toUpperCase() + "</td> <td>"
                            + this.downtrend_Buy + "</td> <td>"
                            + this.downtrend_Sell + "</td><td>"
                            + this.downtrend_profit + "</tr></td>")
                        console.log(true, "signal found")

                    } else {

                        //GAP OHLC     
                        $("#close_1").text(this.month.low_1)
                        $("#close_2").text(this.month.low_2)
                        $("#open_3").text(this.month.open_3)
                        $("#stock").text(this.sym.toUpperCase())
                        $("#stock").text(this.sym.toUpperCase())
                        $("#signal").text("ALMOST")
                        $("#signal_des").text("This stock checks off on our monthly setup but not our daily setup. We added it to the watchlist. Run it again tomorrow to check for a sell signal")

                        progressCol2("close_progress")

                        $("thead").append("<tr><td> DONT TRADE YET </td> <td>"
                            + this.sym.toUpperCase() + "</td> <td>"
                            + this.downtrend_Day_Sell + "</td> <td>"
                            + this.downtrend_Sell + "</td><td>"
                            + this.downtrend_profit + "</tr></td>")

                        console.log(false, "No day signal found yet")

                    }

                    // Check if the buy limit is less then the sell limit
                    if (this.downtrend_Current_Price < this.downtrend_Day_Sell) {
                        $("#signal").text("MISSED PUT / SELL")
                        $("#signal_des").text("ATTENTION!!! You have missed any of our suggested entry points for this stock / option. We advise to check beginning of next month or try another stock / option")
                    }
                });

                //Checking for trend    
            } else {

                //Hightrend
                if (this.month.high_1 > this.month.high_2) {
                    $("#high_1").text(this.month.high_1);
                    $("#high_2").text(this.month.high_2);
                    $("#trend").text("UPTREND")
                } else {
                    $("#high_1").text(this.month.high_1);
                    $("#high_2").text(this.month.high_2);
                    $("#trend").text("DOWNTREND")
                }

                //Lowtrend
                if (this.month.low_1 > this.month.low_2) {
                    $("#low_1").text(this.month.low_1);
                    $("#low_2").text(this.month.low_2);
                    $("#low_trend").text("UPTREND")
                } else {
                    $("#low_1").text(this.month.low_1);
                    $("#low_2").text(this.month.low_2);
                    $("#low_trend").text("DOWNTREND")
                }

                //Gap
                if (this.month.close_2 > this.month.open_3) {
                    $("#close_1").text(this.month.close_1);
                    $("#close_2").text(this.month.close_2);
                    $("#open_3").text(this.month.open_3);
                    $("#close_trend").text("UPTREND")
                } else {
                    $("#close_1").text(this.month.close_1);
                    $("#close_2").text(this.month.close_2);
                    $("#open_3").text(this.month.open_3);
                    $("#close_trend").text("DOWNTREND")
                }

                $("#signal").text("NO SIGNAL FOUND")
                $("#signal_des").text("No setup found for this stock / option. Will not add to watchlist, please check another stock / option")

            }


        })

        progress("100%", "100% COMPLETE")

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





