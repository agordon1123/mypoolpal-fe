import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppState } from '../AppContext';
import CalendarView from './Readings/CalendarView';
import TableView from './Readings/Tableview';
import { Card, CardMedia } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

const Pool = () => {

    const [pool, setPool] = useState({});
    const [poolReadings, setPoolReadings] = useState([]);
    const [readingsView, setReadingsView] = useState({ list: true, calendar: false });
    const [{ pools, readings }, dispatch] = useAppState();
    const location = useLocation();
    
    useEffect(() => {
        const len = location.pathname.length;
        const poolId = location.pathname.charAt(len - 1);
        
        pools.map(pool => pool.id.toString() === poolId ? setPool(pool) : null);
        
        const filteredReadings = readings.filter(reading => reading.pool_id == poolId);
        setPoolReadings(filteredReadings);

    }, [pools, readings])

    const handleViewToggle = () => {
        setReadingsView({ 
            ...readingsView, 
            list: !readingsView.list, 
            calendar: !readingsView.calendar 
        })
    }

    return (
        <div className='pool-container'>
            {Object.keys(pool).length !== 0 ? (
                <Card className='pool-card-container'>
                    <CardMedia
                        component='img'
                        alt='shimmering water'
                        height='140'
                        image='/water-shimmer.jpg'
                        title='Shimmering Water'
                    />
                    <div className='pool-container-info'>
                        <h3>{pool.title}</h3>
                        <p>{pool.gallonage.toLocaleString()} gallons</p>
                        <p>Sanatizer: {pool.is_salt_water}</p>
                    </div>
                </Card>
            ) : null}

            <h3 className='readings-title'>Readings:</h3>
            <div className='switch-view-container'>
                <p className={readingsView.list ? null : 'toggle-off'}>List</p>
                <Switch
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={handleViewToggle}
                />
                <p className={readingsView.calendar ? null : 'toggle-off'}>Calendar</p>
            </div>

            {readingsView.list ? (
                //render table in list view
                <TableView readings={poolReadings} pool={pool} />
            ) : (
                // render calendar view
                <CalendarView readings={poolReadings} />
            )}
            <div className='add-new-reading'>
                <Link to={`${location.pathname}/new-reading`}>
                    +Reading
                </Link>
            </div>
        </div>
    )
}

export default Pool