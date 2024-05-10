import os
import requests
import json
import logging
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
import yfinance as yf
import datetime

logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

""" Stocks for investment strategies"""

# The stocks are ordered in the best stock first
# As per the team decision we decided to spread the amount into 3 different parts

strategy_ethical_investing = ["AAPL", "ADBE", "NSRGY"]
strategy_growth_investing = ["MSFT", "GOOGL", "AMZN"]
strategy_index_investing = ["VTI", "IXUS", "ILTB"]
strategy_quality_investing = ["NVDA", "MU", "CSCO"]
strategy_value_investing = ["IBM", "GE", "XOM"]

money_allocation = {
    'Ethical Investing': [0.4, 0.4, 0.2],
    'Growth Investing': [0.3, 0.4, 0.3],
    'Index Investing': [0.4, 0.4, 0.2],
    'Quality Investing': [0.4, 0.4, 0.2],
    'Value Investing': [0.3, 0.4, 0.3],
}

#Price at which stock is bought
price_bought = {
    'Ethical Investing': [193.5, 606.6, 110.2],
    'Growth Investing': [373.1, 139.7, 144.9],
    'Index Investing': [227.9, 62.5, 53.7],
    'Quality Investing': [471.6, 73.7, 48.38],
    'Value Investing': [160.2, 119.1, 98.4],
}

def get_stock_quote(ticker_list, type):
    """Function that calls stock API for each stock to fetch stock details"""
    filter_keys = 'symbol,companyName,latestPrice,latestTime,change,changePercent'
    stock_details = []
    for index, ticker in enumerate(ticker_list):
        stock = yf.Ticker(ticker)
        info = stock.info
        symbol = info['symbol']
        company_name = info['longName']
        if type == "Index Investing":
            # Fetch historical data for the last trading day
            data = yf.download(ticker, period='1d')

            # Get the latest available price from the fetched data
            stock_price = data['Close'].iloc[-1]
            # stock_price = info['navPrice']
        else:
            stock_price = info['currentPrice']
        current_time = str(datetime.datetime.now().strftime("%H:%M:%S"))
        previous_close = info['regularMarketPreviousClose']
        value_change = stock_price - previous_close
        percent_change = (value_change / previous_close) * 100
        stock_split = money_allocation.get(type)[index]
        price_start = price_bought.get(type)[index]
        obj = {
            "symbol": symbol,
            "company_name": company_name,
            "stock_price": stock_price,
            "current_time": current_time,
            "value_change": value_change,
            "percent_change": percent_change,
            "stock_split": stock_split,
            "price_bought":price_start
        }
        stock_details.append(obj)
    return stock_details

def get_current_stock_prices(symbols):
    data = yf.download(symbols, start=datetime.datetime.now() - datetime.timedelta(days=2), end=datetime.datetime.now())
    return data['Adj Close'].iloc[-1].to_dict()

@app.route('/', methods=['GET'])
def hello_world():
    stock = yf.Ticker("NVDA")
    info = stock.info
    test = get_stock_quote(strategy_value_investing, "Value Investing")
    print(test)
    return test


