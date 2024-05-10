import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://127.0.0.1:8000";
// const STOCK_API_KEY = process.env.REACT_APP_STOCK_API_KEY;

const API_BASE_URL = "https://saiteja377.pythonanywhere.com/";

const API = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchSuggestions = async (payload) => {
    return await API.post(`/suggestions`, payload);
}

export const fetchCharts = async (symbol) => {
    console.log(process.env.REACT_APP_STOCK_API_KEY)
    return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/chart/1m?token=${STOCK_API_KEY}`);
}