import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './home';
import Login from './login';
import GetStarted from './get-started';
import Team from './team';

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
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/team'>
                    <Team />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
