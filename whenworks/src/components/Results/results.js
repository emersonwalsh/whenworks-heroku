import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateDocumentTitle, formatDateRange } from './../../util';

import TopBar from './../top-bar';
import ResultsTable from './results-table';


export default function Results(props) {
    const [result, setResult] = useState({});
    let { id } = useParams();

    const getEvent = () => {
        axios.get('/api/' + id)
            .then((response) => {
                const data = response.data;
                data.dateRange = formatDateRange(data.start, data.end)
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
            <TopBar /> 
            <div className="app-content">
                <div className="results__container">
                    <h3 className="results__event__name">{result.eventName}</h3>
                    <h4 className="results__event__dates">{result.dateRange}</h4>
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
