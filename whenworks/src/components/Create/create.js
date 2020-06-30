import React from 'react';
import { useHistory } from 'react-router-dom';
import TopBar from './../top-bar';
import RangeCalendar from './../range-calendar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { formatDate } from './../../util';
import axios from 'axios';

const CalendarContainer = styled.div`
    padding: 20px 0;
`;

export default function Create(props) {
    const history = useHistory();
    let eventName = '';
    
    // set initial range (today + 2 weeks)
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 14);

    let range = {
        start: formatDate(today),
        end: formatDate(endDate)
    };

    const setSelection = (newRange) => {
        const startDate = newRange.start < newRange.end ? newRange.start : newRange.end;
        const endDate = newRange.start < newRange.end ? newRange.end : newRange.start;
        range = {
            start: formatDate(startDate),
            end: formatDate(endDate)
        }
    }

    const handleEventNameChange = event => {
        eventName = event.target.value;
    }

    const generateEvent = () => {
        const eventId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const payload = {
            _id: eventId,
            eventName: eventName,
            // eventId: eventId,
            start: range.start,
            end: range.end,
        };

        axios({
            url: '/api/create',
            method: 'POST',
            data: payload,
            // headers: {
            //     'Content-Type': 'text/plain;charset=utf-8',
            // },
        })
            .then(() => {
                console.log('Data has been sent to the server');
                
                history.push('/respond/' + eventId);
            })
            .catch(() => {
                console.log('Internal server error');
            })
    }

    return (
        <header className="app-content">
            <TopBar />
            <TextField 
                id="event-name" 
                label="Event Name"
                onChange={handleEventNameChange} 
                variant="outlined" 
                color="primary"
            />
            <CalendarContainer>
                <RangeCalendar
                    setRange={setSelection} 
                    startDate={range.start}
                    endDate={range.end}
                />
            </CalendarContainer>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={generateEvent}
            >
                Create
            </Button>
        </header>
    );
}
