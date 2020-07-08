import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from './../../util';

import TopBar from './../top-bar';
import RangeCalendar from './../range-calendar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function Create(props) {
    const history = useHistory();
    let eventName = '';

    // set initial range (today + 2 weeks)
    // const today = new Date();
    // const endDate = new Date();
    // endDate.setDate(today.getDate() + 14);

    let range = {
        start: null,
        end: null
    };

    const setSelection = (newRange) => {
        const startDate = newRange.start < newRange.end ? newRange.start : newRange.end;
        const endDate = newRange.start < newRange.end ? newRange.end : newRange.start;

        range = {
            start: formatDate(startDate),
            end: formatDate(endDate)
        };
    }

    const handleEventNameChange = event => {
        eventName = event.target.value;
    }

    const generateEvent = () => {

        if (!range.start || !range.end || !eventName) {
            console.log('Incomplete! Select a name and date range');
            // todo handle error visibly
            return;
        }

        const eventId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const payload = {
            _id: eventId,
            eventName: eventName,
            start: range.start,
            end: range.end,
        };

        axios({
            url: '/api/create',
            method: 'POST',
            data: payload,
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
        <div>
            <TopBar />
            <div className="app-content">
                <div className="create__container">
                    <TextField
                        id="event-name"
                        label="Event Name"
                        onChange={handleEventNameChange}
                        variant="outlined"
                        color="primary"
                        className="create__name"
                        size="small"
                        // todo place focus on input on mount
                        // autoFocus={true}
                    />
                    <div className="create__calendar">
                        <RangeCalendar
                            setRange={setSelection}
                            startDate={range.start}
                            endDate={range.end}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={generateEvent}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
}
