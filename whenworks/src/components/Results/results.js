import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateDocumentTitle, formatDateRange } from './../../util';

import TopBar from './../top-bar';
import ResultsTable from './results-table';
import ReadOnlyCalendar from './../read-only-calendar';
import ListIcon from '@material-ui/icons/List';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';


export default function Results(props) {
    const [result, setResult] = useState({});
    const [viewOption, setViewOption] = useState('table');

    let { id } = useParams();

    const getEvent = () => {
        axios.get('/api/' + id)
            .then((response) => {
                const data = response.data;
                data.dateRange = formatDateRange(data.start, data.end)
                data.availabilityMapping = {};
                data.results.forEach(entry => {
                    entry.selectedDates.forEach(date => {
                        if (data.availabilityMapping.hasOwnProperty(date)) {
                            data.availabilityMapping[date].push(entry.name);
                        } else {
                            data.availabilityMapping[date] = [ entry.name ];
                        }
                    });
                });

                setResult(data);
                updateDocumentTitle('WhenWorks: ' + data.eventName);
            })
            .catch(() => {
                console.log('error retrieving events')
            })
    };

    const handleViewOptionChange = (event, newViewOption) => {
        if (!newViewOption || viewOption === newViewOption) return;
        setViewOption(newViewOption);
    };

    const displayAvatars = () => {
        if (!result.results || result.results.length < 1) return null;

        const avatarLimit = 3;
        let extraCount = 0;
        let extraString = '';
            
        return (
            <AvatarGroup max={result.results.length + 1} className="results__avatars">
                {result.results.map((row, index) => {
                    
                    if (index < avatarLimit) {
                        return (
                            <Tooltip key={row.name} title={row.name} aria-label={row.name} placement="bottom"
                            enterTouchDelay={100}>
                                <Avatar>{row.name.charAt(0)}</Avatar>
                            </Tooltip>
                        )
                    }

                    extraCount++;
                    extraString += row.name + ', ';

                    if (index === result.results.length - 1) {
                        return (
                            <Tooltip key="extra-count" title={extraString.slice(0, -2)} aria-label={extraString} placement="bottom">
                                <Avatar>+{extraCount}</Avatar>
                            </Tooltip>
                        )
                    }
                    
                    return null;
                })}
            </AvatarGroup>
        )
    };

    const displayViewOptionsToggle = () => {
        if (!result.results || result.results.length < 1) {
            return (
                <div className="results__toggle"
                >
                    <ToggleButtonGroup
                        value={viewOption}
                        exclusive
                        size="small"
                        onChange={handleViewOptionChange}
                        aria-label="results visual"
                        >
                        <ToggleButton value="table" aria-label="results table">
                            <ListIcon />
                        </ToggleButton>
                        <ToggleButton value="calendar-disabled" aria-label="results calendar" disabled>
                            <DateRangeIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            )
        }
        
        return (
            <div className="results__toggle">
                <ToggleButtonGroup
                    value={viewOption}
                    exclusive
                    size="small"
                    onChange={handleViewOptionChange}
                    aria-label="results visual"
                    >
                    <ToggleButton value="table" aria-label="results table">
                        <ListIcon />
                    </ToggleButton>
                    <ToggleButton value="calendar" aria-label="results calendar">
                        <DateRangeIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )
    };

    const displayViewOptions = () => {
        if (viewOption === 'table') {
            return (
                <ResultsTable 
                    data={result.results}
                    start={result.start} 
                    end={result.end} 
                    availability={result.availabilityMapping}
                    />
            )
        } else if (viewOption === 'calendar') {
            return (
                <ReadOnlyCalendar data={result.results} />
            )
        }

    }

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
                    <div className="results__controller">
                        {displayAvatars()}
                        {displayViewOptionsToggle()}
                    </div>
                    {displayViewOptions()}

                    {/* 
                        TODO add more share options
                    */}

                </div>
            </div>
        </div>
    );
}
