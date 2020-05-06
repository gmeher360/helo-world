import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './home'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' >
                    <Home />
                </Route>
                <Route exact path='/about'>
                    <h2>About Us</h2>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
