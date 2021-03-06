import React from 'react';
import { Link } from 'react-router-dom'
import { useAppState } from '../AppContext';
import WeatherWidget from './WeatherWidget';
import Paper from '@material-ui/core/Paper';
import PoolIcon from '@material-ui/icons/Pool';

const Dashboard = () => {
    
    const [{ pools, user }, dispatch] = useAppState();

    return (
        <div className='dashboard-container'>
            <h1>Welcome, {user.first_name}!</h1>
            <WeatherWidget />
            <h3>Pools:</h3>
            {pools.length ? pools.map((el, i) => (
                <div key={i} className='pool-links-container'>
                    <Link to={`pool/${el.id}`}>
                        <Paper elevation={3} className='pool-link-container'>
                        <PoolIcon />
                            <div className='pool-link-info-container'>
                                <p>{el.title}</p>
                                {/* TODO: obtain and pass in last reading */}
                                <p>last reading: 4/13/20*</p>
                            </div>
                        </Paper>
                    </Link>
                </div>
            )) : null}
            <Link to='new-pool' className='add-new-pool'>+ Add Pool</Link>
        </div>
    );
};

export default Dashboard;