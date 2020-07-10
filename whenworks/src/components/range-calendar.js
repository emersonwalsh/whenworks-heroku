import React, { useEffect } from 'react';
import InfiniteCalendar, {
    Calendar,
    withRange
  } from 'react-infinite-calendar';
import { getCalendarWidth, getCalendarHeight, updateCalendarHeaderText } from './../util';


export default function RangeCalendar(props) {
    let selectedRange = null;

    useEffect(() => {
        updateCalendarHeaderText('Select a date range for your event...');
    });

    if (props.startDate && props.endDate) {
        selectedRange = {
            start: new Date(props.startDate),
            end: new Date(props.endDate)
        };
    }
    
	return (
        <InfiniteCalendar
            Component={withRange(Calendar)}
            selected={selectedRange}
            width={getCalendarWidth()}
            height={getCalendarHeight('create')}
            onSelect={props.setRange}
        />
    );
}
