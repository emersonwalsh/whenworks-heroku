import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from './../../util';

import TopBar from './../top-bar';
import MultiSelectCalendar from './../multi-select-calendar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Respond(props) {
    const [event, setEvent] = useState({});
    let history = useHistory();
    let { id } = useParams();
    let participantName = '';
    const selectedDates = [];

    const getEvent = () => {
        axios.get('/api/' + id)
            .then((response) => {
                const data = response.data;
                setEvent(data);
                console.log('Successfully retrieved events', data);
            })
            .catch(() => {
                console.log('error retrieving events')
            })
    };

    const updateSelection = (date) => {
        const newDate = formatDate(date);
        const newDateIdx = selectedDates.indexOf(newDate);
        if (newDateIdx === -1) {
            selectedDates.push(newDate); 
        } else {
            selectedDates.splice(newDateIdx, 1);
        }
    };

    const handleParticipantNameChange = event => {
        participantName = event.target.value;
    };

    const submitResponse = () => {
        selectedDates.sort(function(a,b){
            return new Date(a) - new Date(b);
        });

        const result = {
            ...event,
            participantResponse: {
                name: participantName,
                selectedDates: selectedDates
            }
        }

        axios.post('/api/update/' + id, result)
            .then(() => {
                console.log('Response successfully recorded!');
                history.push('/results/' + id);
            })
            .catch(() => {
                alert('Unable to submit response')
            })
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div>
            <TopBar name={event.eventName} start={event.start} end={event.end} /> 
            <div className="app-content">
                <div className="respond__container">
                    <TextField
                        id="participant-name"
                        label="Your Name"
                        onChange={handleParticipantNameChange} 
                        variant="outlined"
                        color="primary"
                        className="respond__name"

                    />
                    <div className="respond__calendar">
                        <MultiSelectCalendar
                            addDate={updateSelection}
                            minDate={event.start}
                            maxDate={event.end}
                        />
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={submitResponse}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
