const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com';

app.use(express.json());

// Endpoint to get current weather
app.get('/api/weather/current', async (req, res) => {
    const { query, units, language } = req.query;

    try {
        const response = await axios.get(`${BASE_URL}/current`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query,
                units,
                language
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get historical weather
app.get('/api/weather/historical', async (req, res) => {
    const { query, historical_date, hourly } = req.query;

    try {
        const response = await axios.get(`${BASE_URL}/historical`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query,
                historical_date,
                hourly
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get weather forecast
app.get('/api/weather/forecast', async (req, res) => {
    const { query, forecast_days, hourly } = req.query;

    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query,
                forecast_days,
                hourly
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
