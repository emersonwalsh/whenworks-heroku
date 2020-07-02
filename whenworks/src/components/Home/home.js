import React from 'react';
import { useHistory } from 'react-router-dom';
// Material UI
import Button from '@material-ui/core/Button';
// import 'fontsource-roboto'; if this is commented out, make sure to npm unistall
import AddIcon from '@material-ui/icons/Add';

export default function Home(props) {
    let history = useHistory();

    return (
        <div className="app-content">
            <div className="home__container">
                <h1 className="home__title">
                    WhenWorks
                </h1>
                <p className="home__tagline">Find a date that works for everyone!</p>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<AddIcon />}
                    onClick={() => history.push('/create')}
                >
                    Create an Event
                </Button>
            </div>
        </div>
    );
}
