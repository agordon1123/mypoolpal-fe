import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CalendarView from './Readings/CalendarView';
import TableView from './Readings/Tableview';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { errorHandler } from '../utils/errorHandler';
import { Card, CardMedia } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

const Pool = props => {

    const { readings, setReadings, history } = props;
    const [pool, setPool] = useState({})
    const [readingsView, setReadingsView] = useState({ list: true, calendar: false });
    // const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    
    useEffect(() => {
        const len = location.pathname.length
        const poolId = location.pathname.charAt(len - 1)
        
        axiosWithAuth()
            .get(`pools/${poolId}`)
            .then(res => {
                // convert boolean to string
                if (res.data.is_salt_water === 1) {
                    res.data.is_salt_water = 'salt';
                } else {
                    res.data.is_salt_water = 'chlorine';
                }
                setPool(res.data)
            })
            .catch(err => {
                errorHandler(err.response, history)
            })
        
        axiosWithAuth()
            .get(`${process.env.REACT_APP_DB_URL}/readings/all/${poolId}`)
            .then(res => {
                // create new date object from timestamp
                res.data.map((el, i) => {
                    el.created_at = new Date(el.created_at)
                })

                console.log(res.data)
                // TODO: Filter out by pool ->
                // will require adding pool as foreign key in reading table
                // will require pool object to be passed in from this view
                // and also prompt a select in the add reading view to
                // select pool
                // once in place -> filter
                
                // sort readings by date in descending order
                let sortedReadings = res.data.sort((a, b) => {
                    return b.id - a.id
                })
                setReadings(sortedReadings)
            })
            .catch(err => {
                errorHandler(err.response, history)
            })

    }, [location.pathname])

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
                <TableView readings={readings} pool={pool} />
            ) : (
                // render calendar view
                <CalendarView readings={readings} />
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