import { Box, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const ResultsPage = () => {
  const location = useLocation();
  const [responseData, setResponseData] = useState({});
  const [strategies, setStrategies] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(0.0);
  const [totalInvested, settotalInvested] = useState(0.0);
  const [piechartData, setPiechartData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const COLORS = ['bg-purple-600', 'bg-blue-600', 'bg-green-600'];

  useEffect(() => {
    const fetchData = () => {
      setResponseData(location.state.respData);
      setStrategies(location.state.respData.strategiesResponse)
      setPiechartData(location.state.respData.piechartResponse)
      setWeeklyData(location.state.respData.weeklyPortfolioData)
      //setStocks(location.state.respData.strategiesResponse.stocks)
      setCurrentPortfolio(location.state.respData.currentPortfolioValue);
      settotalInvested(location.state.respData.totalInvestedValue);
      //console.log(location.state);
    };
    fetchData();
  }, [location.state.respData]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {piechartData?.data[index].title}
      </text>
    );
  };

  return (
    <>
        <Box
            margin="30px"
        >
            <Box
                display="flex"
                marginBottom="20px"
            >
                <Box
                    borderRadius="15px"
                    boxShadow="-9px 10px 12px 0px rgba(221,221,221,1);"
                    padding="20px"
                    marginRight="30px"
                    backgroundColor="#c1d8f0"
                    flex="50px"
                >
                    <Typography
                        textAlign="left"
                        marginLeft="3%"
                        fontSize={16}
                        marginBottom="15px"
                        marginTop="1%"
                    >
                        Your Current Portfolio Value
                    </Typography>
                    <Typography
                        textAlign="left"
                        marginLeft="3%"
                        fontSize={38}
                        marginBottom={0.5}
                        marginTop="1%"
                    >
                        ${currentPortfolio.toFixed(2)}
                    </Typography>
                </Box>

                <Box
                    borderRadius="15px"
                    boxShadow="-9px 10px 12px 0px rgba(221,221,221,1);"
                    padding="20px"
                    marginRight="20px"
                    backgroundColor="#c1d8f0"
                    flex="50px"
                >
                    <Typography
                        textAlign="left"
                        marginLeft="3%"
                        fontSize={16}
                        marginBottom={0.5}
                        marginTop="1%"
                    >
                        Total Invested Value
                    </Typography>
                    <Typography
                        textAlign="left"
                        marginLeft="3%"
                        fontSize={38}
                        marginBottom={0.5}
                        marginTop="1%"
                    >
                        ${totalInvested.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            <Box
               borderRadius="15px"
               boxShadow="-9px 10px 12px 0px rgba(221,221,221,1);"
               padding="20px"
               backgroundColor="#c1d8f0"
               marginBottom="20px"
            >
                <Typography
                    textAlign="left"
                    fontSize={24}
                    marginBottom="20px"
                    marginTop="1%"
                >
                    Stocks selected based on your input strategies
                </Typography>
                { 
                    strategies.map((strategy, idx) => (
                        <Box
                            key={idx}
                            marginBottom="50px"
                        >
                            <Typography
                                textAlign="left"
                                fontSize={20}
                                fontWeight="bold"
                                marginTop="1%"
                                marginBottom="30px"
                            >
                                {(idx+1) + ") " + strategy.name + " ($" + strategy.strategySplit + ")"}
                            </Typography>
                            {/* <Box
                                display="flex"
                            >
                                <Typography
                                    textAlign="left"
                                    marginLeft="2.5%"
                                    fontSize={20}
                                    marginBottom={0.5}
                                    fontWeight="bold"
                                    marginTop="1%"
                                >
                                    Strategy Split -
                                </Typography>
                                <Typography
                                    textAlign="left"
                                    marginLeft="1%"
                                    fontSize={20}
                                    marginBottom={0.5}
                                    fontWeight="bold"
                                    marginTop="1%"
                                >
                                    ${strategy.strategySplit}
                                </Typography>
                            </Box> */}
                            <Box
                                display="flex"
                            >
                                {
                                    strategy?.stocks.map((stock, idx1) => (
                                        <Card 
                                            sx={{ marginRight: "30px", flex:"33%" }} 
                                            key={idx1}
                                        >
                                            <CardHeader
                                                title={stock.company_name}
                                                subheader={stock.symbol}
                                            />
                                            <CardContent>
                                                <Typography
                                                    textAlign="left"
                                                    marginLeft="1%"
                                                    fontSize={36}
                                                    marginBottom={0.5}
                                                    fontWeight="bold"
                                                    marginTop="1%"
                                                >
                                                    ${stock.stock_price.toFixed(2)}
                                                </Typography>
                                                <Typography
                                                    textAlign="left"
                                                    marginLeft="1%"
                                                    fontSize={20}
                                                    marginBottom={0.5}
                                                    fontWeight="bold"
                                                    marginTop="1%"
                                                    color={stock.percent_change > 0 ? "green" : "red"}
                                                >
                                                    {stock.percent_change > 0 ? "+" + stock.percent_change.toFixed(2) + "%" :  stock.percent_change.toFixed(2) + "%"}
                                                </Typography>
                                                <Box
                                                    display="flex"
                                                    marginTop="20px"
                                                >
                                                    <Typography
                                                        textAlign="left"
                                                        marginLeft="1%"
                                                        fontSize={16}
                                                        marginBottom={0.5}
                                                        fontWeight="bold"
                                                        marginTop="1%"
                                                    >
                                                        Stock split =
                                                    </Typography>
                                                    <Typography
                                                        textAlign="left"
                                                        marginLeft="1%"
                                                        fontSize={16}
                                                        marginBottom={0.5}
                                                        marginTop="1%"
                                                    >
                                                        {(100*stock.stock_split) + "% = $" + (strategy.strategySplit*stock.stock_split)}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    display="flex"
                                                >
                                                    <Typography
                                                        textAlign="left"
                                                        marginLeft="1%"
                                                        fontSize={16}
                                                        marginBottom={0.5}
                                                        fontWeight="bold"
                                                        marginTop="1%"
                                                    >
                                                        No. of stocks =
                                                    </Typography>
                                                    <Typography
                                                        textAlign="left"
                                                        marginLeft="1%"
                                                        fontSize={16}
                                                        marginBottom={0.5}
                                                        marginTop="1%"
                                                    >
                                                        {((strategy.strategySplit*stock.stock_split)/stock.price_bought).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    display="flex"
                                                >
                                                    <Typography
                                                        textAlign="left"
                                                        marginLeft="1%"
                                                        fontSize={16}
                                                        marginBottom={0.5}
                                                        fontWeight="bold"
                                                        marginTop="1%"
                                                    >
                                                        Purchased at =
                                                    </Typography>
                                                    <Typography
                                                        textAlign="left"
                                                        marginLeft="1%"
                                                        fontSize={16}
                                                        marginBottom={0.5}
                                                        marginTop="1%"
                                                    >
                                                        ${stock.price_bought}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                            </Box>
                        </Box>
                    ))
                }
            </Box>

            <Box
                borderRadius="15px"
                boxShadow="-9px 10px 12px 0px rgba(221,221,221,1);"
                padding="20px"
                backgroundColor="#c1d8f0"
                marginBottom="20px"
            >
                <Typography
                    textAlign="center"
                    marginLeft="3%"
                    fontSize={36}
                    marginBottom="30px"
                    marginTop="1%"
                >
                    Pie Charts
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-around"
                >
                    {
                        piechartData.map((pdata, index) => (
                            <Box
                                display="flex"
                                flexDirection="column"
                                key={index}
                            >
                                <Typography
                                    textAlign="center"
                                    marginLeft="3%"
                                    fontSize={30}
                                    marginTop="1%"
                                >
                                    {pdata.name}
                                </Typography>
                                <PieChart width={400} height={400}>
                                    <Tooltip formatter={(value) => `${value}`}/>
                                    <Pie
                                        dataKey="value"
                                        data={pdata?.data}
                                        cx={200}
                                        cy={200}
                                        outerRadius={140}
                                        fill="#8884d8"
                                        label
                                    >
                                        {pdata?.data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </Box>
                        ))
                    }
                </Box>
            </Box>

            <Box
                borderRadius="15px"
                boxShadow="-9px 10px 12px 0px rgba(221,221,221,1);"
                padding="20px"
                backgroundColor="#c1d8f0"
                marginBottom="20px"
            >
                <Typography
                    textAlign="center"
                    marginLeft="3%"
                    fontSize={36}
                    marginBottom="30px"
                    marginTop="1%"
                >
                    Last Week Portfolio Value Chart
                </Typography>
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <BarChart
                        width={500}
                        height={400}
                        data={weeklyData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[totalInvested, totalInvested+20]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="portfolio_value" fill="#8884d8" />
                    </BarChart>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default ResultsPage