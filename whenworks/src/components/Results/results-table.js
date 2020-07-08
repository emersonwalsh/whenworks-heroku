import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function ResultsTable(props) {

    const formatDatesForTable = (dates) => {
        let startArr = props.start.split('-');
        let endArr = props.end.split('-');
        let sameYear = startArr[0] === endArr[0];

        let formattedDates = '';
        dates.forEach((date) => {
            let dateArr = date.split('-');
            formattedDates += dateArr[1] + '/' + dateArr[2];
            if (!sameYear) {
                formattedDates += '/' + dateArr[0];
            }
            formattedDates += ', '
        });
        return formattedDates.slice(0, -2);;
    }

    const displayEventResults = (rows) => {
        if (!rows) return null;

        if (rows.length === 0) {
            return (
                <TableRow>
                    <TableCell align="center" colSpan={2}>
                        There are no responses yet... 
                        <br />
                        Add a response!
                    </TableCell>
                </TableRow>

                // <p class="results__table__placeholder">There are no responses yet... Add a response!</p>
            )
        }

        return rows.map((row, index) => (
            <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">{formatDatesForTable(row.selectedDates)}</TableCell>
            </TableRow>
        ));
    }

    return (
        <div className="results__table">
        <TableContainer component={Paper}>
            <Table aria-label="event results table">
                <TableHead>
                    <TableRow>
                        <TableCell className="results__table__header">Name</TableCell>
                        <TableCell align="left" className="results__table__header">Available Dates</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayEventResults(props.data)}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}