@app.route('/suggestions', methods=['GET','POST'])
@cross_origin(origin='*')
def return_data():
    Strategies = request.json['Strategies']
    Amount = request.json['Amount']
    # Strategies = ["Ethical Investing", "Quality Investing"]
    # Amount = 6000
    totalInvestedValue = Amount

    strategiesResponse = []
    weeklyPortfolioData = []
    weeklyPortfolioData.append({
        "name": "Mon",
        "portfolio_value": Amount+3.43
    })
    weeklyPortfolioData.append({
        "name": "Tue",
        "portfolio_value": Amount+10.79
    })
    weeklyPortfolioData.append({
        "name": "Wed",
        "portfolio_value": Amount+13.25-7.63
    })
    weeklyPortfolioData.append({
        "name": "Thu",
        "portfolio_value": Amount + 13.25
    })
    weeklyPortfolioData.append({
        "name": "Fri",
        "portfolio_value": Amount + 13.25 - 4.12
    })
    weeklyPortfolioData.append({
        "name": "Sat",
        "portfolio_value": Amount + 13.25 - 4.12
    })
    weeklyPortfolioData.append({
        "name": "Sun",
        "portfolio_value": Amount + 13.25 - 4.12
    })

    if len(Strategies) == 2:
        Amount = Amount/2

    stock_result_pieChart = []
    responseAmount = []
    portfolio_value = 0
    for strategy in Strategies:
        amt1 = Amount * money_allocation.get(strategy)[0]
        amt2 = Amount * money_allocation.get(strategy)[1]
        amt3 = Amount * money_allocation.get(strategy)[2]

        no_of_stocks = []
        no_1 = amt1 / price_bought.get(strategy)[0]
        no_2 = amt2 / price_bought.get(strategy)[1]
        no_3 = amt3 / price_bought.get(strategy)[2]
        no_of_stocks.append(no_1)
        no_of_stocks.append(no_2)
        no_of_stocks.append(no_3)

        responseAmount.append(amt1)
        responseAmount.append(amt2)
        responseAmount.append(amt3)
        suggested_stocks = []

        if strategy == "Ethical Investing":
            suggested_stocks = strategy_ethical_investing
            temp = get_stock_quote(strategy_ethical_investing, "Ethical Investing")
            strategiesResponse.append({
                "name": "Ethical Investing",
                "strategySplit": Amount,
                "stocks": temp
            })
            temp1 = [{"name": strategy_ethical_investing[0], "value": amt1},
                     {"name": strategy_ethical_investing[1], "value": amt2},
                     {"name": strategy_ethical_investing[2], "value": amt3}]
            stock_result_pieChart.append({
                "name": "Ethical Investing",
                "data": temp1
            })

        elif strategy == "Quality Investing":
            suggested_stocks = strategy_quality_investing
            temp = get_stock_quote(strategy_quality_investing, "Quality Investing")
            strategiesResponse.append({
                "name": "Quality Investing",
                "strategySplit": Amount,
                "stocks": temp
            })
            temp1 = [{"name": strategy_quality_investing[0], "value": amt1},
                     {"name": strategy_quality_investing[1], "value": amt2},
                     {"name": strategy_quality_investing[2], "value": amt3}]
            stock_result_pieChart.append({
                "name": "Quality Investing",
                "data": temp1
            })
        elif strategy == "Index Investing":
            suggested_stocks = strategy_index_investing
            temp = get_stock_quote(strategy_index_investing, "Index Investing")
            strategiesResponse.append({
                "name": "Index Investing",
                "strategySplit": Amount,
                "stocks": temp
            })
            temp1 = [{"name": strategy_index_investing[0], "value": amt1},
                     {"name": strategy_index_investing[1], "value": amt2},
                     {"name": strategy_index_investing[2], "value": amt3}]
            stock_result_pieChart.append({
                "name": "Index Investing",
                "data": temp1
            })
        elif strategy == "Value Investing":
            suggested_stocks = strategy_value_investing
            temp = get_stock_quote(strategy_value_investing, "Value Investing")
            strategiesResponse.append({
                "name": "Value Investing",
                "strategySplit": Amount,
                "stocks": temp
            })
            temp1 = [{"name": strategy_value_investing[0], "value": amt1},
                     {"name": strategy_value_investing[1], "value": amt2},
                     {"name": strategy_value_investing[2], "value": amt3}]
            stock_result_pieChart.append({
                "name": "Value Investing",
                "data": temp1
            })
        elif strategy == "Growth Investing":
            suggested_stocks = strategy_growth_investing
            temp = get_stock_quote(strategy_growth_investing, "Growth Investing")
            strategiesResponse.append({
                "name": "Growth Investing",
                "strategySplit": Amount,
                "stocks": temp
            })
            temp1 = [{"name": strategy_growth_investing[0], "value": amt1},
                     {"name": strategy_growth_investing[1], "value": amt2},
                     {"name": strategy_growth_investing[2], "value": amt3}]
            stock_result_pieChart.append({
                "name": "Growth Investing",
                "data": temp1
            })
        current_stock_prices = get_current_stock_prices(suggested_stocks)
        for index, stock in enumerate(suggested_stocks):
            portfolio_value += no_of_stocks[index] * current_stock_prices[stock]
    response_details = {"currentPortfolioValue" : portfolio_value, "totalInvestedValue" : totalInvestedValue, "strategiesResponse": strategiesResponse,
                        "piechartResponse": stock_result_pieChart, "weeklyPortfolioData": weeklyPortfolioData}
    response = Response(json.dumps(response_details), mimetype='application/json')
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=000)
