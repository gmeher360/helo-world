import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './home'
import GetStarted from './get-started'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' >
                    <Home />
                </Route>
                <Route exact path='/get-started'>
                    <GetStarted />
                </Route>
                <Route exact path='/about'>
                    <h2>About Us</h2>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
