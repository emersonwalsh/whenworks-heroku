import React, { useState }  from 'react';
import { getCalendarWidth, getCalendarHeight, ignoreTimezone } from './../util';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates
} from 'react-infinite-calendar';

// todo show selected dates
// todo dates need to be read only
// todo color selected dates green
// todo add slider
// todo hover tooltip showing who's available
// blocker: calendar can't be read only...


export default function ReadOnlyCalendar(props) {
    const [clickCount, setClickCount] = useState(0);

    let resultsData = {};
    let selectedDates = [];
    let maxNumberAvailable = 1;


    // todo this is not needed (use props)
    if (props.data) {
        props.data.forEach(response => {
            response.selectedDates.forEach(date => {
                if (resultsData.hasOwnProperty(date)) {
                    resultsData[date].push(response.name);
                } else {
                    resultsData[date] = [ response.name ];
                    selectedDates.push(
                        ignoreTimezone(date)
                    );
                }
            });
        });
        maxNumberAvailable = props.data.length;
    }
console.log('resultsData', resultsData)
console.log('selectedDates', selectedDates)

debugger

    let availabilityMapping = {};
    let bestOption = 1;

    Object.keys(resultsData).forEach((key, index) => {
        let numberAvailable = resultsData[key].length;
        bestOption = numberAvailable > bestOption ? numberAvailable : bestOption;
        if (availabilityMapping.hasOwnProperty(numberAvailable)) {
            availabilityMapping[numberAvailable].push(ignoreTimezone(key));
        } else {
            availabilityMapping[numberAvailable] = [ ignoreTimezone(key) ];
        }
    });

    console.log('availabilityMapping', availabilityMapping)

    const calendarClick = (e) => {
        // todo is there another way to make calendar read-only other than forcing re-render?
        let testClick = clickCount;
        testClick++;
        setClickCount(testClick)
    }


	return (
        <div>
            <InfiniteCalendar
                Component={withMultipleDates(Calendar)}
                selected={availabilityMapping[bestOption]} //todo make this the most
                interpolateSelection={defaultMultipleDateInterpolation}
                width={getCalendarWidth()}
                height={getCalendarHeight('create')}
                displayOptions={{
                    showHeader: false
                }}
                onSelect={calendarClick}
                theme={{
                    selectionColor: function(date) {
                        // todo form heatmap using gradient (#EC6150 - #4caf50)
                        // return '#4caf50';

                        // [
                        //     #cfe8d0,
                        //      
                        //      #4caf50
                        // ]

                        return '#4caf50'

                    }
                }}
            />
        </div>
    );
}
