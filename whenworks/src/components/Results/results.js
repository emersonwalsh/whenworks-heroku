import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateDocumentTitle } from './../../util';

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
                updateDocumentTitle('WhenWorks: ' + data.eventName);
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
                    <ResultsTable data={result.results} start={result.start} end={result.end} />

                    {/* 
                        TODO add read only calendar that shows the dates that work for everyone
                        TODO suggest display dates and date ranges 
                        TODO add more share options
                    */}

                </div>
            </div>
        </div>
    );
}
