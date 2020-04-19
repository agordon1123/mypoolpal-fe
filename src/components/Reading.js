import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppState } from '../AppContext';
import { calculateScore } from '../functions/calculateScore';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Reading = () => {
    const location = useLocation();

    const [{ pools, readings }, dispatch] = useAppState();

    const [reading, setReading] = useState({});
    const [pool, setPool] = useState({});
    const [calculated, setCalculated] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const len = location.pathname.length;
        // will break with double digits
        // maybe can use regex to find first substring with /num/
        // and remove first and last chars
        const readingId = location.pathname.charAt(len - 1);
        const poolId = location.pathname.charAt(6);

        pools.map(pool => pool.id.toString() === poolId ? setPool(pool) : null);
        readings.map(reading => {
            if (reading.id.toString() === readingId) {
                const score = calculateScore(reading);
                setReading(reading);
                setScore(score);
                setCalculated(true);
            }
        });
    }, [pools, readings]);
    
    return (
        <div className='reading-container'>
            {calculated ? (
                <div className='score-display-container'>
                    <h2>Overall Score</h2>
                    <CircularProgressbar
                        value={score}
                        text={`${score}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: '#fff',
                            textColor: score >= 75 ? '#238823' : score >= 50 ? '#FFBF00': '#D2222D',
                            pathColor: score >= 75 ? '#238823' : score >= 50 ? '#FFBF00': '#D2222D',
                            trailColor: 'transparent'
                        })}
                    />
                </div>
            ) : (
                <div className='score-display-placeholder' />
            )}
            <h3>Details</h3>
            <TableContainer className='reading-table-container' component={Paper}>
                <Table className='reading-table' aria-label="reading table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">Entered</TableCell>
                            <TableCell align="center">Ideal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={reading.pH}>
                            <TableCell align="center">pH</TableCell>
                            <TableCell align="center">{reading.pH}</TableCell>
                            <TableCell align="center">7.4 - 7.6</TableCell>
                        </TableRow>
                        <TableRow key={reading.chlorine}>
                            <TableCell align="center">Chlorine</TableCell>
                            <TableCell align="center">{reading.chlorine}</TableCell>
                            <TableCell align="center">2 - 4 ppm</TableCell>
                        </TableRow>
                        <TableRow key={reading.alkalinity}>
                            <TableCell align="center">Alkalinity</TableCell>
                            <TableCell align="center">{reading.alkalinity}</TableCell>
                            <TableCell align="center">80 - 120 ppm</TableCell>
                        </TableRow>
                        {pool.is_salt_water === 'salt' ? (
                            <TableRow key={reading.salinity}>
                                <TableCell align="center">Salinity</TableCell>
                                <TableCell align="center">{reading.salinity}</TableCell>
                                <TableCell align="center">2800 - 3300 ppm</TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Reading