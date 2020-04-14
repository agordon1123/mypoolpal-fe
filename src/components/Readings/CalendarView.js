import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import Paper from '@material-ui/core/Paper';

const CalendarView = props => {
    const history = useHistory();
    const location = useLocation();
    const { readings } = props;
    const [dateDict, setDateDict] = useState({});
    
    const mapReading = ({ date, view }) => {
        const format = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
        // can pull colors from key assigned in useEffect
        return dateDict[format] !== undefined ? 'active-reading-day-green' : null;
    }

    const handleRedirect = value => {
        const format = `${value.getMonth()+1}-${value.getDate()}-${value.getFullYear()}`;
        if (dateDict[format] !== undefined) {
            return history.push(`${location.pathname}/reading/${dateDict[format]}`);
        }
    }

    useEffect(() => {
        let dict = {};
        readings.length && readings.map((reading) => {
            // create date dictionary to reference for map display
            const format = `${reading.created_at.getMonth()+1}-${reading.created_at.getDate()}-${reading.created_at.getFullYear()}`;
            // this is where I should check values and assign color key
            dict[format] = reading.id;
        })
        setDateDict(dict);
    }, [readings])

    return (
        <Paper className='calendar-container'>
            {readings.length ? (
                <Calendar tileClassName={mapReading} onClickDay={(value) => handleRedirect(value)} />
            )
            : (
                <Calendar />
            )}
        </Paper>
    );
};

export default CalendarView;