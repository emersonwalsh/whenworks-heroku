import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDate, updateDocumentTitle, formatDateRange } from './../../util';

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
                data.dateRange = formatDateRange(data.start, data.end)
                setEvent(data);
                updateDocumentTitle('WhenWorks: ' + data.eventName);
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

        // todo calendar header text resets if none are selected
        // if (selectedDates.length < 1) {
        //     // todo this needs to be called after render
        //     updateCalendarHeaderText('Select days that work for you...');
        // }
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
            <TopBar /> 
            <div className="app-content">
                <div className="respond__container">
                    <h3 className="respond__event__name">{event.eventName}</h3>
                    <h4 className="respond__event__dates">{event.dateRange}</h4>
                    <TextField
                        id="participant-name"
                        label="Your Name"
                        onChange={handleParticipantNameChange} 
                        variant="outlined"
                        color="primary"
                        className="respond__name"
                        size="small"
                        autoFocus={true}
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
                        size="medium"
                        onClick={submitResponse}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
