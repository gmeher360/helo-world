import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Home from './home';
import Login from './login';
import GetStarted from './get-started';
import ViewTeam from './viewTeam'
import CreateTeam from './createTeam';
import { useQuery } from '@apollo/client';
import { USER_AUTHENTICATION_QUERY } from '../services/schema/userSchema';

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem('isLoggedIn') ? (
                    children
                ) : (
                        <Redirect d={console.log("hello")}
                            to={{
                                pathname: "/login",
                            }}
                        />
                    )
            }
        />
    )
}

function App() {
    const { loading, error, data } = useQuery(USER_AUTHENTICATION_QUERY)
    console.log(data)
    if (data) {
        localStorage.setItem('isLoggedIn', data.authenticateUser.ok ? 1 : '')
    }
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
                <ProtectedRoute exact path='/create-team'>
                    <CreateTeam />
                </ProtectedRoute>
                <ProtectedRoute exact path='/view-team'>
                    <ViewTeam />
                </ProtectedRoute>
            </Switch>
        </Router>
    );
}

export default App;
