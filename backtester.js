function backtest(sym){
    // Stock Symbol
    sym = this.sym

    //Watch List
    watchList = [];

    //Market Hours
    MarketHours = "unknown"

    // Present Time
    currentTime = new Date.now().toString("hh:mm:ss")
    presentTime = Date.now().toString("yyyy-MM-dd hh:mm:ss");
    timeCheck = Date.now().toString("HH:MM:ss");

    //Api Key
    apiKey = "JSEZ8SK1RA528ZXU";

    // Time Series 
    dailyTimeSeries = "Time Series (Daily)";
    weeklyTimeSeries = "Weekly Time Series";
    monthlyTimeSeries = "Monthly Time Series";

    open = "1. open";
    high = "2. high";
    low = "3. low";
    close = "4. close";
    volume = "5. volume";

    // Days
    day = Date.today().toString()[0] + Date.today().toString()[1] + Date.today().toString()[2];
    today = Date.today().toString("yyyy-MM-dd");
    day_2 = Date.today().add(-1).days().toString("yyyy-MM-dd");
    day_3 = Date.today().add(-2).days().toString("yyyy-MM-dd");

    // Weeks
    week_1 = Date.today().friday().addWeeks(-3).toString("yyyy-MM-dd");
    week_2 = Date.today().friday().addWeeks(-2).toString("yyyy-MM-dd");

    // Month
    month_1 = Date.today().add(-2).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");
    month_2 = Date.today().add(-1).months().moveToLastDayOfMonth().toString("yyyy-MM-dd");




    //api call for the month timeframe
    $.get("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" + sym + "&apikey=" + apiKey, (data, status) => {

        //Check for errors
        if (data.Information) {
            console.log("rate limit hit for " + sym + " Please use another symbol")
            alert("Rate limit has been reached for " + sym.toUpperCase() + " Please check your list for previously checked symbols. Use another stock symbol")
        }

        //Get WEEK ohlc data
        week = {

            //ticker: data["Meta Data"]["2. Symbol"],

            open_1: Number(data[weeklyTimeSeries][week_1][open]),
            high_1: Number(data[weeklyTimeSeries][week_1][high]),
            low_1: Number(data[weeklyTimeSeries][week_1][low]),
            close_1: Number(data[weeklyTimeSeries][week_1][close]),
            volume_1: Number(data[weeklyTimeSeries][week_1][volume]),

            open_2: Number(data[weeklyTimeSeries][week_2][open]),
            high_2: Number(data[weeklyTimeSeries][week_2][high]),
            low_2: Number(data[weeklyTimeSeries][week_2][low]),
            close_2: Number(data[weeklyTimeSeries][week_2][close]),
            volume_2: Math.round(Number(data[weeklyTimeSeries][week_2][volume])),

            open_3: Number(data[weeklyTimeSeries][today][open]),
            high_3: Number(data[weeklyTimeSeries][today][high]),
            low_3: Number(data[weeklyTimeSeries][today][low]),
            close_3: Number(data[weeklyTimeSeries][today][close]),
            volume_3: Number(data[weeklyTimeSeries][today][volume])
        }

        //Limit order formulas

        //Uptrend
        uptrend_Buy = (Number(week.open_3).toFixed(2));
        uptrend_Sell = (Number(week.high_2 - week.low_2 + week.close_2) - .05).toFixed(2);
        uptrend_Profit = "$" + (Number(week.high_2 - week.low_2) - .05).toFixed(2);

        //Downtrend
        downtrend_Buy = (Number(week.open_3)).toFixed(2);
        downtrend_Sell = Number(week.close_2 - (week.high_2 - week.low_2)).toFixed(2);
        downtrend_profit = "$" + Number(week.high_2 - week.low_2).toFixed(2);

        // Checking for Uptrend
        if (week.high_1 && week.low_1 && week.close_1 > week.high_2 && week.low_2 && week.close_2 && week.close_2 < week.open_3) {


            //GAP OHLC     
            $("#week_trend").text("CALL")
            progressCol2("close_progress")

            //SIGNAL
            getDay()

            progress("75%", "75% COMPLETE")



            // Adding to watchlist
            watchList.push(sym)
            console.log("added " + watchList + " to watchlist");
            console.log("uptrend found " + uptrend_Sell)
            console.log("weekly downtrend now!")



            //Checking for trend    

            //====================================================================

            //Checking for Downtrend
        } else if (week.high_1 && week.low_1 && week.close_1 < week.high_2 && week.low_2 && week.close_2 && week.close_2 > week.open_3) {


            //GAP OHLC     
            $("#week_trend").text("PUT")
            progressCol2("close_progress")

            //SIGNAL
            getDay()

            // Adding to watchlist
            watchList.push(sym)
            console.log("added " + watchList + " to watchlist");
            console.log("downtrend found " + downtrend_Sell)
            console.log("weekly downtrend found!")

            //Checking for trend    
        } else {

            $("#signal").text("NO WEEKLY SIGNAL FOUND")
            $("#signal_des").text("No setup found for stock / option. Will not add to watchlist, please check another stock / option")
        }
    })
}