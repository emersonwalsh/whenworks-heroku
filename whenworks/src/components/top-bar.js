import React from 'react';
import { useHistory } from 'react-router-dom';

export default function TopBar(props) {
    const history = useHistory();
    const name = props.name || 'WhenWorks';

    let dates = '';
    if (props.start && props.end) {
        let startArr = props.start.split('-');
        let endArr = props.end.split('-');
        let sameYear = startArr[0] === endArr[0];

        dates += startArr[1] + '/' + startArr[2];
        if (!sameYear) {
            dates += '/' + startArr[0];
        }
        dates += ' - ';
        dates += endArr[1] + '/' + endArr[2];
        if (!sameYear) {
            dates += '/' + endArr[0];
        }
    }

    const goHome = (result) => {
        history.push('/');
    }

    return (
        <div className="topbar__container">
            <div className="topbar__name" onClick={goHome}>{name}</div>
            <div className="topbar__dates" >{dates}</div>
        </div>
    );
}