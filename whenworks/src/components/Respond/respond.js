import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './../top-bar';
import MultiSelectCalendar from './../multi-select-calendar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { formatDate } from './../../util';
import axios from 'axios';

const CalendarContainer = styled.div`
    padding: 20px 0;
`;

export default function Respond(props) {
    const [event, setEvent] = useState({});
    let history = useHistory();
    let { id } = useParams();
    let participantName = '';
    const selectedDates = [];

    const getEvent = () => {
        axios.get('/api/')
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
        const result = {
            ...event,
            participantResponse: {
                name: participantName,
                selectedDates: selectedDates
            }
        };

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
        <header className="app-content">
            <TopBar /> 
            {event.eventName} ({event.start} - {event.end})
            <TextField
                id="participant-name"
                label="Your Name"
                onChange={handleParticipantNameChange} 
                variant="outlined"
                color="primary" />

            <CalendarContainer>
                <MultiSelectCalendar
                    addDate={updateSelection}
                    minDate={event.start}
                    maxDate={event.end}
                />
            </CalendarContainer>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitResponse}
            // onClick={() => history.push('/respond')}
            >
                Submit
            </Button>
        </header>
    );
}
