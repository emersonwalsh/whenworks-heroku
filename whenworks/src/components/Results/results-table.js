import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function ResultsTable(props) {

    const formatDateForTable = (date) => {
        let dateArr = date.split('-');
        return dateArr[1] + '/' + dateArr[2];

    }

    const formatNamesForTable = (names) => {
        let formattedNames = '';
        names.forEach((name) => {
            formattedNames += name;
            
            formattedNames += ', '
        });
        return formattedNames.slice(0, -2);
    }

    const fortmatPercentage = (number) => {
        return Math.round(number / props.data.length * 100) + '%';
    }

    const displayResultsByDate = (dates) => {
        if (!dates) return null;

        const datesArr = Object.keys(dates).sort();

        if (datesArr.length === 0) {
            return (
                <TableRow>
                    <TableCell align="center" colSpan={3}>
                        There are no responses yet... 
                        <br />
                        Add a response!
                    </TableCell>
                </TableRow>
            )
        }

        return datesArr.map((date, index) => (
            <TableRow key={date}>
                <TableCell component="th" scope="row">
                    {formatDateForTable(date)}
                </TableCell>
                <TableCell align="left">
                    {formatNamesForTable(dates[date])}
                </TableCell>
                <TableCell align="right">
                    {fortmatPercentage(dates[date].length)}
                </TableCell>
            </TableRow>
        ));
    }

    return (
        <div className="results__table">
            <TableContainer component={Paper}>
                <Table aria-label="event results table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="results__table__header">Date</TableCell>
                            <TableCell align="left" className="results__table__header">Who's Available?</TableCell>
                            <TableCell align="right" className="results__table__header">% Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayResultsByDate(props.availability)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}