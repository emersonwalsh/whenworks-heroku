import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from './../top-bar';
import ResultsTable from './results-table';


export default function Results(props) {
    const [result, setResult] = useState({});
    let { id } = useParams();

    const getEvent = () => {
        axios.get('/api/' + id)
            .then((response) => {
                const data = response.data;
                setResult(data);
                console.log('Successfully retrieved events', data);
            })
            .catch(() => {
                console.log('error retrieving events')
            })
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div>
            <TopBar name={result.eventName} start={result.start} end={result.end} /> 
            <div className="app-content">
                <div className="results__container">
                    <h2>Results</h2>

                    {/* Table Option */}
                    <ResultsTable data={result.results} start={result.start} end={result.end} />
                    {/* <table id="results" className="results__table">
                        <tbody>
                            <tr className="results__table__header">
                                <th>Response</th>
                                <th>Available Dates</th>
                            </tr>
                            {displayEventResults(result.results)}
                        </tbody>
                    </table> */}

                    {/* TODO add a way to toggle to response page
                        <p>Heatmap, Table (Date, # unavailable)</p>
                        <p>Share Options</p> 
                    */}
                </div>
            </div>
        </div>
    );
}
