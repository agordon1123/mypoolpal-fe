import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const TableView = props => {
    const { readings, pool } = props;
    const location = useLocation()

    return (
        <TableContainer className='calendar-view-container' component={Paper}>
            <Table className='calendar-view-table' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">pH</TableCell>
                        <TableCell align="right">Chlorine</TableCell>
                        <TableCell align="right">Alkalinity</TableCell>
                        {pool.is_salt_water === 'salt' ? (
                            <TableCell align="right">Salinity</TableCell>
                        ) : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {readings.length ? readings.map((reading) => (
                        <TableRow key={reading.id}>
                            <TableCell component="th" scope="reading">
                                {/* {reading.created_at} */}
                                <Link to={`${location.pathname}/reading/${reading.id}`}>{months[reading.created_at.getMonth()]}-{reading.created_at.getDate()}-{reading.created_at.getFullYear()}</Link>
                            </TableCell>
                            <TableCell align="right">{reading.pH}</TableCell>
                            <TableCell align="right">{reading.chlorine}</TableCell>
                            <TableCell align="right">{reading.alkalinity}</TableCell>
                            {pool.is_salt_water === 'salt' ? (
                                <TableCell align="right">{reading.salinity}</TableCell>
                            ) : null}
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;