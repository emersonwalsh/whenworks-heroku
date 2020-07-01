import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from './../top-bar';


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

    const displayEventResults = (results) => {
        if (!results) return null;

        return results.map((response, index) => (
            <tr key={response.name}>
                <td>{response.name}</td>
                <td>{response.selectedDates}</td>
            </tr>
        ));
     }

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <header className="app-content">
            <TopBar />

            <h1>{result.eventName}</h1>
            <h2>Responses</h2>
            <table id='results'>
               <tbody>
                  {displayEventResults(result.results)}
               </tbody>
            </table>

            {/* <p>Heatmap, Table (Date, # unavailable)</p>
            <p>Share Options</p> */}

        </header>
    );
}
