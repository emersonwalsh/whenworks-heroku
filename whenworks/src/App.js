import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'react-infinite-calendar/styles.css';

import HomePage from './components/Home/home';
import CreatePage from './components/Create/create';
import RespondPage from './components/Respond/respond';
import ResultsPage from './components/Results/results';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function App() {
    // Override default primary color
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#448aff'
			}
		}
	})
    
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
            <div>
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
