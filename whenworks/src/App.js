import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import ReactGA from 'react-ga';


// Styling
import './App.css';
import 'react-infinite-calendar/styles.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Components
import HomePage from './components/Home/home';
import CreatePage from './components/Create/create';
import RespondPage from './components/Respond/respond';
import ResultsPage from './components/Results/results';


function App() {
    // Override default primary color
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#448aff'
			}
        },
        typography: {
            fontFamily: [
                '"Raleway"',
                'sans-serif',
            ].join(','),
        }
    });
    

    // todo implement Google Analytics
    // const trackingId = "UA-124235141-2";
    // ReactGA.initialize(trackingId);


    // history.listen((location) => {
    //     ReactGA.set({ page: location.pathname });
    //     ReactGA.pageview(location.pathname)
    // });
    
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
            <div className="app">
                <Route path="/" exact component={HomePage} />
                <Route path="/create" component={CreatePage} />
                <Route path="/respond/:id" component={RespondPage} />
                <Route path="/results/:id" component={ResultsPage} />
            </div>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
