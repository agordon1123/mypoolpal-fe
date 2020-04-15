import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { calculateScore } from '../../functions/calculateScore';
import Calendar from 'react-calendar';
import Paper from '@material-ui/core/Paper';

const CalendarView = props => {
    const history = useHistory();
    const location = useLocation();
    const { readings } = props;
    const [dateDict, setDateDict] = useState({});
    
    const mapReadingColor = ({ date, view }) => {
        const format = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
        // can pull colors from key assigned in useEffect
        if (dateDict[format] !== undefined) {
            const score = dateDict[format].score;
            if (score >= 75) {
                return 'active-reading-day-green';
            } else if (score < 75 && score >= 50) {
                return 'active-reading-day-yellow';
            } else {
                return 'active-reading-day-red';
            }
        }
    }

    const handleRedirect = value => {
        const format = `${value.getMonth()+1}-${value.getDate()}-${value.getFullYear()}`;
        if (dateDict[format] !== undefined) {
            return history.push(`${location.pathname}/reading/${dateDict[format].id}`);
        }
    }

    useEffect(() => {
        let dict = {};
        readings.length && readings.map((reading) => {
            // create date dictionary to reference for map display
            const format = `${reading.created_at.getMonth()+1}-${reading.created_at.getDate()}-${reading.created_at.getFullYear()}`;
            // this is where I should check values and assign color key
            const score = Math.round(calculateScore(reading));
            dict[format] = { id: reading.id, score: score };
        })
        setDateDict(dict);
    }, [readings])

    return (
        <Paper className='calendar-container'>
            {readings.length ? (
                <Calendar tileClassName={mapReadingColor} onClickDay={(value) => handleRedirect(value)} />
            )
            : (
                <Calendar />
            )}
        </Paper>
    );
};

export default CalendarView;