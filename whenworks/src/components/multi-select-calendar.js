import React, { useEffect }  from 'react';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates
} from 'react-infinite-calendar';
import { getCalendarWidth, 
        getCalendarHeight, 
        updateCalendarHeaderText,
        ignoreTimezone
} from './../util';


export default function MultiSelectCalendar(props) {
    // Ignore timezone
    const minDate = ignoreTimezone(props.minDate);
    const maxDate = ignoreTimezone(props.maxDate);

    // const minYear = minDate.getFullYear();
    // const minMonth = minDate.getMonth();
    // const minMonthDate = new Date(minYear, minMonth, 1);
    // const maxYear = maxDate.getFullYear();
    // const maxMonth = maxDate.getMonth();
    // const maxMonthDate = new Date(maxYear, maxMonth, 1);

    useEffect(() => {
        updateCalendarHeaderText('Select days that work for you...');
    });

	return (
        <InfiniteCalendar
            Component={withMultipleDates(Calendar)}
            selected={[]}
            onSelect={props.addDate}
            interpolateSelection={defaultMultipleDateInterpolation}
            width={getCalendarWidth()}
            height={getCalendarHeight('respond')}
            displayOptions={{
                showTodayHelper: false
            }}
            autoFocus={false}
            minDate={minDate} // Minimum selectable date
            maxDate={maxDate} // Max selectable date
            // min={minMonthDate} // Minimum month to render
            // max={maxMonthDate} // Max month to render
        />
    );
}
