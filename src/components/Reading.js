import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { errorHandler } from '../utils/errorHandler';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { calculateScore } from '../functions/calculateScore';

const Reading = props => {
    // const { history } = props;
    const location = useLocation()
    const history = useHistory()

    const [reading, setReading] = useState({})
    const [pool, setPool] = useState({})
    const [calculated, setCalculated] = useState(false);
    const [score, setScore] = useState(0);
    console.log(pool)

    useEffect(() => {
        const len = location.pathname.length
        const readingId = location.pathname.charAt(len - 1)
        const poolId = location.pathname.charAt(6);
        console.log(poolId)

        axiosWithAuth()
            .get(`${process.env.REACT_APP_DB_URL}/readings/${readingId}`)
            .then(res => {
                const score = calculateScore(res.data);
                setReading(res.data)
                setScore(score);
                setCalculated(true);
            })
            .catch(err => {
                errorHandler(err.response)
            })

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
    }, [])
    
    console.log(props);

    return (
        <div className='reading-container'>
            {calculated ? (
                <div className='score-display-container'>
                    <h2>Overall Score</h2>
                    <CircularProgressbar
                        // className='progress-bar'
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
                            <TableRow key={reading.alkalinity}>
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