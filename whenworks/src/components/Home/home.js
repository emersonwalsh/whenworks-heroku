import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { updateDocumentTitle } from './../../util';


export default function Home(props) {
    let history = useHistory();
    updateDocumentTitle('WhenWorks');

    return (
        <div className="app-content">
            <div className="home__container">
                <h1 className="home__title">
                    WhenWorks
                </h1>
                <p className="home__tagline">Easily find a date that works for everyone!</p>
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
        </div>
    );
}
