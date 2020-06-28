import React from 'react';
import InfiniteCalendar, {
    Calendar,
    withRange
  } from 'react-infinite-calendar';
import { getCalendarWidth, getCalendarHeight } from './../util';


export default function RangeCalendar(props) {
    let startDate = new Date(props.startDate);
    let endDate = new Date(props.endDate);
    
	return (
        <InfiniteCalendar
            Component={withRange(Calendar)}
            selected={{
                start: startDate,
                end: endDate
            }}
            width={getCalendarWidth()}
            height={getCalendarHeight()}
            onSelect={props.setRange}
        />
    );
}
