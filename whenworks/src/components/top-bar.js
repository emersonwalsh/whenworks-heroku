import React, { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TopBar() {
    const [open, setOpen] = useState(false);

    const history = useHistory();
    let { id } = useParams();
    let location = useLocation();

    const goHome = (result) => {
        history.push('/');
    }

    const getResponsiveTitle = () => {
        if (location.pathname.indexOf('create') > -1) {
            return (
                <div>
                    <h1 className="topbar__title__text">WhenWorks</h1>
                </div>
            )
        } else {
            return (
                <div>
                <h1 className="topbar__title__text full-title">WhenWorks</h1>
                <h1 className="topbar__title__text short-title">WW</h1>
                </div>
            )
        }
    }

    const getCopyButtion = () => {
        if (location.pathname.indexOf('respond') > -1 || location.pathname.indexOf('results') > -1) {
            return (
                <div className="topbar__copy" >
                    <Button 
                        color="primary"
                        size="medium"
                        onClick={showCopyConfirmation}>
                        Copy Link
                    </Button>
                </div>
            );
        }

        return null;
    }

    const getActionButtion = () => {
        if (location.pathname.indexOf('respond') > -1) {
            return (
                <div className="topbar__goto">
                    <Button 
                        variant="outlined" 
                        color="primary"
                        size="medium"
                        onClick={() => {
                            history.push('/results/' + id);
                        }}>
                        Go to Results
                    </Button>
                </div>
            );
        } else if (location.pathname.indexOf('results') > -1) {
            return (
                <div className="topbar__goto">
                    <Button 
                        variant="outlined" 
                        color="primary"
                        size="medium"
                        onClick={() => {
                            history.push('/respond/' + id);
                        }}>
                        Add a Response
                    </Button>
                </div>
            );
        }
        return null;
    }

    const showCopyConfirmation = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setOpen(true);
    };

    const closeCopyConfirmation = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <div className="topbar__container">
            <div className="topbar__title" onClick={goHome}>
                <div className="topbar__title__logo">
                    <EventAvailableIcon color="primary" />
                </div>
                {getResponsiveTitle()}
            </div>
            {getCopyButtion()}
            {getActionButtion()}
            <Snackbar 
                open={open} 
                autoHideDuration={2500}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={closeCopyConfirmation}>
                <Alert onClose={closeCopyConfirmation} severity="success">
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
}