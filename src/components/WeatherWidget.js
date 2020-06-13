import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../AppContext';
import { errorHandler } from '../utils/errorHandler';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

const WeatherWidget = () => {
    const [{ user }, dispatch] = useAppState();
    const [weather, setWeather] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (user.zipcode) {
            axios
                .get(`${process.env.REACT_APP_WEATHER_API_URL}/weather?zip=${user.zipcode},us&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`)
                .then(res => setWeather(res.data))
                .catch(err =>errorHandler(err.response, history));
        }
    }, [user.zipcode]);

    return (
        <Paper elevation={3} className='weather-widget-container'>
            {Object.keys(weather).length ? (
                <>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                    <h3>{weather.name}</h3>
                    <p>{Math.round(weather.main.temp)}</p>
                </>
            ) : null}
        </Paper>
    );
};

export default WeatherWidget;