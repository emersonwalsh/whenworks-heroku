import React from 'react';
import { useHistory } from 'react-router-dom';
import { updateDocumentTitle } from './../../util';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
// import Link from '@material-ui/core/Link';

export default function Home(props) {
    let history = useHistory();

    updateDocumentTitle('WhenWorks');

    // const preventDefault = (event) => event.preventDefault();

    return (
        <div className="app-content">
            <div className="home__container">
                <div className="home__title">
                    <div className="home__title__logo">
                        <EventAvailableIcon color="primary" style={{ fontSize: 36 }} />
                    </div>
                    <h1 className="home__title__text">WhenWorks</h1>
                </div>
                <p className="home__tagline">Find a date that works for everyone!</p>
                <div className="home__create">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<AddIcon />}
                        onClick={() => history.push('/create')}
                    >
                        Create Event
                    </Button>
                </div>
                {/* 
                TODO using local storage, save events for user (event name and id) 
                { eventId: eventName, event2Id: event2Name }
                */}
                {/* <div className="home__link">
                    <Link href="#" onClick={preventDefault}>
                        Existing Events
                    </Link>
                </div> */}
            </div>
        </div>
    );
}
