import React, { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TopBar(props) {
    const [open, setOpen] = useState(false);

    const history = useHistory();
    let { id } = useParams();
    let location = useLocation();
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

    const getCopyButtion = () => {
        if (location.pathname.indexOf('respond') > -1 || location.pathname.indexOf('results') > -1) {
            return (
                <div className="topbar__copy" >
                    <Button 
                        color="primary" 
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
            <div className="topbar__name" onClick={goHome}>{name}</div>
            <div className="topbar__dates" >{dates}</div>
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