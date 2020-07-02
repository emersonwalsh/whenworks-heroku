import React from 'react';
import InfiniteCalendar, {
    Calendar,
    withRange
  } from 'react-infinite-calendar';
import { getCalendarWidth, getCalendarHeight } from './../util';


export default function RangeCalendar(props) {
    let selectedRange = null;
    
    // todo update calendar header text to say "Select a date range for the event"

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
            height={getCalendarHeight()}
            onSelect={props.setRange}
        />
    );
}
