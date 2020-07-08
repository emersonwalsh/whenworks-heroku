import React, { useEffect }  from 'react';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates
} from 'react-infinite-calendar';
import { getCalendarWidth, getCalendarHeight, updateCalendarHeaderText } from './../util';


export default function MultiSelectCalendar(props) {
    let minDate = new Date(props.minDate) || new Date();
    let maxDate = new Date(props.maxDate) || new Date();

    // todo need a differnet method... this wont always work

    var userTimezoneOffset = minDate.getTimezoneOffset() * 60000;
    minDate = new Date(minDate.getTime() + userTimezoneOffset);
    maxDate = new Date(maxDate.getTime() + userTimezoneOffset);

    const minYear = minDate.getFullYear();
    const minMonth = minDate.getMonth();
    const minMonthDate = new Date(minYear, minMonth, 1);

    const maxYear = maxDate.getFullYear();
    const maxMonth = maxDate.getMonth();
    const maxMonthDate = new Date(maxYear, maxMonth, 1);

    useEffect(() => {
        updateCalendarHeaderText('Select days that work for you...');
    });

    console.log('minDate', minDate)
    console.log('maxDate', maxDate)
    console.log('minMonthDate', minMonthDate)
    console.log('maxMonthDate', maxMonthDate)

	return (
        <InfiniteCalendar
            Component={withMultipleDates(Calendar)}
            selected={[]}
            onSelect={props.addDate}
            interpolateSelection={defaultMultipleDateInterpolation}
            width={getCalendarWidth()}
            height={getCalendarHeight()}
            displayOptions={{
                showTodayHelper: false
            }}
            minDate={minDate} // Minimum selectable date
            min={minMonthDate} // Minimum month to render
            maxDate={maxDate} // Max selectable date
            max={maxMonthDate} // Max month to render
        />
    );
}
