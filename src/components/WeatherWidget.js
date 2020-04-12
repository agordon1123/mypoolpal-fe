import React from 'react';
import Paper from '@material-ui/core/Paper';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const WeatherWidget = () => {
    return (
        <Paper elevation={3} className='weather-widget-container'>
            <WbSunnyIcon />
            <h3>Los Angelos, CA</h3>
            <p>79°</p>
        </Paper>
    );
};

export default WeatherWidget;