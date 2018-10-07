import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import SignIn from './SignIn';
import Home from './Home';

import * as routes from '../constants/routes';

export const App = () =>
    <Router>
        <div>
            <Navigation />
            <Route
                exact path={routes.SIGN_IN}
                component={SignIn}
            />
            <Route
                exact path={routes.HOME}
                component={Home}
            />
        </div>
    </Router>;